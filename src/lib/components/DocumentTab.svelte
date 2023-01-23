<script lang="ts">
    import Input from '$lib/daisyUiComponents/Input.svelte';
    import Tab from '$lib/daisyUiComponents/Tab.svelte';
    import Button from '$lib/daisyUiComponents/Button.svelte';
    import type { DaTreFoEditorContext, EditorDocumentTabData } from '$lib/types/component/DaTreFoEditor';
    import { documents } from '$lib/projectData';
    import type { InternalDocument } from '$lib/types/InternalDocument';
    import { getContext } from 'svelte';
    import { EDITOR_CONTEXT } from '$lib/util/ContextKey';
    import CreateDocumentModal from '$lib/components/modal/CreateDocumentModal.svelte';
    import type { ModalType } from '$lib/components/modal/ModalType';

    const editor: DaTreFoEditorContext = getContext(EDITOR_CONTEXT);
    export let tabData: EditorDocumentTabData;

    let document: InternalDocument;
    $: document = $documents[tabData.documentId];
</script>

<Tab tabId={tabData.id}>
    <div slot="header">
        {document.displayName ?? document.resourceType} [{document.id}]
        <Button btnStyle="ghost" size="xs" on:click={() => editor.closeTab(tabData.id)}>x</Button>
    </div>
    <h1>{document.resourceType} Dokument</h1>
    <Input type="checkbox" color="primary" inputSize="sm" />
    <Button color="accent" href="/test" size="sm">Test</Button>
    <Input type="select" inputSize="sm" inputStyle="bordered">
        {#each [1, 2, 3, 4, 5] as i}
            <option>Option {i}</option>
        {/each}
    </Input>
</Tab>
