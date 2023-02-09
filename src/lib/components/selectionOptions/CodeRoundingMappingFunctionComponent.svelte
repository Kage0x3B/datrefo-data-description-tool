<script lang="ts">
    import type { MappingParameters } from '$lib/types/datrefoFormat/DaTreFoSelection';
    import FormControl from '$lib/daisyUiComponents/FormControl.svelte';
    import Input from '$lib/daisyUiComponents/Input.svelte';

    export let parameters: MappingParameters['codeRounding'];
</script>

Code Rundung <span class="text-base-content/80">(betrifft nur ICD-10 Codes)</span>

<FormControl label="Stellen">
    <Input type="number" inputSize="sm" inputStyle="bordered" min="1" max="5" bind:value={parameters.precision} />
</FormControl>
