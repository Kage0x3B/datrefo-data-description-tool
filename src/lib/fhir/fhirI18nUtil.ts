import type { FhirResourceType } from '$lib/generated/FhirResourceType';

/**
 * Convert path of fhir document field to the correct i18n path
 * @param fieldPath path of a fhir document field
 */
export function convertI18nFhirPath(resourceType: FhirResourceType, fieldPath: string) {
    return `fhir.field.${resourceType}.${fieldPath.replace(/\\./g, '_')}`;
}
