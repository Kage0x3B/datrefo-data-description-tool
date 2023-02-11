<script lang="ts">
    import Modal from '$lib/daisyUiComponents/Modal.svelte';
    import Button from '$lib/daisyUiComponents/Button.svelte';
    import Input from '$lib/daisyUiComponents/Input.svelte';
    import type { DaTreFoEditorContext } from '$lib/types/component/DaTreFoEditor';
    import { getContext } from 'svelte';
    import { EDITOR_CONTEXT } from '$lib/util/ContextKey';
    import FormControl from '$lib/daisyUiComponents/FormControl.svelte';
    import { AutocompleteType } from '$lib/components/autocomplete/AutocompleteType';

    const editor: DaTreFoEditorContext = getContext(EDITOR_CONTEXT);

    let isOpen = false;
    const toggle = () => (isOpen = !isOpen);

    let autocompleteType: string;
    let value: string;
    let callback: (value: string) => void;

    export function open(_autocompleteType: AutocompleteType, _initialValue: string): Promise<string> {
        autocompleteType = _autocompleteType;
        isOpen = true;

        return new Promise<string>((resolve) => {
            callback = resolve;
        });
    }

    export function close() {
        isOpen = false;
    }

    function submitValue(value: string) {
        if (!value) {
            return;
        }

        callback(value);

        close();
    }
</script>

<Modal {isOpen} {toggle}>
    <h1 class="text-xl font-bold mb-3">Code System Suche</h1>
    <FormControl label="Code System" class="mb-2">
        <Input type="select" inputStyle="bordered" bind:value />
    </FormControl>
    <FormControl label="Code Suche" class="mb-3">
        <Input type="search" inputSize="sm" inputStyle="bordered" bind:value />
    </FormControl>
    <div class="modal-action">
        <Button on:click={() => (isOpen = false)} btnStyle="ghost">Abbrechen</Button>
        <Button on:click={createDocument} color="primary" disabled={!resourceType}>Erstellen</Button>
    </div>
</Modal>
