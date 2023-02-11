import type Fuse from 'fuse.js';

export enum AutocompleteType {
    ICD_10_GM = 'icd10Gm'
}

export const autocompleteTypeOptions: Record<AutocompleteType, { importer: () => Promise<any[]>; fuseOptions: Fuse.IFuseOptions<any> }> = {
    [AutocompleteType.ICD_10_GM]: {
        importer: async () => (await import('$lib/generated/autocomplete/icd10Gm.json')).default as any[],
        fuseOptions: {
            keys: ['d', { name: 'c', weight: 2 }]
        }
    }
};
