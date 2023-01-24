<script lang="ts">
    import fhirResourceTypeMetadata from '$lib/generated/fhirResourceTypeMetadata.json';
    import type { FhirDefinition, FhirResourceField } from '$lib/fhir/FhirMetadata';
    import { t } from 'svelte-i18n';
    import { capitalCase } from 'change-case';
    import { convertI18nFhirPath } from '$lib/fhir/fhirI18nUtil.js';
    import { FhirResourceType } from '$lib/generated/FhirResourceType';
    import Input from '$lib/daisyUiComponents/Input.svelte';
    import Icon from '@iconify/svelte';
    import Button from '$lib/daisyUiComponents/Button.svelte';
    import circleQuestionIcon from '@iconify/icons-fa6-solid/circle-question';

    export let resourceType: FhirResourceType;
    export let field: FhirResourceField;
    $: fieldPath = field.path;

    const fhirDefinitions: Record<string, FhirDefinition> = fhirResourceTypeMetadata.definitions;

    let selected = false;
    let showDescription = false;
</script>

<div class="flex flex-col mb-3">
    <div class="flex flex-row mb-1">
        <div class="mr-2">
            <Input type="checkbox" bind:value={selected} color="primary" inputSize="sm" />
        </div>
        {$t(convertI18nFhirPath(resourceType, field.path) + '.name', { default: capitalCase(field.name) })}
        <Button btnStyle="ghost" size="xs" color="primary" on:click={() => (showDescription = !showDescription)}>
            <Icon icon={circleQuestionIcon} />
        </Button>
    </div>
    {#if showDescription}
        <small>{$t(convertI18nFhirPath(resourceType, field.path) + '.description', { default: '' })}</small>
    {/if}
</div>
