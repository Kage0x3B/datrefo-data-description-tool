<script lang="ts">
    import type { FhirResourceType } from '$lib/generated/FhirResourceType.js';
    import type { DaTreFoCondition } from '$lib/types/datrefoFormat/DaTreFoCondition';
    import { hasOwnProperty } from '$lib/util/util.js';
    import Condition from '$lib/components/conditions/Condition.svelte';
    import LogicalCondition from '$lib/components/conditions/LogicalCondition.svelte';
    import Button from '$lib/daisyUiComponents/Button.svelte';
    import Icon from '@iconify/svelte';
    import trashCanIcon from '@iconify/icons-fa6-solid/trash-can';
    import type { InternalCombinedCondition } from '$lib/types/InternalDocument';
    import { isCombinedCondition } from '$lib/components/conditions/conditionUtil.js';

    export let resourceType: FhirResourceType;
    export let conditionList: (DaTreFoCondition | InternalCombinedCondition)[];

    function removeCondition(condition: DaTreFoCondition): void {
        conditionList = conditionList.filter((c) => c !== condition);
    }
</script>

{JSON.stringify(conditionList, null, 2)}
{#each conditionList as condition}
    <div class="flex flex-row justify-between items-center mb-4">
        {#if hasOwnProperty(condition, 'leftOperand') || isCombinedCondition(condition)}
            <Condition {resourceType} bind:condition />
        {:else}
            <LogicalCondition {resourceType} bind:condition />
        {/if}
        <Button color="error" class="" btnStyle="outline" on:click={() => removeCondition(condition)}>
            <Icon icon={trashCanIcon} />
        </Button>
    </div>
{:else}
    <div class="flex flex-col items-center">
        <strong class="text-lg mb-2">Es sind noch keine Bedingungen für dieses Dokument vorhanden.</strong>
        <p class="text-base-content/80">
            Fügen Sie eine Bedingung hinzu, indem Sie neben einem Feld auf den "Bedingung hinzufügen" Knopf drücken.
        </p>
    </div>
{/each}
