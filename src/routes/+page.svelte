<script lang="ts">
    import TabContainer from '$lib/daisyUiComponents/TabContainer.svelte';
    import type { TabContainerType } from '$lib/types/component/TabContainer';
    import { setContext, tick } from 'svelte';
    import { documents } from '$lib/projectData';
    import type { InternalDocument } from '$lib/types/InternalDocument';
    import type { DaTreFoEditorContext, EditorTabData, TabType } from '$lib/types/component/DaTreFoEditor';
    import DocumentTab from '$lib/components/DocumentTab.svelte';
    import ExcludeConditionsTab from '$lib/components/ExcludeConditionsTab.svelte';
    import { FhirResourceType } from '$lib/generated/FhirResourceType';
    import { EDITOR_CONTEXT } from '$lib/util/ContextKey';
    import DocumentList from '$lib/components/documentList/DocumentList.svelte';
    import MainMenu from '$lib/components/MainMenu.svelte';
    import type { ModalType } from '$lib/components/modal/ModalType';
    import CreateDocumentModal from '$lib/components/modal/CreateDocumentModal.svelte';

    let tabContainer: TabContainerType;
    let tabs: EditorTabData[] = [];

    let createDocumentModal: ModalType;

    function createDocument(resourceType: FhirResourceType): InternalDocument {
        let idCounter = 1;
        let documentId = resourceType + idCounter++;

        while ($documents[documentId]) {
            documentId = resourceType + idCounter++;
        }

        const document: InternalDocument = {
            id: documentId,
            resourceType,
            condition: [],
            selections: {}
        };

        $documents[document.id] = document;

        return document;
    }

    async function openTab(type: TabType, documentOrId?: InternalDocument | string): Promise<void> {
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

        if (tabs.find((tab) => tab.id === tabData.id)) {
            focusTab(tabData.id);

            return;
        }

        tabs = [...tabs, tabData];

        await tick();

        focusTab(tabData.id);
    }

    function focusTab(tabId: string) {
        tabContainer.setActiveTab(tabId);
    }

    function closeTab(tabId: string) {
        tabs = tabs.filter((tab) => tab.id !== tabId);
    }

    function showModal(type: 'createDocument'): void {
        if (type === 'createDocument') {
            createDocumentModal.open();
        } else {
            console.warn(`Invalid modal type ${type}`);
        }
    }

    setContext(EDITOR_CONTEXT, {
        createDocument,
        openTab,
        focusTab,
        closeTab,
        showModal
    } satisfies DaTreFoEditorContext);
</script>

<MainMenu />
<div class="flex flex-row flex-wrap h-full">
    <aside class="w-full sm:w-1/3 md:w-1/4 lg:w-1/5 xl:w-1/6 border-r-2 dark:border-base-200 h-full">
        <DocumentList />
    </aside>
    <main class="w-full sm:w-2/3 md:w-3/4 pt-1 px-2">
        <TabContainer boxed bind:this={tabContainer}>
            {#each tabs as tab (tab.id)}
                {#if tab.type === 'document'}
                    <DocumentTab editor={this} tabData={tab} />
                {:else if tab.type === 'excludePatientConditions'}
                    <ExcludeConditionsTab />
                {/if}
            {/each}
        </TabContainer>
    </main>
</div>
<CreateDocumentModal bind:this={createDocumentModal} />
