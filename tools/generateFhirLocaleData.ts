import fhirSchemaJson from './data/fhir.schema.json' assert { type: 'json' };
import { writeGeneratedFile } from './util.js';
import type { JSONSchema7 } from 'json-schema';
import { capitalCase } from 'change-case';
import { isFieldIncluded } from './generateFhirMetadata.js';
import type { LocaleData } from '../src/lib/i18n/locales/LocaleData';
import { includedFhirMetadataList } from './includedFhirMetadataList.js';
import type { FhirFieldType } from '../src/lib/fhir/FhirMetadata';
import { isFhirFieldPrimitiveType } from '../src/lib/fhir/FhirFieldPrimitiveType.js';
import { isFhirFieldObjectType } from '../src/lib/fhir/FhirFieldObjectType.js';

const fhirSchema = fhirSchemaJson as JSONSchema7;

type FhirResourceType = keyof (typeof fhirSchemaJson)['discriminator']['mapping'];
const resourceTypes = Object.keys(fhirSchemaJson.discriminator.mapping) as FhirResourceType[];

interface FhirDefinitionLocaleData {
    name?: string;
    description?: string;
    field?: NonNullable<LocaleData['fhir']['field'][FhirResourceType]>;
}

type FhirDefinitionLocaleMap = Record<string, FhirDefinitionLocaleData>;

function convertFhirPath(fieldPath: string) {
    return fieldPath.replace(/\./g, '_');
}

export function resolveReference(
    resourceType: FhirResourceType,
    definitions: FhirDefinitionLocaleMap,
    $ref: string,
    depth: number
): [string, FhirFieldType | FhirDefinitionLocaleData | undefined] {
    const definitionName = $ref.substring('#/definitions/'.length);

    if (isFhirFieldPrimitiveType(definitionName) || isFhirFieldObjectType(definitionName)) {
        return [definitionName, definitionName];
    } else {
        const definition = fhirSchema.definitions![definitionName];

        if (definition && typeof definition === 'object') {
            if (definitions[definitionName]) {
                return [definitionName, definitions[definitionName]];
            } else {
                const fieldInfo: NonNullable<LocaleData['fhir']['field'][FhirResourceType]> = {};

                extractFieldLocaleData(
                    resourceType,
                    definitionName,
                    fieldInfo,
                    definitions,
                    definition,
                    '',
                    '',
                    depth + 1
                );

                const newDefinitionLocaleData: FhirDefinitionLocaleData = {
                    name: definitionName,
                    description: definition.description,
                    field: fieldInfo
                };

                definitions[definitionName] = newDefinitionLocaleData;

                return [definitionName, newDefinitionLocaleData];
            }
        } else {
            return [definitionName, undefined];
        }
    }
}

function extractFieldLocaleData(
    resourceType: FhirResourceType,
    definitionName: FhirResourceType | string,
    fieldInfo: NonNullable<LocaleData['fhir']['field'][FhirResourceType]>,
    definitions: FhirDefinitionLocaleMap,
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

    if (schema.description && fieldPath) {
        fieldInfo[convertFhirPath(fieldPath)] = {
            description: schema.description
        };
    }

    if (schema.$ref) {
        const [definitionName, fieldDefinition] = schema.$ref
            ? resolveReference(resourceType, definitions, schema.$ref, depth)
            : ['', undefined];

        if (typeof fieldDefinition === 'object') {
            definitions[definitionName] = fieldDefinition;
        }
    } else if (schema.type === 'array') {
        if (typeof schema.items === 'object' && !Array.isArray(schema.items)) {
            extractFieldLocaleData(
                resourceType,
                definitionName,
                fieldInfo,
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
        return;
    } else if (schema.enum) {
        return;
    } else if (schema.properties) {
        for (const key of Object.keys(schema.properties)) {
            // Ignore boolean properties and prevent recursion into properties with the same name
            if (typeof schema.properties[key] === 'boolean' || key === fieldName) {
                continue;
            }

            const propertySchema = schema.properties[key] as JSONSchema7;
            const propertyPath = fieldPath ? fieldPath + '.' + key : key;

            extractFieldLocaleData(
                resourceType,
                definitionName,
                fieldInfo,
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

async function generateFhirFieldLocaleData() {
    const fieldLocaleData: Pick<LocaleData['fhir'], 'field' | 'definition'> = {
        field: {},
        definition: {}
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

        const fieldInfo: LocaleData['fhir']['field'][FhirResourceType] = {};
        extractFieldLocaleData(type, type, fieldInfo, fieldLocaleData.definition, definition);

        fieldLocaleData.field[type] = fieldInfo;
    }

    await writeGeneratedFile('i18n/fhir/fields.json', JSON.stringify(fieldLocaleData), 'json');
}

async function generateResourceTypeLocaleData() {
    const localeData: Partial<Record<FhirResourceType, { name: string; description?: string }>> = {};

    for (const type of resourceTypes) {
        const definition = fhirSchema.definitions![type] as JSONSchema7;

        if (!definition) {
            console.warn(`Couldn't find the json schema definition for resource type ${type}`);

            continue;
        }

        localeData[type] = {
            name: capitalCase(type),
            description: definition.description
        };
    }

    await writeGeneratedFile('i18n/fhir/resourceType.json', JSON.stringify(localeData), 'json');
}

async function generateFhirLocaleData() {
    await generateResourceTypeLocaleData();
    await generateFhirFieldLocaleData();
}

generateFhirLocaleData().catch((err) => {
    console.error("Couldn't execute script", err);
    process.exit(1);
});
