import Fuse from 'fuse.js';
import { AutocompleteType, autocompleteTypeOptions } from '$lib/components/autocomplete/AutocompleteType';

export class AutocompleteCache {
    private static fuseCache = new Map<AutocompleteType, Fuse<unknown>>();

    public static async loadAutocomplete<T>(type: AutocompleteType): Promise<Fuse<T>> {
        if (this.fuseCache.has(type)) {
            return this.fuseCache.get(type) as Fuse<T>;
        }

        const autocompleteData: T[] = await autocompleteTypeOptions[type].importer();

        const fuse = new Fuse<T>(autocompleteData, {
            includeScore: true,
            includeMatches: true,
            ...autocompleteTypeOptions[type].fuseOptions
        });

        this.fuseCache.set(type, fuse);

        return fuse;
    }
}
