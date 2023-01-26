import type { FhirResourceField } from '$lib/fhir/FhirMetadata';
import { FhirFieldPrimitiveType } from '$lib/fhir/FhirFieldPrimitiveType';
import { FhirFieldObjectType } from '$lib/fhir/FhirFieldObjectType';

export function isFieldTypeCombinedCondition(field: FhirResourceField): boolean {
    return field.type === FhirFieldObjectType.CODING || field.type === FhirFieldObjectType.CODEABLE_CONCEPT;
}

export function isFieldTypeNumber(field: FhirResourceField): boolean {
    const numberTypes: FhirFieldPrimitiveType[] = [
        FhirFieldPrimitiveType.DECIMAL,
        FhirFieldPrimitiveType.INTEGER,
        FhirFieldPrimitiveType.INTEGER_64,
        FhirFieldPrimitiveType.POSITIVE_INT,
        FhirFieldPrimitiveType.UNSIGNED_INT
    ];
    return numberTypes.includes(field.type as FhirFieldPrimitiveType);
}

export function isFieldTypeDecimal(field: FhirResourceField): boolean {
    return field.type === FhirFieldPrimitiveType.DECIMAL;
}

export function isFieldTypeOnlyPositive(field: FhirResourceField): boolean {
    return field.type === FhirFieldPrimitiveType.POSITIVE_INT;
}
