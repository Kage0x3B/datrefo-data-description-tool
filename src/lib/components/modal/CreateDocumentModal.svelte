<script lang="ts">
    import Modal from '$lib/daisyUiComponents/Modal.svelte';
    import Button from '$lib/daisyUiComponents/Button.svelte';
    import Input from '$lib/daisyUiComponents/Input.svelte';
    import { enumValues } from '$lib/util/util.js';
    import { FhirResourceType } from '$lib/generated/FhirResourceType.js';
    import { capitalCase } from 'change-case';
    import type { DaTreFoEditorContext } from '$lib/types/component/DaTreFoEditor';
    import { getContext } from 'svelte';
    import { EDITOR_CONTEXT } from '$lib/util/ContextKey';
    import FormControl from '$lib/daisyUiComponents/FormControl.svelte';

    const editor: DaTreFoEditorContext = getContext(EDITOR_CONTEXT);

    let isOpen = false;
    const toggle = () => (isOpen = !isOpen);

    let resourceType: FhirResourceType | undefined = undefined;

    export function open() {
        resourceType = undefined;
        isOpen = true;
    }

    export function close() {
        isOpen = false;
    }

    function createDocument() {
        if (!resourceType) {
            return;
        }

        const document = editor.createDocument(resourceType);
        editor.openTab('document', document);
        close();
    }
</script>

<Modal {isOpen} {toggle}>
    <h1 class="text-xl font-bold mb-3">Resource Datei erstellen</h1>
    <FormControl label="Resource Typ">
        <Input type="select" inputSize="sm" inputStyle="bordered" bind:value={resourceType}>
            {#each enumValues(FhirResourceType) as resourceType}
                <option value={resourceType}>{capitalCase(resourceType)}</option>
            {/each}
        </Input>
    </FormControl>
    <div class="modal-action">
        <Button on:click={() => (isOpen = false)} btnStyle="ghost">Abbrechen</Button>
        <Button on:click={createDocument} color="primary" disabled={!resourceType}>Erstellen</Button>
    </div>
</Modal>
