<script lang="ts">
    import type { MappingParameters } from '$lib/types/datrefoFormat/DaTreFoSelection';
    import FormControl from '$lib/daisyUiComponents/FormControl.svelte';
    import Input from '$lib/daisyUiComponents/Input.svelte';

    export let parameters: MappingParameters['dateRounding'];
</script>

Zeitliche Rundung

<FormControl label="Runden auf">
    <Input type="select" inputSize="sm" inputStyle="bordered" bind:value={parameters.timeUnit}>
        <option value="year">Jahre</option>
        <option value="month">Monate</option>
        <option value="week">Wochen</option>
        <option value="day">Tage</option>
        <option value="hour">Stunden</option>
    </Input>
</FormControl>
