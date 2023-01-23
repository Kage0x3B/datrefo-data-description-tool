<script lang="ts">
    import { getContext, onMount } from 'svelte';
    import classnames from '$lib/daisyUiComponents/util';

    export let tabHeaderClass = '';
    let className = '';
    export { className as class };
    export let tabId: string;
    export let title = '';

    export let active = false;

    const isTabHeader = getContext('tabHeader');
    const { activeTabId, setActiveTab, tabStyle } = getContext('tabs');

    let tabOpen = active;
    $: if ($activeTabId !== undefined) tabOpen = $activeTabId === tabId;
    $: tabHeaderClasses = classnames('tab', tabHeaderClass, {
        'tab-active': tabOpen,
        'tab-bordered': tabStyle.bordered,
        'tab-lifted': tabStyle.lifted
    });
    $: tabClasses = classnames(className);

    onMount(() => {
        if (active) setActiveTab(tabId);
    });
</script>

{#if isTabHeader}
    <div class={tabHeaderClasses} on:click={() => setActiveTab(tabId)}>
        <slot name="header">
            {title}
        </slot>
    </div>
{:else if tabOpen}
    <div {...$$restProps} class={tabClasses}>
        <slot />
    </div>
{/if}
