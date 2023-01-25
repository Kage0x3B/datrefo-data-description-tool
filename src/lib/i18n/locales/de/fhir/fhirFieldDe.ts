import type { LocaleData } from '$lib/i18n/locales/LocaleData';

export default {
    field: {
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
        },
        Medication: {
            code: {
                name: 'Code',
                description:
                    'Ein Code (oder eine Reihe von Codes), die dieses Medikament spezifizieren, oder eine Textbeschreibung, wenn kein Code verfügbar ist. Hinweis zur Verwendung: Es kann sich um einen Standardmedikationscode handeln, wie z. B. einen Code aus RxNorm, SNOMED CT, IDMP usw. Es kann sich auch um einen nationalen oder lokalen Code aus der Arzneimittelliste handeln, gegebenenfalls mit Übersetzungen in andere Codesysteme.'
            },
            status: {
                name: 'Status',
                description: 'Ein Code, der angibt, ob das Medikament in Gebrauch ist.'
            },
            doseForm: {
                name: 'Form der Dosis',
                description: 'Beschreibt die Form des Medikaments. Pulver; Tabletten; Kapsel.'
            },
            totalVolume: {
                name: 'Gesamtmenge',
                description:
                    'Wenn der angegebene Produktcode nicht auf eine Packungsgröße schließen lässt, ist dies die spezifische Menge des Arzneimittels im Produkt. Wenn beispielsweise ein Produkt mit derselben Stärke angegeben wird (z. B. Insulin glargin 100 Einheiten pro ml Injektionslösung), dient dieses Attribut zur zusätzlichen Klärung der Packungsmenge (z. B. 3 ml, 10 ml usw.).'
            },
            ingredient: {
                name: 'Inhaltsstoff',
                description: 'Identifiziert einen bestimmten Bestandteil des Produkts, der von Interesse ist.'
            },
            batch: {
                name: 'Charge',
                description: 'Informationen, die nur für Packstücke (nicht für Produkte) gelten.'
            }
        }
    },
    definition: {}
} satisfies Pick<LocaleData['fhir'], 'field' | 'definition'>;
