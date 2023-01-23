<script lang="ts">
    import Input from '$lib/daisyUiComponents/Input.svelte';
    import Tab from '$lib/daisyUiComponents/Tab.svelte';
    import Button from '$lib/daisyUiComponents/Button.svelte';
</script>

<Tab tabId="tab1" active>
    <div slot="header">Exclude Patient Conditions</div>
    <Input type="checkbox" color="primary" />
    <Button color="accent" href="/test">Test</Button>
    <Input type="select">
        {#each [1, 2, 3, 4, 5] as i}
            <option>Option {i}</option>
        {/each}
    </Input>
</Tab>
