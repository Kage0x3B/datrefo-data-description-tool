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
        },
        Observation: {
            status: { name: 'Status', description: 'Der Status des Ergebniswertes.' },
            category: {
                name: 'Kategorie',
                description: 'Ein Code, der die allgemeine Art der Beobachtung klassifiziert.'
            },
            code: {
                name: 'Code',
                description:
                    'Beschreibt, was beobachtet wurde. Manchmal wird dies auch als "Name" der Beobachtung bezeichnet.'
            },
            effectiveDateTime: {
                name: 'Datum des Inkrafttretens',
                description:
                    'Der Zeitpunkt oder die Zeitspanne, für die der beobachtete Wert als wahr angenommen wird. Bei biologischen Subjekten - z. B. menschlichen Patienten - wird dies gewöhnlich als "physiologisch relevante Zeit" bezeichnet. Dies ist in der Regel entweder der Zeitpunkt des Verfahrens oder der Probenentnahme, aber sehr oft ist die Quelle des Datums/der Uhrzeit nicht bekannt, sondern nur das Datum/die Uhrzeit selbst.'
            },
            effectivePeriod: {
                name: 'Gültigkeitsdauer',
                description:
                    'Der Zeitpunkt oder die Zeitspanne, für die der beobachtete Wert als wahr angenommen wird. Bei biologischen Subjekten - z. B. menschlichen Patienten - wird dies gewöhnlich als "physiologisch relevante Zeit" bezeichnet. Dies ist in der Regel entweder der Zeitpunkt des Verfahrens oder der Probenentnahme, aber sehr oft ist die Quelle des Datums/der Uhrzeit nicht bekannt, sondern nur das Datum/die Uhrzeit selbst.'
            },
            effectiveTiming: {
                name: 'Datum des Inkrafttretens',
                description:
                    'Der Zeitpunkt oder die Zeitspanne, für die der beobachtete Wert als wahr angenommen wird. Bei biologischen Subjekten - z. B. menschlichen Patienten - wird dies gewöhnlich als "physiologisch relevante Zeit" bezeichnet. Dies ist in der Regel entweder der Zeitpunkt des Verfahrens oder der Probenentnahme, aber sehr oft ist die Quelle des Datums/der Uhrzeit nicht bekannt, sondern nur das Datum/die Uhrzeit selbst.'
            },
            effectiveInstant: {
                name: 'Datum des Inkrafttretens',
                description:
                    'Der Zeitpunkt oder die Zeitspanne, für die der beobachtete Wert als wahr angenommen wird. Bei biologischen Subjekten - z. B. menschlichen Patienten - wird dies gewöhnlich als "physiologisch relevante Zeit" bezeichnet. Dies ist in der Regel entweder der Zeitpunkt des Verfahrens oder der Probenentnahme, aber sehr oft ist die Quelle des Datums/der Uhrzeit nicht bekannt, sondern nur das Datum/die Uhrzeit selbst.'
            },
            issued: {
                name: 'Ausstellungsdatum',
                description:
                    'Das Datum und die Uhrzeit, zu der diese Version der Beobachtung den Anbietern zur Verfügung gestellt wurde, in der Regel nachdem die Ergebnisse überprüft und verifiziert worden sind.'
            },
            valueQuantity: {
                name: 'Wert (angegeben als Anzahl)',
                description:
                    'Die Information, die als Ergebnis der Beobachtung ermittelt wurde, wenn die Information einen einfachen Wert hat.'
            },
            valueCodeableConcept: {
                name: 'Wert (angegeben in einem Code-System)',
                description:
                    'Die Information, die als Ergebnis der Beobachtung ermittelt wurde, wenn die Information einen einfachen Wert hat.'
            },
            valueString: {
                name: 'Wert (angegeben als Text)',
                description:
                    'Die Information, die als Ergebnis der Beobachtung ermittelt wurde, wenn die Information einen einfachen Wert hat.'
            },
            valueBoolean: {
                name: 'Wert (angegeben als boolesche)',
                description:
                    'Die Information, die als Ergebnis der Beobachtung ermittelt wurde, wenn die Information einen einfachen Wert hat.'
            },
            valueInteger: {
                name: 'Wert (angegeben als Nummer)',
                description:
                    'Die Information, die als Ergebnis der Beobachtung ermittelt wurde, wenn die Information einen einfachen Wert hat.'
            },
            valueRange: {
                name: 'Wert (angegeben als Zahlenbereich)',
                description:
                    'Die Information, die als Ergebnis der Beobachtung ermittelt wurde, wenn die Information einen einfachen Wert hat.'
            },
            valueRatio: {
                name: 'Wert (angegeben als Zahlenverhältnis)',
                description:
                    'Die Information, die als Ergebnis der Beobachtung ermittelt wurde, wenn die Information einen einfachen Wert hat.'
            },
            valueSampledData: {
                name: 'Wert (angegeben als Stichprobendaten)',
                description:
                    'Die Information, die als Ergebnis der Beobachtung ermittelt wurde, wenn die Information einen einfachen Wert hat.'
            },
            valueTime: {
                name: 'Wert (angegeben als Zeit)',
                description:
                    'Die Information, die als Ergebnis der Beobachtung ermittelt wurde, wenn die Information einen einfachen Wert hat.'
            },
            valueDateTime: {
                name: 'Wert (angegeben als Datum und Uhrzeit)',
                description:
                    'Die Information, die als Ergebnis der Beobachtung ermittelt wurde, wenn die Information einen einfachen Wert hat.'
            },
            valuePeriod: {
                name: 'Wert (angebeben als Zeitraum)',
                description:
                    'Die Information, die als Ergebnis der Beobachtung ermittelt wurde, wenn die Information einen einfachen Wert hat.'
            },
            valueAttachment: {
                name: 'Wert (in Form eines Anhangs)',
                description:
                    'Die Information, die als Ergebnis der Beobachtung ermittelt wurde, wenn die Information einen einfachen Wert hat.'
            },
            dataAbsentReason: {
                name: 'Daten Abwesenheitsgrund',
                description: 'Gibt einen Grund an, warum der erwartete Wert fehlt.'
            },
            interpretation: {
                name: 'Auslegung',
                description: 'Eine kategoriale Bewertung eines Beobachtungswertes. Zum Beispiel: hoch, niedrig, normal.'
            },
            bodySite: {
                name: 'Körperstelle',
                description:
                    'Gibt die Stelle am Körper des Probanden an, an der die Beobachtung gemacht wurde (d. h. die Zielstelle).'
            },
            method: {
                name: 'Verfahren',
                description: 'Gibt den Mechanismus an, der zur Durchführung der Beobachtung verwendet wird.'
            },
            component: {
                name: 'Bestandteil',
                description:
                    'Einige Beobachtungen haben mehrere Komponentenbeobachtungen. Diese Komponentenbeobachtungen werden als separate Codewertpaare ausgedrückt, die dieselben Attribute aufweisen. Beispiele hierfür sind systolische und diastolische Komponentenbeobachtungen für die Blutdruckmessung und Mehrfachkomponentenbeobachtungen für Genetikbeobachtungen.'
            }
        }
    },
    definition: {}
} satisfies Pick<LocaleData['fhir'], 'field' | 'definition'>;
