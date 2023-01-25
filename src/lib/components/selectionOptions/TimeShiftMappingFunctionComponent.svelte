<script lang="ts">
    import type { MappingParameters } from '$lib/types/datrefoFormat/DaTreFoSelection';
    import FormControl from '$lib/daisyUiComponents/FormControl.svelte';
    import Input from '$lib/daisyUiComponents/Input.svelte';

    export let parameters: MappingParameters['timeShift'];
</script>

Zeitverschiebung

<FormControl label="Betrag der Zeitverschiebung">
    <Input type="number" inputSize="sm" inputStyle="bordered" bind:value={parameters.shift} />
</FormControl>

<FormControl label="Zeiteinheit">
    <Input type="select" inputSize="sm" inputStyle="bordered" bind:value={parameters.timeUnit}>
        <option value="year">Jahre</option>
        <option value="month">Monate</option>
        <option value="week">Wochen</option>
    </Input>
</FormControl>
