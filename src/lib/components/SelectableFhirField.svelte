<script context="module" lang="ts">
    import { writable } from 'svelte/store';

    const currentHoveredField = writable<string | undefined>('');
</script>

<script lang="ts">
    import fhirResourceTypeMetadata from '$lib/generated/fhirResourceTypeMetadata.json';
    import type { FhirDefinition, FhirResourceField } from '$lib/fhir/FhirMetadata.js';
    import { t } from 'svelte-i18n';
    import { capitalCase } from 'change-case';
    import { convertI18nFhirDefinitionPath, convertI18nFhirFieldPath } from '$lib/fhir/fhirI18nUtil.js';
    import { FhirResourceType } from '$lib/generated/FhirResourceType';
    import { documents } from '$lib/projectData';
    import type { DaTreFoSelection, DaTreFoSelectionOptions } from '$lib/types/datrefoFormat/DaTreFoSelection';
    import Icon from '@iconify/svelte';
    import circleQuestionIcon from '@iconify/icons-fa6-solid/circle-question';
    import Button from '$lib/daisyUiComponents/Button.svelte';
    import Input from '$lib/daisyUiComponents/Input.svelte';
    import { debounceLeading, enumValues } from '$lib/util/util';
    import chevronRightIcon from '@iconify/icons-fa6-solid/chevron-right';
    import chevronDownIcon from '@iconify/icons-fa6-solid/chevron-down';
    import { slide } from 'svelte/transition';
    import type { DaTreFoEditorContext } from '$lib/types/component/DaTreFoEditor';
    import { getContext } from 'svelte';
    import { EDITOR_CONTEXT } from '$lib/util/ContextKey';
    import type { MessageFormatter } from '$lib/types/MessageFormatter';
    import { isAnyPseudonymizationFunctionAvailable } from '$lib/components/selectionOptions/selectionOptions';
    import ButtonGroup from '$lib/daisyUiComponents/ButtonGroup.svelte';
    import { FhirFieldPrimitiveType } from '$lib/fhir/FhirFieldPrimitiveType';
    import { isFieldTypeCombinedCondition } from '$lib/fhir/fhirUtil';
    import type { InternalCombinedCondition } from '$lib/types/InternalDocument';
    import { createCondition } from '$lib/components/conditions/conditionUtil';

    export let documentId: string;
    export let resourceType: FhirResourceType;
    export let containingDefinition = '';
    export let field: FhirResourceField;
    export let fieldPath: string;
    export let depth = 0;

    const editor: DaTreFoEditorContext = getContext(EDITOR_CONTEXT);
    const fhirDefinitions: Record<string, FhirDefinition> = fhirResourceTypeMetadata.definitions;

    let selection: DaTreFoSelection;
    $: selection = $documents[documentId].selections[fieldPath];
    $: indirectlySelected = isIndirectlySelected(fieldPath, $documents[documentId].selections);
    $: isSelected = !!selection || indirectlySelected;

    let expanded = false;
    $: hovered = fieldPath === $currentHoveredField;
    let descriptionVisible = false;
    $: if (!hovered) {
        descriptionVisible = false;
    }
    $: showPseudonomyzationButton = isAnyPseudonymizationFunctionAvailable(field);
    $: showConditionButton = field.type !== 'definition';

    function isIndirectlySelected(fieldPath: string, selections: Record<string, boolean | DaTreFoSelectionOptions>): boolean {
        return Object.keys(selections).some((path) => {
            const fieldPathNestedLevel = (fieldPath.match(/\./g) || []).length;
            const selectionPathNestedLevel = (path.match(/\./g) || []).length;

            return fieldPath !== path && fieldPath.startsWith(path) && fieldPathNestedLevel > selectionPathNestedLevel;
        });
    }

    function getTranslationProperty(
        property: 'name' | 'description',
        t: MessageFormatter,
        resourceType: FhirResourceType,
        field: FhirResourceField,
        fullFieldPath: string,
        defaultValue = ''
    ) {
        const fieldName = t(convertI18nFhirFieldPath(resourceType, field.path) + '.' + property, { default: '' });
        const definitionName = containingDefinition
            ? t(convertI18nFhirDefinitionPath(containingDefinition, fullFieldPath) + '.' + property, { default: '' })
            : '';

        return fieldName || definitionName || defaultValue;
    }

    function getFieldType(t: MessageFormatter, resourceType: FhirResourceType, field: FhirResourceField, fullFieldPath: string): string {
        if (field.definition) {
            return capitalCase(field.definition);
        }

        return capitalCase(field.type);
    }

    $: fieldDisplayName = getTranslationProperty('name', $t, resourceType, field, fieldPath, capitalCase(field.name));
    $: fieldDescription = getTranslationProperty('description', $t, resourceType, field, fieldPath);
    $: fieldType = getFieldType($t, resourceType, field, fieldPath);

    function toggle() {
        if (indirectlySelected) {
            return;
        }

        if (selection) {
            delete $documents[documentId].selections[fieldPath];
            $documents = $documents;
        } else {
            $documents[documentId].selections[fieldPath] = true;
            $documents = $documents;
        }
    }

    function _updateHover(event: MouseEvent) {
        event.stopPropagation();

        if (event.type === 'mouseleave' || !event.target) {
            $currentHoveredField = undefined;

            return;
        }

        const targetElement = event.target as HTMLElement;

        const closestFieldElement: HTMLDivElement | undefined = targetElement.closest('div[data-field-path]');
        if (closestFieldElement) {
            $currentHoveredField = closestFieldElement.getAttribute('data-field-path');
        } else {
            $currentHoveredField = undefined;
        }
    }

    const updateHover = debounceLeading(_updateHover, 50);

    function addCondition() {
        $documents[documentId].condition = [...$documents[documentId].condition, createCondition(field, fieldPath)];
    }
</script>

<div
    class="flex flex-col mb-2 p-1 border-2 {hovered ? 'border-primary/50' : 'border-transparent'} rounded"
    on:mousemove={updateHover}
    on:mouseleave={depth === 0 ? _updateHover : undefined}
    data-field-path={fieldPath}
>
    <div class="flex flex-row mb-1">
        <div
            class="mr-2 {field.type === 'definition' && (hovered || expanded)
                ? 'opacity-100'
                : (field.type === 'definition' ? 'opacity-50' : 'opacity-0') + ' pointer-events-none'}"
        >
            <Button
                btnStyle="ghost"
                class="btn-circle"
                size="xs"
                color="primary"
                on:click={() => (field.type === 'definition' ? (expanded = !expanded) : undefined)}
            >
                <Icon icon={expanded ? chevronDownIcon : chevronRightIcon} />
            </Button>
        </div>
        <div class="flex flex-col mr-2 w-full">
            <div class="flex flex-row justify-between w-full">
                <div class="flex flex-row items-center">
                    <div class="mr-2 flex items-center">
                        <Input
                            type="checkbox"
                            checked={isSelected}
                            value={isSelected}
                            on:change={toggle}
                            disabled={indirectlySelected}
                            color="primary"
                            inputSize="sm"
                        />
                    </div>
                    <span title="FHIR Pfad: '{fieldPath}'"
                        >{fieldDisplayName}
                        <span class="text-base-content/80">({fieldType})</span></span
                    >
                    {#if fieldDescription && hovered}
                        <Button
                            btnStyle="ghost"
                            class="btn-circle"
                            color="primary"
                            size="xs"
                            on:click={() => (descriptionVisible = !descriptionVisible)}
                        >
                            <Icon icon={circleQuestionIcon} />
                        </Button>
                    {/if}
                </div>
                {#if hovered}
                    <ButtonGroup>
                        {#if showConditionButton}
                            <Button size="xs" btnStyle="outline" color="warning" class="normal-case" on:click={addCondition}>
                                Bedingung hinzufügen
                            </Button>
                        {/if}
                        {#if showPseudonomyzationButton}
                            <Button
                                size="xs"
                                btnStyle="outline"
                                color="accent"
                                class="normal-case"
                                on:click={() => editor.showModal('selectionOptions', documentId, fieldPath, field)}
                            >
                                Verfremden
                            </Button>
                        {:else}
                            <Button size="xs" btnStyle="outline" color="accent" class="normal-case" disabled>
                                Keine Verfremdungsoptionen verfügbar
                            </Button>
                        {/if}
                    </ButtonGroup>
                {/if}
            </div>
            {#if descriptionVisible}
                <div transition:slide|local={{ duration: 250 }}>
                    <small>{fieldDescription}</small>
                </div>
            {/if}
        </div>
    </div>
    {#if expanded}
        <div class="ml-2 border-l-2 border-gray-500 pt-3 pl-2" transition:slide|local={{ duration: 250 }}>
            {#if field.type === 'definition'}
                {#each fhirDefinitions[field.definition].fields as childField (childField.path)}
                    <svelte:self
                        {documentId}
                        {resourceType}
                        containingDefinition={field.definition}
                        field={childField}
                        fieldPath={fieldPath + '.' + childField.name}
                        depth={depth + 1}
                    />
                {/each}
            {/if}
        </div>
    {/if}
</div>
