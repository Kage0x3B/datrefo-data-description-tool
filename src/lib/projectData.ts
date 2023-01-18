import type { InternalDocument } from '$lib/types/InternalDocument';
import type { Writable } from 'svelte/store';
import { writable } from 'svelte/store';
import type { DaTreFoCondition } from '$lib/types/datrefoFormat/DaTreFoCondition';

export const documents: Writable<Record<string, InternalDocument>> = writable({});
export const excludePatientConditions: Writable<DaTreFoCondition[]> = writable([]);
