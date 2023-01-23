import type { InternalDocument } from '$lib/types/InternalDocument';
import type { Writable } from 'svelte/store';
import { writable } from 'svelte/store';
import type { DaTreFoCondition } from '$lib/types/datrefoFormat/DaTreFoCondition';
import { FhirResourceType } from '$lib/generated/FhirResourceType';

// TODO: Remove temp data
export const documents: Writable<Record<string, InternalDocument>> = writable({
    Medication1: {
        id: 'Medication1',
        resourceType: FhirResourceType.MEDICATION,
        condition: [],
        selections: []
    }
});
export const excludePatientConditions: Writable<DaTreFoCondition[]> = writable([]);
