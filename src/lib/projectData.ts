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
        condition: [
            {
                leftOperand: 'code',
                operator: 'eq',
                rightOperand: '1337'
            }
        ],
        selections: {}
    },
    Patient1: {
        id: 'Patient1',
        resourceType: FhirResourceType.PATIENT,
        condition: [],
        selections: {}
    }
});
export const excludePatientConditions: Writable<DaTreFoCondition[]> = writable([]);
