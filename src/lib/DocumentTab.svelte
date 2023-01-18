<script lang="ts">
    import Input from '$lib/daisyUiComponents/Input.svelte';
    import Tab from '$lib/daisyUiComponents/Tab.svelte';
    import Button from '$lib/daisyUiComponents/Button.svelte';
    import type { DaTreFoEditor, EditorDocumentTabData } from '$lib/types/component/DaTreFoEditor';
    import { documents } from '$lib/projectData.js';
    import type { InternalDocument } from '$lib/types/InternalDocument';

    export let editor: DaTreFoEditor;
    export let tabData: EditorDocumentTabData;

    let document: InternalDocument;
    $: document = $documents[tabData.documentId];
</script>

<Tab tabId={tabData.id}>
    <div slot="header">
        {document.displayName ?? document.resourceType} [{document.id}]
        <Button btnStyle="ghost" size="xs">x</Button>
    </div>
    <h1>{document.resourceType} Dokument</h1>
    <Input type="checkbox" color="primary" />
    <Button color="accent" href="/test">Test</Button>
    <Input type="select">
        {#each [1, 2, 3, 4, 5] as i}
            <option>Option {i}</option>
        {/each}
    </Input>
</Tab>
