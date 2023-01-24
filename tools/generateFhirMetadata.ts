import fhirSchemaJson from './data/fhir.schema.json' assert { type: 'json' };
import { writeGeneratedFile } from './util.js';
import type { JSONSchema7 } from 'json-schema';
import type {
    FhirDefinition,
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

export function isFieldIncluded(
    resourceType: FhirResourceType,
    definitionName: FhirResourceType | string,
    path: string,
    name: string
) {
    if (!path) {
        return true;
    }

    const isDefinition = definitionName !== resourceType;

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

    return isDefinition;
}

export function resolveReference(
    resourceType: FhirResourceType,
    definitions: Record<string, FhirDefinition>,
    $ref: string,
    depth: number
): FhirFieldType | FhirDefinition | undefined {
    const definitionName = $ref.substring('#/definitions/'.length);

    if (isFhirFieldPrimitiveType(definitionName) || isFhirFieldObjectType(definitionName)) {
        return definitionName;
    } else {
        const definition = fhirSchema.definitions![definitionName];

        if (definition && typeof definition === 'object') {
            if (definitions[definitionName]) {
                return definitions[definitionName];
            } else {
                const fields: FhirResourceField[] = [];

                extractFields(resourceType, definitionName, fields, definitions, definition, '', '', depth + 1);

                const newDefinition: FhirDefinition = {
                    name: definitionName,
                    fields
                };

                definitions[definitionName] = newDefinition;

                return newDefinition;
            }
        } else {
            return undefined;
        }
    }
}

function extractFields(
    resourceType: FhirResourceType,
    definitionName: FhirResourceType | string,
    fieldList: FhirResourceField[],
    definitions: Record<string, FhirDefinition>,
    schema: JSONSchema7,
    fieldPath = '',
    fieldName = '',
    depth = 0
): void {
    if (depth > 20) {
        console.warn(`Reached max recursion depth at property ${fieldPath}`);

        return;
    }

    if (!isFieldIncluded(resourceType, definitionName, fieldPath, fieldName)) {
        return;
    }

    if (schema.$ref) {
        const fieldDefinition = schema.$ref
            ? resolveReference(resourceType, definitions, schema.$ref, depth)
            : undefined;

        if (typeof fieldDefinition === 'string') {
            fieldList.push({
                path: fieldPath,
                name: fieldName,
                type: fieldDefinition
            });
        } else if (typeof fieldDefinition === 'object') {
            fieldList.push({
                path: fieldPath,
                name: fieldName,
                type: 'definition',
                definition: fieldDefinition.name
            });
        }
    } else if (schema.type === 'array') {
        if (typeof schema.items === 'object' && !Array.isArray(schema.items)) {
            extractFields(
                resourceType,
                definitionName,
                fieldList,
                definitions,
                schema.items,
                fieldPath,
                fieldName,
                depth + 1
            );
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
            type: primitiveTypeMap[schema.type as 'boolean' | 'string' | 'number']
        });
    } else if (schema.enum) {
        fieldList.push({
            path: fieldPath,
            name: fieldName,
            type: 'enum',
            enumValues: schema.enum
        });
    } else if (schema.properties) {
        for (const key of Object.keys(schema.properties)) {
            // Ignore boolean properties and prevent recursion into properties with the same name
            if (typeof schema.properties[key] === 'boolean' || key === fieldName) {
                continue;
            }

            const propertySchema = schema.properties[key] as JSONSchema7;
            const propertyPath = fieldPath ? fieldPath + '.' + key : key;

            extractFields(
                resourceType,
                definitionName,
                fieldList,
                definitions,
                propertySchema,
                propertyPath,
                key,
                depth + 1
            );
        }
    } else if (schema.oneOf?.length) {
        // TODO: Can't handle oneOf yet
        return;
    } else {
        console.warn(`Detected field ${fieldPath} which doesn't resolve into known types`, schema);
    }
}

async function generateResourceTypeMetadata() {
    const resourceMetadataMap: FhirResourceMetadataMap = {
        definitions: {}
    };

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

        extractFields(type, type, fields, resourceMetadataMap.definitions, definition);

        resourceMetadataMap[type] = {
            name: type,
            fields
        } as FhirResourceMetadata;
    }

    await writeGeneratedFile('fhirResourceTypeMetadata.json', JSON.stringify(resourceMetadataMap), 'json');
}

export async function generateFhirMetadata() {
    await generateResourceTypeMetadata();
}

generateFhirMetadata().catch((err) => {
    console.error("Couldn't execute script", err);
    process.exit(1);
});
