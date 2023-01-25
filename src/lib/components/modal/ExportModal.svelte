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
    import type { FhirResourceMetadataMap } from '$lib/fhir/FhirMetadata';
    import fhirResourceTypeMetadataJson from '$lib/generated/fhirResourceTypeMetadata.json';

    const editor: DaTreFoEditorContext = getContext(EDITOR_CONTEXT);
    let fhirResourceTypeMetadata: FhirResourceMetadataMap = fhirResourceTypeMetadataJson;

    let isOpen = false;
    const toggle = () => (isOpen = !isOpen);

    let resourceType: FhirResourceType | undefined = undefined;
    let showAll = false;

    $: resourceTypeList = showAll
        ? enumValues(FhirResourceType)
        : Object.keys(fhirResourceTypeMetadata).filter((key) => key !== 'definitions');

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
    <FormControl label="Resource Typ" class="mb-3">
        <Input type="select" inputSize="sm" inputStyle="bordered" bind:value={resourceType}>
            {#each resourceTypeList as resourceType}
                <option value={resourceType}>{capitalCase(resourceType)}</option>
            {/each}
        </Input>
    </FormControl>
    <FormControl label="Alle Resourcentypen anzeigen" for="showAllCheckbox" labelInline>
        <Input
            type="checkbox"
            id="showAllCheckbox"
            bind:checked={showAll}
            color="primary"
            inputSize="xs"
            class="mr-2"
        />
    </FormControl>
    <div class="modal-action">
        <Button on:click={() => (isOpen = false)} btnStyle="ghost">Abbrechen</Button>
        <Button on:click={createDocument} color="primary" disabled={!resourceType}>Erstellen</Button>
    </div>
</Modal>
