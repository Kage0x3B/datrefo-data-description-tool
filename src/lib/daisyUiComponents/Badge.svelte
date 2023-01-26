<script lang="ts">
    import { classnames } from '$lib/daisyUiComponents/util';
    import type { ThemeColor } from '$lib/daisyUiComponents/Theme';

    let className = '';
    export { className as class };
    export let color: ThemeColor = 'primary';

    $: classes = classnames('badge', className, {
        'badge-primary': color === 'primary',
        'badge-secondary': color === 'secondary',
        'badge-accent': color === 'accent',
        'badge-info': color === 'info',
        'badge-success': color === 'success',
        'badge-warning': color === 'warning',
        'badge-error': color === 'error'
    });
</script>

<div class={classes}>
    <slot />
</div>
