<script>
    import TabContainer from '$lib/daisyUiComponents/TabContainer.svelte';
    import Tab from '$lib/daisyUiComponents/Tab.svelte';
    import Input from '$lib/daisyUiComponents/Input.svelte';
    import Button from '$lib/daisyUiComponents/Button.svelte';

    const documents = [];
</script>

<TabContainer boxed>
    <Tab tabId="tab1" title="Test Tab 1" active>
        <Input type="checkbox" color="primary" />
        <Button color="accent" href="/test">Test</Button>
        <Input type="select">
            {#each [1, 2, 3, 4, 5] as i}
                <option>Option {i}</option>
            {/each}
        </Input>
    </Tab>
    <Tab tabId="tab2" title="Test Tab 2">Test Tab 2 Inhalt</Tab>
</TabContainer>
