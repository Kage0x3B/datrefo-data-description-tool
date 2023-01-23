import fhirSchemaJson from './data/fhir.schema.json' assert { type: 'json' };
import { generateEnum, writeGeneratedFile } from './util.js';
import type { JSONSchema7 } from 'json-schema';
import type {
    FhirFieldType,
    FhirResourceField,
    FhirResourceMetadata,
    FhirResourceMetadataMap
} from '../src/lib/fhir/FhirMetadata';
import { FhirFieldPrimitiveType, isFhirFieldPrimitiveType } from '../src/lib/fhir/FhirFieldPrimitiveType.js';
import { isFhirFieldObjectType } from '../src/lib/fhir/FhirFieldObjectType.js';
import { globalExcludedKeyList, includedFhirMetadataList } from './includedFhirMetadataList.js';

const fhirSchema = fhirSchemaJson as JSONSchema7;

type FhirResourceType = keyof (typeof fhirSchemaJson)['discriminator']['mapping'];
const resourceTypes = Object.keys(fhirSchemaJson.discriminator.mapping) as FhirResourceType[];

async function generateResourceTypeEnum() {
    await writeGeneratedFile('FhirResourceType.ts', generateEnum('FhirResourceType', resourceTypes));
}

function isFieldIncluded(resourceType: FhirResourceType, path: string, name: string) {
    if (!path) {
        return true;
    }

    for (const pattern of globalExcludedKeyList) {
        if (pattern.test(name)) {
            return false;
        }
    }

    const includedKeyRegexList = includedFhirMetadataList[resourceType]!;

    for (const pattern of includedKeyRegexList) {
        if (pattern.test(path)) {
            return true;
        }
    }

    return false;
}

function resolveReference($ref: string): FhirFieldType | JSONSchema7 | undefined {
    const definitionName = $ref.substring('#/definitions/'.length);

    if (isFhirFieldPrimitiveType(definitionName) || isFhirFieldObjectType(definitionName)) {
        return definitionName;
    } else {
        const definition = fhirSchema.definitions![definitionName];

        if (definition && typeof definition === 'object') {
            return definition;
        } else {
            return undefined;
        }
    }
}

function extractFields(
    resourceType: FhirResourceType,
    fieldList: FhirResourceField[],
    schema: JSONSchema7,
    fieldPath = '',
    fieldName = '',
    depth = 0
): void {
    if (depth > 20) {
        console.warn(`Reached max recursion depth at property ${fieldPath}`);

        return;
    }

    if (!isFieldIncluded(resourceType, fieldPath, fieldName)) {
        return;
    }

    if (schema.$ref) {
        const fieldDefinition = schema.$ref ? resolveReference(schema.$ref) : undefined;

        if (typeof fieldDefinition === 'string') {
            fieldList.push({
                path: fieldPath,
                name: fieldName,
                type: fieldDefinition,
                description: schema.description
            });
        } else if (typeof fieldDefinition === 'object') {
            extractFields(resourceType, fieldList, fieldDefinition, fieldPath, fieldName, depth + 1);
        }
    } else if (schema.type === 'array') {
        if (typeof schema.items === 'object' && !Array.isArray(schema.items)) {
            extractFields(resourceType, fieldList, schema.items, fieldPath, fieldName, depth + 1);
        } else {
            console.warn(`Detected unsupported array field at ${fieldPath}, items:`, schema.items);
        }
    } else if (typeof schema.type === 'string' && ['boolean', 'string', 'number'].includes(schema.type)) {
        const primitiveTypeMap = {
            boolean: FhirFieldPrimitiveType.BOOLEAN,
            string: FhirFieldPrimitiveType.STRING,
            number: FhirFieldPrimitiveType.DECIMAL
        };

        fieldList.push({
            path: fieldPath,
            name: fieldName,
            type: primitiveTypeMap[schema.type],
            description: schema.description
        });
    } else if (schema.enum) {
        fieldList.push({
            path: fieldPath,
            name: fieldName,
            type: 'enum',
            enumValues: schema.enum,
            description: schema.description
        });
    } else if (schema.properties) {
        for (const key of Object.keys(schema.properties)) {
            if (typeof schema.properties[key] === 'boolean') {
                continue;
            }

            const propertySchema = schema.properties[key] as JSONSchema7;
            const propertyPath = fieldPath ? fieldPath + '.' + key : key;

            extractFields(resourceType, fieldList, propertySchema, propertyPath, key, depth + 1);
        }
    } else {
        console.warn(`Detected field ${fieldPath} which doesn't resolve into known types`, schema);
    }
}

async function generateResourceTypeMetadata() {
    const resourceMetadataMap: FhirResourceMetadataMap = {};

    for (const type of resourceTypes) {
        if (!Object.keys(includedFhirMetadataList).includes(type)) {
            continue;
        }

        const definition = fhirSchema.definitions![type] as JSONSchema7;

        if (!definition) {
            console.warn(`Couldn't find the json schema definition for resource type ${type}`);

            continue;
        }

        const fields: FhirResourceField[] = [];

        extractFields(type, fields, definition);

        resourceMetadataMap[type] = {
            name: type,
            description: definition.description,
            fields
        } as FhirResourceMetadata;
    }

    await writeGeneratedFile('fhirResourceTypeMetadata.json', JSON.stringify(resourceMetadataMap), 'json');
}

export async function generateFhirMetadata() {
    await generateResourceTypeEnum();
    await generateResourceTypeMetadata();
}

generateFhirMetadata().catch((err) => {
    console.error("Couldn't execute script", err);
    process.exit(1);
});
