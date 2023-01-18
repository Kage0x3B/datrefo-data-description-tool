import { FhirResourceType } from '$lib/generated/FhirResourceType';

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
