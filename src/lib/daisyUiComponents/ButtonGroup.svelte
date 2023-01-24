<script lang="ts">
    import { classnames } from '$lib/daisyUiComponents/util';

    let className = '';
    export { className as class };
    export let vertical = false;

    $: classes = classnames('btn-group', className, {
        'btn-group-vertical': vertical
    });
</script>

<div class={classes}>
    <slot />
</div>
