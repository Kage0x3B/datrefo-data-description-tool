import { FhirResourceType } from '$lib/generated/FhirResourceType';
import { FhirFieldPrimitiveType } from '$lib/fhir/FhirFieldPrimitiveType';
import { FhirFieldObjectType } from '$lib/fhir/FhirFieldObjectType';
import type { JSONSchema7Type } from 'json-schema';

export type FhirFieldInternalType = 'enum';
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
    /**
     * Only set when type is enum
     */
    enumValues?: JSONSchema7Type[];
    /**
     * Description for this field
     */
    description?: string;
}

export interface FhirResourceMetadata {
    name: FhirResourceType;
    description?: string;
    fields: ResourceField[];
}

export type FhirResourceMetadataMap = Partial<Record<FhirResourceType, ResourceMetadata>>;
