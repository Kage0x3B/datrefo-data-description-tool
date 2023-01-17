<script lang="ts">
    import classnames from '$lib/util/util.js';

    let className = '';
    export { className as class };
    $: classes = classnames(className, 'form-control');
</script>

<div {...$$restProps} class={classes}>
    <slot />
</div>
