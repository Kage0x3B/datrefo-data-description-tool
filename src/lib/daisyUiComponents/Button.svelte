<script lang="ts">
    import { classnames } from '$lib/daisyUiComponents/util';
    import type { ThemeButtonStyle, ThemeColor, ThemeSize } from '$lib/daisyUiComponents/Theme';

    let className = '';
    export { className as class };
    export let active = false;
    export let btnStyle: ThemeButtonStyle | undefined = undefined;
    export let size: ThemeSize | undefined = undefined;
    export let block = false;
    export let wide = false;
    export let loading = false;
    export let color: ThemeColor = 'secondary';
    export let disabled = false;
    export let href = '';
    export let element = undefined;

    $: ariaLabel = $$props['aria-label'];

    $: classes = classnames(className, 'btn', {
        'btn-active': active,
        // Styles
        'btn-ghost': btnStyle === 'ghost',
        'btn-link': btnStyle === 'link',
        'btn-outline': btnStyle === 'outline',
        'btn-square': btnStyle === 'square',
        'btn-circle': btnStyle === 'circle',
        // Colors
        'btn-primary': color === 'primary',
        'btn-secondary': color === 'secondary',
        'btn-accent': color === 'accent',
        'btn-info': color === 'info',
        'btn-success': color === 'success',
        'btn-warning': color === 'warning',
        'btn-error': color === 'error',
        // Sizes
        'btn-xs': size === 'xs',
        'btn-sm': size === 'sm',
        'btn-lg': size === 'lg',
        'btn-wide': wide,
        'btn-block': block,
        loading: loading
    });
</script>

{#if href}
    <a
        {...$$restProps}
        class={classes}
        disabled={disabled ? true : undefined}
        bind:this={element}
        on:click
        {href}
        aria-label={ariaLabel}
    >
        <slot />
    </a>
{:else}
    <button
        {...$$restProps}
        class={classes}
        disabled={disabled ? true : undefined}
        bind:this={element}
        on:click
        aria-label={ariaLabel}
    >
        <slot />
    </button>
{/if}
