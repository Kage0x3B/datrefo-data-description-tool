<script lang="ts">
    import type { DaTreFoLogicalCondition } from '$lib/types/datrefoFormat/DaTreFoCondition';
    import type { FhirResourceType } from '$lib/generated/FhirResourceType';
    import Condition from '$lib/components/conditions/Condition.svelte';
    import { capitalCase } from 'change-case';

    export let resourceType: FhirResourceType;
    export let condition: DaTreFoLogicalCondition;
    export let leftOperandEditable = false;
</script>

<div class="flex flex-col">
    {#each condition.operand as operand, i}
        <Condition {resourceType} bind:condition={operand} {leftOperandEditable} />
        <div class="w-full flex flex-row justify-center">
            {#if i !== condition.operand.length - 1}
                {capitalCase(condition.operator)}
            {/if}
        </div>
    {/each}
</div>
