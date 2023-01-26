<script lang="ts">
    import Modal from '$lib/daisyUiComponents/Modal.svelte';
    import Button from '$lib/daisyUiComponents/Button.svelte';
    import type { DaTreFoEditorContext } from '$lib/types/component/DaTreFoEditor';
    import { getContext, onMount } from 'svelte';
    import { EDITOR_CONTEXT } from '$lib/util/ContextKey';
    import type { DaTreFoSelectionOptions } from '$lib/types/datrefoFormat/DaTreFoSelection';
    import { AggregationFunction, MappingFunction } from '$lib/types/datrefoFormat/DaTreFoSelection';
    import { documents } from '$lib/projectData';
    import type { FhirResourceField } from '$lib/fhir/FhirMetadata';
    import Input from '$lib/daisyUiComponents/Input.svelte';
    import FormControl from '$lib/daisyUiComponents/FormControl.svelte';
    import {
        aggregationFunctionInfo,
        getAvailableAggregationFunctions,
        getAvailableMappingFunctions,
        mappingFunctionInfo
    } from '$lib/components/selectionOptions/selectionOptions.js';
    import { capitalCase } from 'change-case';
    import Icon from '@iconify/svelte';
    import plusIcon from '@iconify/icons-fa6-solid/plus';
    import { FhirFieldPrimitiveType } from '$lib/fhir/FhirFieldPrimitiveType';

    const editor: DaTreFoEditorContext = getContext(EDITOR_CONTEXT);

    let isOpen = false;
    const toggle = () => (isOpen = !isOpen);

    let documentId: string | undefined;
    let selectionFieldPath: string | undefined;
    let selectionField: FhirResourceField | undefined;
    let selectionOptions:
        | (Pick<DaTreFoSelectionOptions, 'aggregationParameters' | 'mappingParameters'> & {
              mappingFunction: MappingFunction[];
              aggregationFunction: AggregationFunction[];
          })
        | undefined;

    let newAggregationFunction: AggregationFunction | '' = '';
    let newMappingFunction: MappingFunction | '' = '';

    $: availableAggregationFunctions = documentId
        ? getAvailableAggregationFunctions(selectionField!, selectionOptions!.aggregationFunction)
        : [];
    $: availableMappingFunctions = documentId ? getAvailableMappingFunctions(selectionField!, selectionOptions!.mappingFunction) : [];

    export function open(_documentId: string, _selectionFieldPath: string, _selectionField: FhirResourceField) {
        documentId = _documentId;
        selectionFieldPath = _selectionFieldPath;
        selectionField = _selectionField;
        let existingSelection = $documents[documentId].selections[selectionFieldPath];

        if (typeof existingSelection === 'object') {
            existingSelection = JSON.parse(JSON.stringify(existingSelection)) as DaTreFoSelectionOptions;

            selectionOptions = {
                ...existingSelection,
                aggregationFunction: Array.isArray(existingSelection.aggregationFunction)
                    ? existingSelection.aggregationFunction
                    : [existingSelection.aggregationFunction].filter((f) => !!f),
                mappingFunction: Array.isArray(existingSelection.mappingFunction)
                    ? existingSelection.mappingFunction
                    : [existingSelection.mappingFunction].filter((f) => !!f)
            };
        } else {
            selectionOptions = {
                aggregationFunction: [],
                mappingFunction: [],
                aggregationParameters: {},
                mappingParameters: {}
            };
        }

        isOpen = true;
    }

    export function close() {
        isOpen = false;
    }

    function saveSelectionOptions() {
        $documents[documentId].selections[selectionFieldPath] = {
            ...selectionOptions!
        };

        close();
    }

    function createNewAggregationFunction() {
        if (!newAggregationFunction) {
            return;
        }

        selectionOptions!.aggregationFunction = [...selectionOptions!.aggregationFunction, newAggregationFunction];
        selectionOptions!.aggregationParameters = {
            ...selectionOptions!.aggregationParameters,
            [newAggregationFunction]: aggregationFunctionInfo[newAggregationFunction].createDefaultParameters()
        };

        newAggregationFunction = '';
    }

    function createNewMappingFunction() {
        if (!newMappingFunction) {
            return;
        }

        selectionOptions!.mappingFunction = [...selectionOptions!.mappingFunction, newMappingFunction];
        selectionOptions!.mappingParameters = {
            ...selectionOptions!.mappingParameters,
            [newMappingFunction]: mappingFunctionInfo[newMappingFunction].createDefaultParameters()
        };

        newMappingFunction = '';
    }

    function moveMappingFunction(func: MappingFunction, direction: 'up' | 'down') {
        const fromIndex = selectionOptions!.mappingFunction.indexOf(func);
        const toIndex = fromIndex + (direction === 'up' ? -1 : +1);

        selectionOptions!.mappingFunction.splice(fromIndex, 1);
        selectionOptions!.mappingFunction.splice(toIndex, 0, func);
    }
</script>

<Modal {isOpen} {toggle} class="!w-11/12 !max-w-4xl">
    <h1 class="text-xl font-bold mb-6">Pseudonymisierungsoptionen</h1>

    {#if selectionOptions}
        <div class="mb-3">
            <h2 class="text-lg mb-2 font-bold">Werte aggregieren</h2>
            {#if selectionOptions.aggregationFunction.length}
                <div class="border border-gray-300 rounded mb-2">
                    {#each selectionOptions.aggregationFunction as func, i}
                        <div class="p-2 {i !== selectionOptions.aggregationFunction.length - 1 ? 'border-b' : ''}">
                            {#if aggregationFunctionInfo[func].component}
                                <svelte:component
                                    this={aggregationFunctionInfo[func].component}
                                    bind:parameters={selectionOptions.aggregationParameters[func]}
                                    field={selectionField}
                                />
                            {:else}
                                <span
                                    >{capitalCase(func)}
                                    <span class="text-base-content/80"> (keine weiteren Einstellungsmöglichkeiten)</span></span
                                >
                            {/if}
                        </div>
                    {/each}
                </div>
            {/if}
            {#if availableAggregationFunctions.length}
                <div class="flex flex-row items-end w-1/2">
                    <FormControl label="Neue Aggregation Funktion">
                        <Input type="select" inputStyle="bordered" inputSize="xs" bind:value={newAggregationFunction} class="flex-1 mx-2">
                            <option value="" disabled selected>Aggregationsmethode auswählen...</option>
                            {#each availableAggregationFunctions as aggregationFunction}
                                <option value={aggregationFunction}>{capitalCase(aggregationFunction)}</option>
                            {/each}
                        </Input>
                    </FormControl>
                    <Button color="success" disabled={!newAggregationFunction} on:click={createNewAggregationFunction}>
                        <Icon icon={plusIcon} />
                    </Button>
                </div>
            {:else}
                <span class="text-base-content/80">
                    Für dieses Feld sind keine{selectionOptions.aggregationFunction.length ? ' weiteren' : ''} Aggregationsfunktionen verfügbar.
                </span>
            {/if}
        </div>
        <hr class="my-6" />
        <div>
            <h2 class="text-lg mb-2 font-bold">Werte mappen</h2>
            {#if selectionOptions.mappingFunction.length}
                <div class="border border-gray-300 rounded mb-2">
                    {#each selectionOptions.mappingFunction as func, i}
                        <div class="p-2 {i !== selectionOptions.mappingFunction.length - 1 ? 'border-b' : ''}">
                            {#if mappingFunctionInfo[func].component}
                                <svelte:component
                                    this={mappingFunctionInfo[func].component}
                                    bind:parameters={selectionOptions.mappingParameters[func]}
                                    field={selectionField}
                                />
                            {:else}
                                <span
                                    >{capitalCase(func)}
                                    <span class="text-base-content/80"> (keine weiteren Einstellungsmöglichkeiten)</span></span
                                >
                            {/if}
                        </div>
                    {/each}
                </div>
            {/if}
            {#if availableMappingFunctions.length}
                <div class="flex flex-row items-end w-1/2">
                    <FormControl label="Neue Mapping Funktion">
                        <Input type="select" inputStyle="bordered" inputSize="xs" bind:value={newMappingFunction} class="flex-1 mx-2">
                            <option value="" disabled selected>Mappingmethode auswählen...</option>
                            {#each availableMappingFunctions as mappingFunction}
                                <option value={mappingFunction}>{capitalCase(mappingFunction)}</option>
                            {/each}
                        </Input>
                    </FormControl>
                    <Button color="success" disabled={!newMappingFunction} on:click={createNewMappingFunction}>
                        <Icon icon={plusIcon} />
                    </Button>
                </div>
            {:else}
                <span class="text-base-content/80">
                    Für dieses Feld sind keine{selectionOptions.mappingFunction.length ? ' weiteren' : ''} Mappingfunktionen verfügbar.
                </span>
            {/if}
        </div>
    {/if}

    <div class="modal-action">
        <Button on:click={close} btnStyle="ghost">Abbrechen</Button>
        <Button on:click={saveSelectionOptions} color="primary">Speichern</Button>
    </div>
</Modal>
