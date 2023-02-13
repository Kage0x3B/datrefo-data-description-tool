<script lang="ts">
    import Tab from '$lib/daisyUiComponents/Tab.svelte';
    import Button from '$lib/daisyUiComponents/Button.svelte';
    import type { DaTreFoEditorContext, EditorExcludePatientConditionsTabData } from '$lib/types/component/DaTreFoEditor';
    import { getContext } from 'svelte';
    import { EDITOR_CONTEXT } from '$lib/util/ContextKey';
    import plusIcon from '@iconify/icons-fa6-solid/plus';
    import { excludePatientConditions } from '$lib/projectData';
    import { FhirResourceType } from '$lib/generated/FhirResourceType';
    import ConditionList from '$lib/components/conditions/ConditionList.svelte';
    import { t } from 'svelte-i18n';
    import { capitalCase } from 'change-case';
    import Icon from '@iconify/svelte';

    const editor: DaTreFoEditorContext = getContext(EDITOR_CONTEXT);
    export let tabData: EditorExcludePatientConditionsTabData;

    let resourceTypes: FhirResourceType[] = [];
    $: resourceTypes = Object.keys($excludePatientConditions).sort();
</script>

{#if document}
    <Tab tabId={tabData.id}>
        <div slot="header">
            Ausschlusskriterien
            <Button btnStyle="ghost" size="xs" on:click={() => editor.closeTab(tabData.id)}>x</Button>
        </div>
        <div>
            <div class="flex justify-between">
                <h1 class="mb-4 font-bold text-xl">Ausschlusskriterien</h1>
                <Button color="success" btnStyle="outline" size="sm" on:click={() => editor.showModal('createExcludeCondition')}>
                    <Icon icon={plusIcon} class="mr-2" />
                    Neue Bedingung hinzufügen
                </Button>
            </div>
            {#each resourceTypes as resourceType}
                <h2 class="mb-3 font-bold text-lg">
                    {$t(`fhir.resourceType.${resourceType}.name`, {
                        default: capitalCase(resourceType ?? '')
                    })}
                </h2>
                <ConditionList leftOperandEditable {resourceType} bind:conditionList={$excludePatientConditions[resourceType]} />
            {:else}
                <span class="text-base-content/80">Noch keine Ausschlusskriterien vorhanden</span>
            {/each}
        </div>
    </Tab>
{/if}
