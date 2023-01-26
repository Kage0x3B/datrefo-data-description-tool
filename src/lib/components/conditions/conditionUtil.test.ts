import { describe, expect, it } from 'vitest';
import type { FhirDefinition, FhirResourceMetadata } from '$lib/fhir/FhirMetadata';

import fhirResourceTypeMetadata from '$lib/generated/fhirResourceTypeMetadata.json';
import { findNestedField } from '$lib/components/conditions/conditionUtil';

const observationFields = fhirResourceTypeMetadata.Observation as FhirResourceMetadata;
const definitions = fhirResourceTypeMetadata.definitions as Record<string, FhirDefinition>;

describe('findNestedField test', () => {
    it('finds a non-nested field', () => {
        expect(findNestedField(observationFields.fields, definitions, 'status')?.type).toBe('code');
    });

    it('finds a nested field', () => {
        expect(findNestedField(observationFields.fields, definitions, 'effectiveTiming.repeat.boundsDuration.value')?.type).toBe('decimal');
    });
});
