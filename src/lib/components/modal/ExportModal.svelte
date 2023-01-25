<script lang="ts">
    import Modal from '$lib/daisyUiComponents/Modal.svelte';
    import Button from '$lib/daisyUiComponents/Button.svelte';
    import Input from '$lib/daisyUiComponents/Input.svelte';
    import type { DaTreFoEditorContext } from '$lib/types/component/DaTreFoEditor';
    import { getContext } from 'svelte';
    import { EDITOR_CONTEXT } from '$lib/util/ContextKey';
    import FormControl from '$lib/daisyUiComponents/FormControl.svelte';
    import type { FhirResourceMetadataMap } from '$lib/fhir/FhirMetadata';
    import fhirResourceTypeMetadataJson from '$lib/generated/fhirResourceTypeMetadata.json';
    import type { ExportOptions } from '$lib/util/daTreFoExporter';
    import { exportProject } from '$lib/util/daTreFoExporter';
    import { saveAs } from 'file-saver';

    const editor: DaTreFoEditorContext = getContext(EDITOR_CONTEXT);
    let fhirResourceTypeMetadata: FhirResourceMetadataMap = fhirResourceTypeMetadataJson;

    let isOpen = false;
    const toggle = () => (isOpen = !isOpen);

    const defaultOptions: ExportOptions = {
        documentContainer: 'json',
        jsonFormat: 'minified',
        selection: 'expandedObject',
        conditions: 'odrl'
    };
    let options: ExportOptions = JSON.parse(JSON.stringify(defaultOptions));

    export function open() {
        isOpen = true;
    }

    export function close() {
        isOpen = false;
    }

    async function onExportProject() {
        const { data, fileName } = await exportProject(options);
        saveAs(data, fileName);

        close();
    }
</script>

<Modal {isOpen} {toggle}>
    <h1 class="text-xl font-bold mb-3">DaTreFo Forschungsdaten Beschreibung exportieren</h1>
    <FormControl label="Dokumenten Container" class="mb-3">
        <Input type="select" inputSize="xs" inputStyle="bordered" bind:value={options.documentContainer}>
            <option value="json">JSON-Datei</option>
            <option value="zip">ZIP-Archiv</option>
        </Input>
    </FormControl>
    <FormControl label="JSON-Format" class="mb-3">
        <Input type="select" inputSize="xs" inputStyle="bordered" bind:value={options.jsonFormat}>
            <option value="prettified">Normale Formatierung</option>
            <option value="minified">Minifiziert</option>
        </Input>
    </FormControl>
    <FormControl label="Selektion" class="mb-3">
        <Input type="select" inputSize="xs" inputStyle="bordered" bind:value={options.selection}>
            <option value="fieldNameArray">JSON-Array der ausgewählten Felder</option>
            <option value="expandedObject">FHIR-Objekt Struktur</option>
        </Input>
    </FormControl>
    <FormControl label="Bedingungen" class="mb-3">
        <Input type="select" inputSize="xs" inputStyle="bordered" bind:value={options.conditions}>
            <option value="odrl">ODLR</option>
        </Input>
    </FormControl>
    <div class="modal-action">
        <Button on:click={() => (isOpen = false)} btnStyle="ghost">Abbrechen</Button>
        <Button on:click={onExportProject} color="primary">Exportieren</Button>
    </div>
</Modal>
