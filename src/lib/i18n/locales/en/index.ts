import type { LocaleData } from '$lib/i18n/locales/LocaleData';
import resourceTypeEn from '$lib/generated/i18n/fhir/resourceType.json';
import fieldsEn from '$lib/generated/i18n/fhir/fields.json';
import generalEn from '$lib/i18n/locales/en/generalEn.json';

export default {
    localeName: 'English',
    ...generalEn,
    fhir: {
        resourceType: resourceTypeEn,
        ...fieldsEn
    }
} satisfies LocaleData;
