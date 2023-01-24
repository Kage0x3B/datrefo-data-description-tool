<script lang="ts">
    import Tab from '$lib/daisyUiComponents/Tab.svelte';
    import Button from '$lib/daisyUiComponents/Button.svelte';
    import type { DaTreFoEditorContext, EditorDocumentTabData } from '$lib/types/component/DaTreFoEditor';
    import { documents } from '$lib/projectData';
    import type { InternalDocument } from '$lib/types/InternalDocument';
    import { getContext } from 'svelte';
    import { EDITOR_CONTEXT } from '$lib/util/ContextKey';
    import fhirResourceTypeMetadata from '$lib/generated/fhirResourceTypeMetadata.json';
    import type { FhirResourceMetadata } from '$lib/fhir/FhirMetadata';
    import { t } from 'svelte-i18n';
    import { capitalCase } from 'change-case';
    import SelectableFhirField from '$lib/components/SelectableFhirField.svelte';

    const editor: DaTreFoEditorContext = getContext(EDITOR_CONTEXT);
    export let tabData: EditorDocumentTabData;

    let document: InternalDocument;
    $: document = $documents[tabData.documentId];

    let fhirMetadata: FhirResourceMetadata;
    $: fhirMetadata = fhirResourceTypeMetadata[document.resourceType];
    $: resourceType = document.resourceType;
    $: resourceTypeName = $t(`fhir.resourceType.${document.resourceType}.name`, {
        default: capitalCase(document.resourceType as string)
    });
</script>

<Tab tabId={tabData.id}>
    <div slot="header">
        {document.displayName ?? document.resourceType} [{document.id}]
        <Button btnStyle="ghost" size="xs" on:click={() => editor.closeTab(tabData.id)}>x</Button>
    </div>
    <div class="p-3">
        <h1 class="mb-4 font-bold text-xl">
            {resourceTypeName} Dokument
        </h1>
        {#if fhirMetadata}
            {#each fhirMetadata.fields as field (field.path)}
                <SelectableFhirField {resourceType} {field} />
            {/each}
        {:else}
            Keine Daten für Dokumententyp {document.resourceType} gefunden!
        {/if}
    </div>
</Tab>
