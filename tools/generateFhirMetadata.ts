import fhirSchema from './data/fhir.schema.json' assert { type: 'json' };
import { generateEnum, writeGeneratedFile } from './util.js';
import type { JSONSchema7, JSONSchema7Definition } from 'json-schema';
import type {
    FhirResourceField,
    FhirResourceMetadata,
    FhirResourceMetadataMap
} from '../src/lib/types/generatedTypes/FhirMetadata';

type FhirResourceType = keyof (typeof fhirSchema)['discriminator']['mapping'];
const resourceTypes = Object.keys(fhirSchema.discriminator.mapping) as FhirResourceType[];

async function generateResourceTypeEnum() {
    await writeGeneratedFile('FhirResourceType.ts', generateEnum('FhirResourceType', resourceTypes));
}

function isFieldExcluded(name: string, properties: JSONSchema7Definition) {
    return name.startsWith('_');
}

function extractFields(
    properties: NonNullable<JSONSchema7['properties']>,
    currentPath = '',
    depth = 0
): FhirResourceField[] {
    if (depth > 10) {
        console.warn(`Reached max recursion depth at property ${currentPath}`);

        return [];
    }

    const fields: FhirResourceField[] = [];

    for (const key of Object.keys(properties)) {
        const field = properties[key] as JSONSchema7Definition;

        if (typeof field === 'boolean' || isFieldExcluded(key, field)) {
            continue;
        }

        if (field.properties && Object.keys(field.properties).length) {
            fields.push(...extractFields(field.properties, currentPath ? currentPath + '.' + key : '', depth + 1));
        }

        fields.push({
            path: currentPath ? currentPath + '.' + key : key,
            name: key,
            description: field.description
        });
    }

    return fields;
}

async function generateResourceTypeMetadata() {
    const resourceMetadataMap: FhirResourceMetadataMap = {};

    for (const type of resourceTypes) {
        if (type !== 'Patient') {
            //continue; // TODO: Only for debugging
        }

        const definition = fhirSchema.definitions[type] as JSONSchema7;

        if (!definition) {
            console.warn(`Couldn't find the json schema definition for resource type ${type}`);

            continue;
        }

        resourceMetadataMap[type] = {
            name: type,
            description: definition.description,
            fields: definition.properties ? extractFields(definition.properties) : []
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
