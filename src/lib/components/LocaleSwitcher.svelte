<script lang="ts">
    import { onMount } from 'svelte';
    import { locale, t } from 'svelte-i18n';
    import Icon from '@iconify/svelte';
    import languageIcon from '@iconify/icons-fa6-solid/language';

    function toggle() {
        if ($locale === 'en') {
            $locale = 'de';
        } else {
            $locale = 'en';
        }

        localStorage.setItem('locale', $locale);
    }

    onMount(() => {
        const storedLocale = localStorage.getItem('locale');
        if (storedLocale === 'en' || storedLocale === 'de') {
            $locale = storedLocale;
        }
    });
</script>

<li>
    <a on:click={toggle}>
        <Icon icon={languageIcon} />
        <span>{$t('localeName')} <span class="text-neutral-content/70">({$locale})</span></span>
    </a>
</li>
