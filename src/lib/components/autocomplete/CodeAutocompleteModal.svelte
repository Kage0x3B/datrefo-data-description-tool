<script lang="ts">
    import Modal from '$lib/daisyUiComponents/Modal.svelte';
    import Button from '$lib/daisyUiComponents/Button.svelte';
    import Input from '$lib/daisyUiComponents/Input.svelte';
    import type { DaTreFoEditorContext } from '$lib/types/component/DaTreFoEditor';
    import { getContext, tick } from 'svelte';
    import { EDITOR_CONTEXT } from '$lib/util/ContextKey';
    import FormControl from '$lib/daisyUiComponents/FormControl.svelte';
    import { AutocompleteType } from '$lib/components/autocomplete/AutocompleteType';
    import { t } from 'svelte-i18n';
    import type Fuse from 'fuse.js';
    import { AutocompleteCache } from '$lib/components/autocomplete/AutocompleteCache';
    import { debounce } from '$lib/util/util';
    import { autocompleteTypeOptions } from '$lib/components/autocomplete/AutocompleteType.js';
    import Spinner from '$lib/components/Spinner.svelte';

    const editor: DaTreFoEditorContext = getContext(EDITOR_CONTEXT);

    let isOpen = false;
    const toggle = () => (isOpen = !isOpen);

    let autocompleteType: string | undefined = undefined;
    let searchQuery: string;
    let callback: (value: string) => void;

    let fuse: Fuse<any> | undefined;
    $: loadAutocomplete(autocompleteType);
    let searchResults: Fuse.FuseResult<any>[] = [];
    let isSearching = false;

    export function getOpen() {
        return isOpen;
    }

    export function open(_autocompleteType: AutocompleteType | undefined, _initialValue: string): Promise<string | undefined> {
        searchResults = [];
        autocompleteType = _autocompleteType;
        searchQuery = _initialValue;
        isOpen = true;

        return new Promise<string>((resolve) => {
            callback = resolve;
        });
    }

    export function close() {
        callback(undefined);

        isOpen = false;
    }

    async function loadAutocomplete(type: AutocompleteType | undefined): Promise<void> {
        if (!type) {
            fuse = undefined;

            return;
        }

        fuse = await AutocompleteCache.loadAutocomplete(type);
    }

    function submitValue(value: string): void {
        if (!value) {
            return;
        }

        callback(value);

        close();
    }

    async function _updateSearch(searchQuery: string) {
        if (!fuse) {
            return;
        }

        isSearching = true;

        await tick();

        searchResults = fuse.search(searchQuery, {
            limit: 20,
            ...autocompleteTypeOptions[autocompleteType].fuseSearchOptions
        });

        isSearching = false;
    }

    const updateSearch = debounce(_updateSearch, 300);
    $: updateSearch(searchQuery);
</script>

<Modal {isOpen} {toggle} class="!w-11/12 !max-w-3xl">
    <div class="flex justify-between items-center mb-3">
        <h1 class="text-xl font-bold mr-2">Code System Suche</h1>

        {#if isSearching || (autocompleteType && !fuse)}
            <Spinner size="xs" />
        {/if}
    </div>
    <FormControl>
        <div class="input-group">
            <Input type="select" inputSize="sm" inputStyle="bordered" bind:value={autocompleteType} class="w-1/3 dark:text-base-content">
                {#each Object.values(AutocompleteType) as type, i}
                    <option value={type}>{$t(`autocomplete.type.${type}`)}</option>
                {/each}
            </Input>
            <Input
                type="text"
                bind:value={searchQuery}
                inputStyle="bordered"
                placeholder="Nach Code suchen ..."
                class="w-2/3 dark:text-base-content"
            />
        </div>
    </FormControl>
    {#if fuse && autocompleteType}
        <ul class="w-full border rounded mt-4 max-h-96 overflow-scroll">
            {#each searchResults as entry, i}
                <svelte:component
                    this={autocompleteTypeOptions[autocompleteType].resultEntryComponent}
                    {entry}
                    isLast={i === searchResults.length - 1}
                    {submitValue}
                />
            {:else}
                <li class="px-6 py-4 text-base-content/80">Keine Ergebnisse gefunden</li>
            {/each}
        </ul>
    {:else if !autocompleteType}
        Wählen Sie ein Code System aus
    {:else}
        Lädt ...
    {/if}
    <div class="modal-action">
        <Button on:click={() => (isOpen = false)} btnStyle="ghost">Abbrechen</Button>
        <Button on:click={submitValue} color="primary">Erstellen</Button>
    </div>
</Modal>
