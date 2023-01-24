import type { LocaleData } from '$lib/i18n/locales/LocaleData';
import resourceTypeEn from '$lib/generated/i18n/fhir/resourceType.json';
import fieldsEn from '$lib/generated/i18n/fhir/fields.json';

export default {
    localeName: 'English',
    fhir: {
        resourceType: resourceTypeEn,
        field: fieldsEn
    }
} satisfies LocaleData;
