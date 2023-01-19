export enum FhirFieldObjectType {
    /**
     * A concept that may be defined by a formal reference to a terminology or ontology or may be provided by text.
     */
    CODEABLE_CONCEPT = 'CodeableConcept',
    /**
     * A reference to a code defined by a terminology system.
     */
    CODING = 'Coding'
}

const fhirFieldObjectTypeList: FhirFieldObjectType[] = Object.values(FhirFieldObjectType);

export function isFhirFieldObjectType(typeName: string): typeName is FhirFieldObjectType {
    return fhirFieldObjectTypeList.includes(typeName as FhirFieldObjectType);
}
