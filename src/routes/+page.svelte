<script lang="ts">
    import TabContainer from '$lib/daisyUiComponents/TabContainer.svelte';
    import type { TabContainerType } from '$lib/types/component/TabContainer';
    import { onMount, setContext, tick } from 'svelte';
    import { documents } from '$lib/projectData';
    import type { InternalDocument } from '$lib/types/InternalDocument';
    import type { DaTreFoEditorContext, EditorTabData, TabType } from '$lib/types/component/DaTreFoEditor';
    import DocumentTab from '$lib/DocumentTab.svelte';
    import ExcludeConditionsTab from '$lib/ExcludeConditionsTab.svelte';
    import { FhirResourceType } from '$lib/generated/FhirResourceType';
    import { EDITOR_CONTEXT } from '$lib/util/ContextKey';

    let tabContainer: TabContainerType;
    let tabs: EditorTabData[] = [];

    export function createDocument(resourceType: FhirResourceType): InternalDocument {
        const document: InternalDocument = {
            id: resourceType,
            resourceType,
            condition: [],
            selections: {}
        };

        $documents[document.id] = document;

        return document;
    }

    export async function openTab(type: TabType, documentOrId?: InternalDocument | string): Promise<void> {
        const documentId = typeof documentOrId === 'string' ? documentOrId : documentOrId?.id;
        let tabData: EditorTabData;

        if (type === 'document') {
            tabData = {
                id: documentId!,
                documentId: documentId!,
                type: 'document'
            };
        } else {
            tabData = {
                id: 'excludePatientConditions',
                type: 'excludePatientConditions'
            };
        }

        tabs = [...tabs, tabData];

        await tick();

        tabContainer.setActiveTab(tabData.id);
    }

    export function focusTab(tabId: string) {
        tabContainer.setActiveTab(tabId);
    }

    export function closeTab(tabId: string) {
        tabs = tabs.filter((tab) => tab.id !== tabId);
    }

    setContext(EDITOR_CONTEXT, {
        createDocument,
        openTab,
        focusTab,
        closeTab
    } satisfies DaTreFoEditorContext);

    onMount(() => {
        const testDocument = createDocument(FhirResourceType.MEDICATION);
        openTab('document', testDocument);
    });
</script>

<TabContainer boxed bind:this={tabContainer}>
    {#each tabs as tab (tab.id)}
        {#if tab.type === 'document'}
            <DocumentTab editor={this} tabData={tab} />
        {:else if tab.type === 'excludePatientConditions'}
            <ExcludeConditionsTab />
        {/if}
    {:else}
        TODO: Willkommen Seite
    {/each}
</TabContainer>
