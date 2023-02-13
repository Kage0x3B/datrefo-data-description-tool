<script lang="ts">
    import TabContainer from '$lib/daisyUiComponents/TabContainer.svelte';
    import type { TabContainerType } from '$lib/types/component/TabContainer';
    import { onMount, setContext, tick } from 'svelte';
    import { documents } from '$lib/projectData';
    import type { InternalDocument } from '$lib/types/InternalDocument';
    import type { DaTreFoEditorContext, EditorTabData, TabType } from '$lib/types/component/DaTreFoEditor';
    import DocumentTab from '$lib/components/DocumentTab.svelte';
    import ExcludeConditionsTab from '$lib/components/ExcludeConditionsTab.svelte';
    import { FhirResourceType } from '$lib/generated/FhirResourceType';
    import { EDITOR_CONTEXT } from '$lib/util/ContextKey';
    import DocumentList from '$lib/components/DocumentList.svelte';
    import MainMenu from '$lib/components/MainMenu.svelte';
    import type {
        CodeAutocompleteModalType,
        ConfirmModalType,
        ModalType,
        ModalTypeNames,
        PromptModalType,
        SelectionOptionsModalType
    } from '$lib/components/modal/ModalType';
    import CreateDocumentModal from '$lib/components/modal/CreateDocumentModal.svelte';
    import SelectionOptionsModal from '$lib/components/modal/SelectionOptionsModal.svelte';
    import ExportModal from '$lib/components/modal/ExportModal.svelte';
    import Icon from '@iconify/svelte';
    import angleRightIcon from '@iconify/icons-fa6-solid/angle-right';
    import PromptModal from '$lib/components/modal/PromptModal.svelte';
    import ConfirmModal from '$lib/components/modal/ConfirmModal.svelte';
    import { t } from 'svelte-i18n';
    import { capitalCase } from 'change-case';
    import CodeAutocompleteModal from '$lib/components/autocomplete/CodeAutocompleteModal.svelte';
    import CreateExcludeConditionModal from '$lib/components/modal/CreateExcludeConditionModal.svelte';

    let tabContainer: TabContainerType;
    let tabs: EditorTabData[] = [];

    let createDocumentModal: ModalType;
    let createExcludeConditionModal: ModalType;
    let selectionOptionsModal: SelectionOptionsModalType;
    let confirmModal: ConfirmModalType;
    let promptModal: PromptModalType;
    let exportModal: ModalType;
    let codeAutocompleteModal: CodeAutocompleteModalType;

    function createDocument(resourceType: FhirResourceType): InternalDocument {
        let idCounter = 0;
        let documentId = resourceType + ++idCounter;

        while ($documents[documentId]) {
            documentId = resourceType + ++idCounter;
        }

        const resourceTypeName = $t(`fhir.resourceType.${resourceType}.name`, {
            default: capitalCase(resourceType ?? '')
        });

        const document: InternalDocument = {
            id: documentId,
            displayName: resourceTypeName + ' ' + idCounter,
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

    function ensureTabContentExists(documents: Record<string, InternalDocument>) {
        for (const tab of tabs) {
            if (tab.type === 'document' && !documents[tab.documentId]) {
                closeTab(tabs);
            }
        }
    }

    $: ensureTabContentExists($documents);

    function showModal<T>(type: ModalTypeNames, ...args: unknown[]): Promise<T> {
        if (type === 'createDocument') {
            createDocumentModal.open();
        } else if (type === 'createExcludeCondition') {
            createExcludeConditionModal.open();
        } else if (type === 'selectionOptions') {
            selectionOptionsModal.open(...args);
        } else if (type === 'confirm') {
            return confirmModal.open(...args);
        } else if (type === 'prompt') {
            return promptModal.open(...args);
        } else if (type === 'export') {
            exportModal.open();
        } else {
            console.warn(`Invalid modal type ${type}`);
        }
    }

    onMount(() => {
        let t = setInterval(() => {
            if (!codeAutocompleteModal.getOpen()) {
                //codeAutocompleteModal.open('icd10Gm', '');
            }
        }, 100);

        return () => clearInterval(t);
    });

    setContext(EDITOR_CONTEXT, {
        createDocument,
        openTab,
        focusTab,
        closeTab,
        showModal
    } satisfies DaTreFoEditorContext);
</script>

<svelte:head>
    <title>DaTreFo Forschungsdaten Beschreibungstool</title>
</svelte:head>

<MainMenu />
<div class="flex flex-row flex-wrap h-full">
    <aside class="w-full sm:w-1/3 md:w-1/4 lg:w-1/5 xl:w-1/6 border-r-2 dark:border-base-200 h-full">
        <DocumentList />
    </aside>
    <main class="w-full sm:w-2/3 md:w-3/4 pt-1 px-2">
        {#if tabs.length}
            <TabContainer boxed bind:this={tabContainer} class="bg-gray-100 dark:bg-neutral">
                {#each tabs as tab (tab.id)}
                    {#if tab.type === 'document'}
                        <DocumentTab tabData={tab} />
                    {:else if tab.type === 'excludePatientConditions'}
                        <ExcludeConditionsTab tabData={tab} />
                    {/if}
                {/each}
            </TabContainer>
        {:else}
            <div class="flex flex-col justify-center items-center p-16 bg-gray-100 dark:bg-neutral">
                <h1 class="text-2xl font-bold">Willkommen im DaTreFo Forschungsdaten Beschreibungstool</h1>
                <span>
                    Um mit dem Auswählen der Forschungsdaten anzufangen, fügen Sie ein neues Dokument hinzu unter <kbd class="kbd"
                        >Datei</kbd
                    ><Icon icon={angleRightIcon} class="inline mx-2 text-base-content/80" /><kbd class="kbd">Neue Resource Datei...</kbd>
                </span>
            </div>
        {/if}
    </main>
</div>

<CreateDocumentModal bind:this={createDocumentModal} />
<CreateExcludeConditionModal bind:this={createExcludeConditionModal} />
<SelectionOptionsModal bind:this={selectionOptionsModal} />
<ConfirmModal bind:this={confirmModal} />
<PromptModal bind:this={promptModal} />
<ExportModal bind:this={exportModal} />
<CodeAutocompleteModal bind:this={codeAutocompleteModal} />
