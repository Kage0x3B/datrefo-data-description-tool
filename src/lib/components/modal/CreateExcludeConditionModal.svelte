<script lang="ts">
    import Modal from '$lib/daisyUiComponents/Modal.svelte';
    import Button from '$lib/daisyUiComponents/Button.svelte';
    import Input from '$lib/daisyUiComponents/Input.svelte';
    import { enumValues } from '$lib/util/util.js';
    import { FhirResourceType } from '$lib/generated/FhirResourceType.js';
    import { capitalCase } from 'change-case';
    import type { DaTreFoEditorContext } from '$lib/types/component/DaTreFoEditor';
    import { getContext } from 'svelte';
    import { EDITOR_CONTEXT } from '$lib/util/ContextKey';
    import FormControl from '$lib/daisyUiComponents/FormControl.svelte';
    import { t } from 'svelte-i18n';
    import { excludePatientConditions } from '$lib/projectData';
    import type { DaTreFoOperatorCondition } from '$lib/types/datrefoFormat/DaTreFoCondition';

    const editor: DaTreFoEditorContext = getContext(EDITOR_CONTEXT);

    let isOpen = false;
    const toggle = () => (isOpen = !isOpen);

    let resourceType: FhirResourceType | undefined = undefined;
    let showAll = false;

    const importantResourceTypes: FhirResourceType[] = [
        FhirResourceType.PATIENT,
        FhirResourceType.CONDITION,
        FhirResourceType.MEDICATION,
        FhirResourceType.MEDICATION_ADMINISTRATION,
        FhirResourceType.MEDICATION_DISPENSE,
        FhirResourceType.MEDICATION_REQUEST,
        FhirResourceType.MEDICATION_USAGE,
        FhirResourceType.MEDICATION_KNOWLEDGE,
        FhirResourceType.OBSERVATION,
        FhirResourceType.OPERATION_DEFINITION,
        FhirResourceType.OPERATION_OUTCOME,
        FhirResourceType.PROCEDURE
    ].sort();
    $: resourceTypeList = showAll ? enumValues(FhirResourceType) : importantResourceTypes;

    export function open() {
        resourceType = undefined;
        isOpen = true;
    }

    export function close() {
        isOpen = false;
    }

    function createExcludeConditionResourceType() {
        if (!resourceType) {
            return;
        }

        if (!$excludePatientConditions[resourceType]) {
            $excludePatientConditions[resourceType] = [];
        }

        $excludePatientConditions[resourceType].push({
            leftOperand: '',
            operator: 'eq',
            rightOperand: ''
        } satisfies DaTreFoOperatorCondition);

        $excludePatientConditions = $excludePatientConditions;
        close();
    }
</script>

<Modal {isOpen} {toggle}>
    <h1 class="text-xl font-bold mb-3">Ausschlusskriterium erstellen</h1>
    <FormControl label="Resource Typ" class="mb-3">
        <Input type="select" inputSize="sm" inputStyle="bordered" bind:value={resourceType}>
            {#each resourceTypeList as resourceType}
                <option value={resourceType}
                    >{$t(`fhir.resourceType.${resourceType}.name`, {
                        default: capitalCase(resourceType)
                    })}</option
                >
            {/each}
        </Input>
    </FormControl>
    <FormControl label="Alle Resourcentypen anzeigen" for="showAllCheckbox" labelInline>
        <Input type="checkbox" id="showAllCheckbox" bind:checked={showAll} color="primary" inputSize="xs" class="mr-2" />
    </FormControl>
    <div class="modal-action">
        <Button on:click={() => (isOpen = false)} btnStyle="ghost">Abbrechen</Button>
        <Button on:click={createExcludeConditionResourceType} color="primary" disabled={!resourceType}>Erstellen</Button>
    </div>
</Modal>
