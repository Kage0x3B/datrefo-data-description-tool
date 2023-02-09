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
    import Collapse from '$lib/daisyUiComponents/Collapse.svelte';
    import Badge from '$lib/daisyUiComponents/Badge.svelte';
    import ConditionList from '$lib/components/conditions/ConditionList.svelte';

    const editor: DaTreFoEditorContext = getContext(EDITOR_CONTEXT);
    export let tabData: EditorDocumentTabData;

    let document: InternalDocument;
    $: document = $documents[tabData.documentId];

    let fhirMetadata: FhirResourceMetadata;
    $: fhirMetadata = fhirResourceTypeMetadata[document?.resourceType];
    $: resourceType = document?.resourceType;
    $: resourceTypeName = $t(`fhir.resourceType.${document?.resourceType}.name`, {
        default: capitalCase((document?.resourceType as string) ?? '')
    });
</script>

{#if document}
    <Tab tabId={tabData.id}>
        <div slot="header" title="{resourceTypeName} Dokument">
            {document.displayName ?? document.id}
            <Button btnStyle="ghost" size="xs" on:click={() => editor.closeTab(tabData.id)}>x</Button>
        </div>
        <div>
            <h1 class="mb-4 font-bold text-xl">
                {document.displayName ?? document.id} Dokument
            </h1>
            {#if fhirMetadata}
                <div class="mx-8">
                    <Collapse
                        color=""
                        class={document.condition.length
                            ? 'bg-warning/30 text-warning-content/80 border-warning/30 dark:bg-warning/5 dark:text-warning/80 dark:border-warning/20'
                            : 'bg-base-200 text-base-content border-gray-400'}
                    >
                        <div slot="title">
                            <span class="mr-2">Bedingungen</span>
                            {#if document.condition.length}
                                <Badge color="warning">{document.condition.length}</Badge>
                            {/if}
                        </div>
                        <ConditionList {resourceType} bind:conditionList={document.condition} />
                    </Collapse>
                </div>
                <hr class="my-6" />
                {#each fhirMetadata.fields as field (field.path)}
                    <SelectableFhirField documentId={tabData.documentId} {resourceType} {field} fieldPath={field.path} />
                {/each}
            {:else}
                Keine Daten für Dokumententyp {document.resourceType} gefunden!
            {/if}
        </div>
    </Tab>
{/if}
