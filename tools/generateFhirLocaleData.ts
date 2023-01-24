import fhirSchemaJson from './data/fhir.schema.json' assert { type: 'json' };
import { writeGeneratedFile } from './util.js';
import type { JSONSchema7 } from 'json-schema';
import { capitalCase } from 'change-case';
import { isFieldIncluded, resolveReference } from './generateFhirMetadata.js';
import type { LocaleData } from '../src/lib/i18n/locales/LocaleData';
import { includedFhirMetadataList } from './includedFhirMetadataList.js';

const fhirSchema = fhirSchemaJson as JSONSchema7;

type FhirResourceType = keyof (typeof fhirSchemaJson)['discriminator']['mapping'];
const resourceTypes = Object.keys(fhirSchemaJson.discriminator.mapping) as FhirResourceType[];

function convertFhirPath(fieldPath: string) {
    return fieldPath.replace(/\./g, '_');
}

function extractFieldLocaleData(
    resourceType: FhirResourceType,
    fieldInfo: NonNullable<LocaleData['fhir']['field'][FhirResourceType]>,
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

    if (schema.description && fieldPath) {
        fieldInfo[convertFhirPath(fieldPath)] = {
            description: schema.description
        };
    }

    if (schema.$ref) {
        const fieldDefinition = schema.$ref ? resolveReference(schema.$ref) : undefined;

        if (typeof fieldDefinition === 'object') {
            extractFieldLocaleData(resourceType, fieldInfo, fieldDefinition, fieldPath, fieldName, depth + 1);
        }
    } else if (schema.type === 'array') {
        if (typeof schema.items === 'object' && !Array.isArray(schema.items)) {
            extractFieldLocaleData(resourceType, fieldInfo, schema.items, fieldPath, fieldName, depth + 1);
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

            extractFieldLocaleData(resourceType, fieldInfo, propertySchema, propertyPath, key, depth + 1);
        }
    } else if (schema.oneOf?.length) {
        // TODO: Can't handle oneOf yet
        return;
    } else {
        console.warn(`Detected field ${fieldPath} which doesn't resolve into known types`, schema);
    }
}

async function generateFhirFieldLocaleData() {
    const fieldLocaleData: LocaleData['fhir']['field'] = {};

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
        extractFieldLocaleData(type, fieldInfo, definition);

        fieldLocaleData[type] = fieldInfo;
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
