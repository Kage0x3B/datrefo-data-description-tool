import type { DaTreFoCondition } from './DaTreFoCondition';
import type { DaTreFoSelection } from './DaTreFoSelection';
import type { FhirResourceType } from '$lib/generated/FhirResourceType';

type DaTreFoRecursiveSelection = Record<string, DaTreFoSelection | DaTreFoRecursiveSelection>;

export interface DaTreFoDocument extends DaTreFoRecursiveSelection {
    resourceType: FhirResourceType;
    condition?: DaTreFoCondition[];
    excludePatientCondition?: DaTreFoCondition[];
}
