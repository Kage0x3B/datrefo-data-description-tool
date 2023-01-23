<script lang="ts">
    import { writable } from 'svelte/store';
    import classnames from './util';
    import { createEventDispatcher, setContext } from 'svelte';
    import TabHeader from '$lib/daisyUiComponents/TabHeader.svelte';

    const dispatch = createEventDispatcher();

    let className = '';
    export { className as class };
    export let bordered = false;
    export let lifted = false;
    export let boxed = false;
    export let size: 'xs' | 'sm' | 'md' | 'lg' = 'md';

    const activeTabId = writable();
    setContext('tabs', {
        activeTabId,
        setActiveTab,
        tabStyle: {
            bordered,
            lifted,
            boxed,
            size
        }
    });

    export function setActiveTab(tabId: string) {
        activeTabId.set(tabId);
        dispatch('tab', tabId);
    }

    $: classes = classnames(className, {
        'tabs-boxed': boxed
    });
</script>

<div class={classes}>
    <TabHeader>
        <slot />
    </TabHeader>
    <slot />
</div>
