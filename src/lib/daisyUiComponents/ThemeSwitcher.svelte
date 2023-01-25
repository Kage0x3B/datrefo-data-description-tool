<script lang="ts">
    import Icon from '@iconify/svelte';
    import sunIcon from '@iconify/icons-fa6-solid/sun';
    import moonIcon from '@iconify/icons-fa6-solid/moon';
    import { writable } from 'svelte/store';
    import { onMount } from 'svelte';
    import { browser } from '$app/environment';

    const themeMap = {
        light: 'emerald',
        dark: 'emeraldDark'
    };

    const theme = writable<'light' | 'dark'>('light');
    $: browser && document.documentElement.setAttribute('data-theme', themeMap[$theme]);

    function toggle() {
        if ($theme === 'light') {
            $theme = 'dark';
        } else {
            $theme = 'light';
        }

        localStorage.setItem('theme', $theme);
    }

    onMount(() => {
        const storedTheme = localStorage.getItem('theme');
        if (storedTheme === 'light' || storedTheme === 'dark') {
            $theme = storedTheme;
        }
    });
</script>

<svelte:body data-theme={$theme} />

<li>
    <a on:click={toggle}>
        <Icon icon={$theme === 'light' ? moonIcon : sunIcon} />
    </a>
</li>
