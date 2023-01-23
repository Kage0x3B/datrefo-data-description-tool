<script lang="ts">
    import { FhirResourceType } from '$lib/generated/FhirResourceType';
    import { documents } from '$lib/projectData';
    import { groupByKey } from '$lib/util/util';
    import type { InternalDocument } from '$lib/types/InternalDocument';
    import type { DaTreFoEditorContext } from '$lib/types/component/DaTreFoEditor';
    import { getContext } from 'svelte';
    import { EDITOR_CONTEXT } from '$lib/util/ContextKey';

    const editor: DaTreFoEditorContext = getContext(EDITOR_CONTEXT);

    $: sortedDocuments = groupByKey<InternalDocument, FhirResourceType>(Object.values($documents), 'resourceType');
    $: sortedResourceTypes = Object.keys(sortedDocuments).sort();
</script>

<h1 class="text-base-content/80 font-bold px-6 py-2 bg-gray-200 dark:bg-base-200">Alle Dokumente</h1>
<ul class="menu bg-base-100 w-full p-2 rounded-box">
    {#each sortedResourceTypes as resourceType (resourceType)}
        {#if sortedDocuments[resourceType].length > 1}
            <li class="menu-title">
                <span class="uppercase">{resourceType}</span>
            </li>
        {/if}
        {#each sortedDocuments[resourceType] as document (document.id)}
            <li>
                <a on:click={() => editor.openTab('document', document)}>
                    {document.displayName ?? document.id}
                </a>
            </li>
        {/each}
    {:else}
        Keine Dokumente angelegt
    {/each}
</ul>
