import type { LocaleData } from '$lib/i18n/locales/LocaleData';

export default {
    Patient: {
        gender: {
            name: 'Geschlecht',
            description:
                'Administratives Geschlecht - das Geschlecht, das der Patient für Verwaltungs- und Archivierungszwecke hat.'
        },
        birthDate: {
            name: 'Geburtsdatum',
            description: 'Das Geburtsdatum der Person.'
        },
        deceasedBoolean: {
            name: 'Verstorben (boolesch)',
            description: 'Gibt an, ob die Person verstorben ist oder nicht.'
        },
        deceasedDateTime: {
            name: 'Sterbedatum',
            description: 'Gibt an, ob die Person verstorben ist oder nicht.'
        },
        multipleBirthBoolean: {
            name: 'Mehrlingsgeburt (boolesch)',
            description:
                'Zeigt an, ob der Patient Teil einer Mehrlingsgeburt ist (boolesch) oder gibt die tatsächliche Geburtsreihenfolge an (ganze Zahl).'
        },
        multipleBirthInteger: {
            name: 'Mehrlingsgeburt (Reihenfolge)',
            description:
                'Zeigt an, ob der Patient Teil einer Mehrlingsgeburt ist (boolesch) oder gibt die tatsächliche Geburtsreihenfolge an (ganze Zahl).'
        }
    }
} satisfies LocaleData['fhir']['field'];
