<script lang="ts">
    import type { InternalCombinedCondition } from '$lib/types/InternalDocument';
    import Input from '$lib/daisyUiComponents/Input.svelte';
    import { t } from 'svelte-i18n';
    import FormControl from '$lib/daisyUiComponents/FormControl.svelte';
    import type { DaTreFoOperatorCondition } from '$lib/types/datrefoFormat/DaTreFoCondition';

    type CodeSystem = 'icd10' | 'acme' | 'snomed' | 'loinc' | 'verificationStatus';
    export let condition: InternalCombinedCondition;
    $: basePath = condition.basePath;

    let system: CodeSystem = 'icd10';
    let code = '';

    const codeSystemUri: Record<CodeSystem, string> = {
        snomed: 'http://snomed.info/sct',
        icd10: 'http://fhir.de/CodeSystem/dimdi/icd-10-gm',
        acme: 'https://acme.lab/resultcodes',
        loinc: 'http://loinc.org',
        verificationStatus: 'http://terminology.hl7.org/CodeSystem/condition-ver-status'
    };
    const reversedCodeSystems: Record<string, CodeSystem> = Object.fromEntries(
        Object.entries(codeSystemUri).map(([key, value]) => [value, key])
    ) as Record<string, CodeSystem>;

    function initValues(conditions: DaTreFoOperatorCondition[]) {
        system = reversedCodeSystems[conditions.find((c) => c.leftOperand === 'system').rightOperand] ?? 'snomed';
        code = conditions.find((c) => c.leftOperand === 'code').rightOperand ?? '';
    }

    function onChange(system: CodeSystem, code: string) {
        condition.conditions = [
            {
                leftOperand: 'system',
                operator: 'eq',
                rightOperand: codeSystemUri[system]
            },
            {
                leftOperand: 'code',
                operator: 'eq',
                rightOperand: code
            }
        ];
    }

    $: initValues(condition.conditions);
    $: onChange(system, code);
</script>

<div class="flex flex-row">
    <Input type="text" bind:value={basePath} class="bg-gray-100 dark:bg-base-200 dark:text-base-content cursor-not-allowed mr-2" readonly />
    <Input
        type="text"
        value={$t(`condition.operator.eq.sentencePart`)}
        class="bg-gray-100 dark:bg-base-200 dark:text-base-content cursor-not-allowed mr-2"
    />
    <FormControl>
        <div class="input-group">
            <Input type="select" inputSize="sm" inputStyle="bordered" bind:value={system} class="dark:text-base-content">
                {#each Object.keys(codeSystemUri) as codeSystemType, i}
                    <option value={codeSystemType}>{$t(`codeSystem.${codeSystemType}`)}</option>
                {/each}
            </Input>
            <Input type="text" bind:value={code} inputStyle="bordered" class="dark:text-base-content" />
        </div>
    </FormControl>
</div>
