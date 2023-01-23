import fhirSchemaJson from './data/fhir.schema.json' assert { type: 'json' };
import { generateEnum, writeGeneratedFile } from './util.js';

type FhirResourceType = keyof (typeof fhirSchemaJson)['discriminator']['mapping'];
const resourceTypes = Object.keys(fhirSchemaJson.discriminator.mapping) as FhirResourceType[];

async function generateResourceTypeEnum() {
    await writeGeneratedFile('FhirResourceType.ts', generateEnum('FhirResourceType', resourceTypes));
}

generateResourceTypeEnum().catch((err) => {
    console.error("Couldn't execute script", err);
    process.exit(1);
});
