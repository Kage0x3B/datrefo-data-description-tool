import type { LocaleData } from '$lib/i18n/locales/LocaleData';
import resourceTypeDe from '$lib/i18n/locales/de/fhir/resourceTypeDe';
import fhirFieldDe from '$lib/i18n/locales/de/fhir/fhirFieldDe';

export default {
    localeName: 'Deutsch',
    fhir: {
        resourceType: resourceTypeDe,
        field: fhirFieldDe
    }
} satisfies LocaleData;
