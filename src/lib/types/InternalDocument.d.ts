import { DaTreFoCondition } from '$lib/types/datrefoFormat/DaTreFoCondition';
import { FhirResourceType } from '$lib/types/datrefoFormat/DaTreFoDocument';
import { DaTreFoSelectionOptions } from '$lib/types/datrefoFormat/DaTreFoSelection';

export interface InternalDocument {
    id: string;
    displayName?: string;
    resourceType: FhirResourceType;
    selections: Record<string, boolean | DaTreFoSelectionOptions>;
    condition: DaTreFoCondition[];
}
