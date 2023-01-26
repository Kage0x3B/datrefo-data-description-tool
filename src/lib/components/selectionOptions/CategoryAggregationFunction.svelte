<script lang="ts">
    import type { AggregationParameters } from '$lib/types/datrefoFormat/DaTreFoSelection';
    import Button from '$lib/daisyUiComponents/Button.svelte';
    import trashCanIcon from '@iconify/icons-fa6-solid/trash-can';
    import plusIcon from '@iconify/icons-fa6-solid/plus';
    import Icon from '@iconify/svelte';
    import Input from '$lib/daisyUiComponents/Input.svelte';
    import { t } from 'svelte-i18n';
    import type { FhirResourceField } from '$lib/fhir/FhirMetadata';
    import { isFieldTypeDecimal, isFieldTypeOnlyPositive } from '$lib/fhir/fhirUtil';

    export let field: FhirResourceField;
    export let parameters: NonNullable<AggregationParameters['category']>;
    export let hasError = false;

    $: if (!parameters) {
        parameters = [];
    }

    $: inputDecimal = isFieldTypeDecimal(field);
    $: inputPositive = isFieldTypeOnlyPositive(field);
    let errorTranslation: [string, Record<string, unknown>] | undefined = undefined;
    $: errorTranslation = checkCategories(parameters);
    $: hasError = !!errorTranslation;

    function addRow(): void {
        if (!parameters.length) {
            parameters = [
                {
                    label: '',
                    lessThan: 1
                }
            ];
        } else {
            parameters = [
                ...parameters,
                {
                    label: '',
                    moreThanOrEqual: parameters[parameters.length - 1].lessThan,
                    lessThan: parameters[parameters.length - 1].lessThan + 1
                }
            ];
        }
    }

    function removeRow(row: unknown): void {
        parameters = parameters.filter((p) => p !== row);
    }

    function checkCategories(categories: NonNullable<AggregationParameters['category']>): [string, Record<string, unknown>] | undefined {
        if (!categories.length) {
            return ['noCategories', {}];
        }

        for (let i = 0; i < categories.length; i++) {
            const category = categories[i];

            if (!category.label) {
                return ['missingLabel', {}];
            }

            if (
                typeof category.moreThanOrEqual === 'number' &&
                typeof category.lessThan === 'number' &&
                category.moreThanOrEqual >= category.lessThan
            ) {
                return ['invalidRange', { label: category.label }];
            }

            if (
                (typeof category.moreThanOrEqual !== 'number' && i > 0) ||
                (typeof category.lessThan !== 'number' && i !== categories.length - 1)
            ) {
                return ['undefinedValue', {}];
            }
        }

        return undefined;
    }
</script>

<h3 class="mb-2 text-lg">Kategorien</h3>

<table class="table w-full table-compact">
    <thead>
        <tr>
            <th>Label</th>
            <th>Min. Wert (inklusiv)</th>
            <th>Max. Wert (exklusiv)</th>
            <th>&nbsp;</th>
        </tr>
    </thead>
    <tbody>
        {#each parameters as range}
            <tr>
                <td>
                    <Input type="text" bind:value={range.label} inputStyle="bordered" class="w-11/12" />
                </td>
                <td>
                    <Input
                        type="number"
                        bind:value={range.moreThanOrEqual}
                        min={inputPositive ? 0 : undefined}
                        step={inputDecimal ? 0.01 : 1}
                        inputStyle="bordered"
                        class="w-11/12 {typeof range.moreThanOrEqual !== 'number' ? 'bg-base-200/50' : ''}"
                    />
                </td>
                <td>
                    <Input
                        type="number"
                        bind:value={range.lessThan}
                        min={inputPositive ? 0 : undefined}
                        step={inputDecimal ? 0.01 : 1}
                        inputStyle="bordered"
                        class="w-11/12  {typeof range.lessThan !== 'number' ? 'bg-base-200/50' : ''}"
                    />
                </td>
                <td>
                    <Button size="xs" color="error" class="text-error" btnStyle="ghost" on:click={() => removeRow(range)}>
                        <Icon icon={trashCanIcon} />
                    </Button>
                </td>
            </tr>
        {:else}
            <tr>
                <td colspan="4" class="text-neutral-content/80"> Noch keine Wertebereiche angelegt</td>
            </tr>
        {/each}
    </tbody>
</table>
<div class="flex flex-row justify-between">
    <Button color="success" btnStyle="outline" size="sm" on:click={addRow}>
        <Icon icon={plusIcon} class="mr-2" />
        Neue Kategorie
    </Button>
    {#if errorTranslation}
        <span class="text-warning">
            {$t('warning')}: {$t('selection.aggregationFunction.category.warning.' + errorTranslation[0], { values: errorTranslation[1] })}
        </span>
    {/if}
</div>
