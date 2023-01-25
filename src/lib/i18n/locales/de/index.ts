import type { LocaleData } from '$lib/i18n/locales/LocaleData';
import resourceTypeDe from '$lib/i18n/locales/de/fhir/resourceTypeDe';
import fhirFieldDe from '$lib/i18n/locales/de/fhir/fhirFieldDe';
import generalDe from '$lib/i18n/locales/de/generalDe.json';

export default {
    localeName: 'Deutsch',
    ...generalDe,
    fhir: {
        resourceType: resourceTypeDe,
        ...fhirFieldDe
    }
} satisfies LocaleData;
