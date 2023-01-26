import { FhirResourceType } from '$lib/generated/FhirResourceType';
import { FhirFieldPrimitiveType } from '$lib/fhir/FhirFieldPrimitiveType';
import { FhirFieldObjectType } from '$lib/fhir/FhirFieldObjectType';
import type { JSONSchema7Type } from 'json-schema';

export type FhirFieldInternalType = 'definition' | 'enum';
export type FhirFieldType = FhirFieldInternalType | FhirFieldPrimitiveType | FhirFieldObjectType;

export interface FhirResourceField {
    /**
     * Json path for this field
     */
    path: string;
    /**
     * Resource type name
     */
    name: string;
    /**
     * Field type
     */
    type: FhirFieldType;
    definition?: string;
    /**
     * Only set when type is enum
     */
    enumValues?: JSONSchema7Type[];
}

export interface FhirDefinition {
    name: string;
    fields: FhirResourceField[];
}

export interface FhirResourceMetadata {
    name: FhirResourceType;
    fields: FhirResourceField[];
}

export type FhirResourceMetadataMap = Partial<Record<FhirResourceType, FhirResourceMetadata>> & {
    definitions: Record<string, FhirDefinition>;
};
