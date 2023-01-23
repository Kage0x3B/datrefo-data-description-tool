<script lang="ts">
    import classnames from '$lib/daisyUiComponents/util';

    export let label = '';

    let className = '';
    export { className as class };
    $: classes = classnames(className, 'form-control');
</script>

<div {...$$restProps} class={classes}>
    {#if label}
        <label class="label">
            <span class="label-text">{label}</span>
        </label>
    {/if}
    <slot />
</div>
