import { browser } from '$app/environment';
import { init, register } from 'svelte-i18n';

const defaultLocale = 'en';

export function initI18n() {
    register('en', () => import('./locales/en'));
    register('de', () => import('./locales/de'));

    init({
        fallbackLocale: defaultLocale,
        initialLocale: browser ? window.navigator.language : defaultLocale
    });
}
