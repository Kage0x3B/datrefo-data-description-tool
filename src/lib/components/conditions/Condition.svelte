<script lang="ts">
    import { FhirResourceType } from '$lib/generated/FhirResourceType';
    import Input from '$lib/daisyUiComponents/Input.svelte';
    import { displayedOperators, findNestedField, isCombinedCondition } from '$lib/components/conditions/conditionUtil.js';
    import { t } from 'svelte-i18n';
    import type { FhirResourceMetadata } from '$lib/fhir/FhirMetadata';
    import fhirResourceTypeMetadata from '$lib/generated/fhirResourceTypeMetadata.json';
    import { isFieldTypeDecimal, isFieldTypeNumber, isFieldTypeOnlyPositive } from '$lib/fhir/fhirUtil.js';
    import type { InternalCombinedCondition } from '$lib/types/InternalDocument';
    import type { DaTreFoOperatorCondition } from '$lib/types/datrefoFormat/DaTreFoCondition';
    import { FhirFieldObjectType } from '$lib/fhir/FhirFieldObjectType';
    import CodeableConceptCombinedCondition from '$lib/components/conditions/CodeableConceptCombinedCondition.svelte';

    export let resourceType: FhirResourceType;
    export let condition: DaTreFoOperatorCondition | InternalCombinedCondition;

    let fhirMetadata: FhirResourceMetadata;
    $: fhirMetadata = fhirResourceTypeMetadata[resourceType];
    $: field = findNestedField(
        fhirMetadata.fields,
        fhirResourceTypeMetadata.definitions,
        isCombinedCondition(condition) ? condition.basePath : condition.leftOperand
    );
</script>

{#if isCombinedCondition(condition)}
    {#if field.type === FhirFieldObjectType.CODING || field.type === FhirFieldObjectType.CODEABLE_CONCEPT}
        <CodeableConceptCombinedCondition bind:condition />
    {/if}
{:else}
    <div class="flex flex-row">
        <Input
            type="text"
            bind:value={condition.leftOperand}
            class="bg-gray-100 dark:bg-base-200 dark:text-base-content cursor-not-allowed mr-2"
            readonly
        />
        <Input type="select" inputSize="sm" inputStyle="bordered" bind:value={condition.operator} class="mr-2 dark:text-base-content">
            {#each displayedOperators as operatorType}
                <option value={operatorType}>{$t(`condition.operator.${operatorType}.sentencePart`)}</option>
            {/each}
        </Input>
        {#if field}
            {#if field.type === 'boolean'}
                <Input type="checkbox" bind:value={condition.rightOperand} />
            {:else if isFieldTypeNumber(field)}
                <Input
                    type="number"
                    bind:value={condition.rightOperand}
                    min={isFieldTypeOnlyPositive(field) ? 0 : undefined}
                    step={isFieldTypeDecimal(field) ? 0.01 : 1}
                    class="dark:text-base-content"
                />
            {:else}
                <Input type="text" bind:value={condition.rightOperand} class="dark:text-base-content" />
            {/if}
        {:else}
            <Input type="text" value="Invalider linker Operand" class="dark:text-base-content" />
        {/if}
    </div>
{/if}
