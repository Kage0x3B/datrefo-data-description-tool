import type { FhirResourceType } from '$lib/generated/FhirResourceType';

/**
 * Convert path of fhir document field to the correct i18n path
 * @param fieldPath path of a fhir document field
 */
export function convertI18nFhirFieldPath(resourceType: FhirResourceType, fieldPath: string) {
    return `fhir.field.${resourceType}.${fieldPath.replace(/\\./g, '_')}`;
}

export function convertI18nFhirDefinitionPath(definitionName: string, fieldPath: string) {
    return `fhir.definition.${definitionName}.field.${fieldPath.replace(/\\./g, '_')}`;
}
