import { DaTreFoCondition, DaTreFoOperatorCondition } from '$lib/types/datrefoFormat/DaTreFoCondition';
import { FhirResourceType } from '$lib/types/datrefoFormat/DaTreFoDocument';
import { DaTreFoSelection } from '$lib/types/datrefoFormat/DaTreFoSelection';

export interface InternalDocument {
    id: string;
    displayName?: string;
    resourceType: FhirResourceType;
    selections: Record<string, DaTreFoSelection>;
    condition: InternalCondition[];
}

export type InternalCondition = DaTreFoCondition | InternalCombinedCondition;

export interface InternalCombinedCondition {
    basePath: string;
    conditions: DaTreFoOperatorCondition[];
}
