import { FhirResourceType } from '$lib/generated/FhirResourceType';

export interface LocaleData {
    localeName: string;
    fhir: {
        resourceType: Partial<Record<FhirResourceType, { name: string; description?: string }>>;
        field: Partial<Record<FhirResourceType, Record<string, { name?: string; description?: string }>>>;
    };
}
