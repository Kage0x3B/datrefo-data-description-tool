<script lang="ts">
    import { FhirResourceType } from '$lib/generated/FhirResourceType';
    import { documents } from '$lib/projectData';
    import { groupByKey } from '$lib/util/util';
    import type { InternalDocument } from '$lib/types/InternalDocument';
    import type { DaTreFoEditorContext } from '$lib/types/component/DaTreFoEditor';
    import { getContext } from 'svelte';
    import { EDITOR_CONTEXT } from '$lib/util/ContextKey';
    import Button from '$lib/daisyUiComponents/Button.svelte';
    import Icon from '@iconify/svelte';
    import pencilIcon from '@iconify/icons-fa6-solid/pencil';
    import trashCanIcon from '@iconify/icons-fa6-solid/trash-can';
    import { t } from 'svelte-i18n';
    import { capitalCase } from 'change-case';

    const editor: DaTreFoEditorContext = getContext(EDITOR_CONTEXT);

    $: sortedDocuments = groupByKey<InternalDocument, FhirResourceType>(Object.values($documents), 'resourceType');
    $: sortedResourceTypes = Object.keys(sortedDocuments).sort();

    function renameDocument(document: InternalDocument) {
        return async (e: MouseEvent) => {
            e.preventDefault();

            const newName = await editor.showModal<string | false>(
                'prompt',
                `Dokument "${document.displayName ?? document.id}" umbenennen`,
                document.displayName ?? document.id,
                'Umbenennen',
                'Abbrechen'
            );

            if (newName) {
                $documents[document.id].displayName = newName;
                $documents = $documents;
            }
        };
    }

    function removeDocument(document: InternalDocument) {
        return async (e: MouseEvent) => {
            e.preventDefault();

            if (
                await editor.showModal<boolean>(
                    'confirm',
                    `Soll das Dokument "${document.displayName ?? document.id}" wirklich gelöscht werden?`,
                    'Löschen',
                    'Abbrechen'
                )
            ) {
                delete $documents[document.id];
                $documents = $documents;
            }
        };
    }
</script>

<h1 class="text-base-content/80 font-bold px-6 py-2 bg-gray-200 dark:bg-base-200">Alle Dokumente</h1>
<ul class="menu bg-base-100 w-full p-2 rounded-box overflow-hidden">
    {#each sortedResourceTypes as resourceType (resourceType)}
        {#if sortedDocuments[resourceType].length > 1}
            <li class="menu-title">
                <span class="uppercase">
                    {$t(`fhir.resourceType.${resourceType}.name`, {
                        default: capitalCase(resourceType ?? '')
                    })}
                </span>
            </li>
        {/if}
        {#each sortedDocuments[resourceType] as document (document.id)}
            <li
                class="w-full document-item"
                title="{$t(`fhir.resourceType.${resourceType}.name`, {
                    default: capitalCase(resourceType ?? '')
                })} Dokument"
            >
                <a on:click={() => editor.openTab('document', document)} class="flex flex-row justify-between w-full">
                    <span class="overflow-hidden overflow-ellipsis">{document.displayName ?? document.id}</span>
                    <div class="action-button-container hidden">
                        <Button color="info" btnStyle="ghost" size="xs" class="text-info" on:click={renameDocument(document)}>
                            <Icon icon={pencilIcon} />
                        </Button>
                        <Button color="error" btnStyle="ghost" size="xs" class="text-error" on:click={removeDocument(document)}>
                            <Icon icon={trashCanIcon} />
                        </Button>
                    </div>
                </a>
            </li>
        {/each}
    {:else}
        <li class="px-3 py-1 text-base-content/80">Keine Dokumente angelegt</li>
    {/each}
</ul>

<style>
    .document-item:hover .action-button-container {
        display: flex;
    }
</style>
