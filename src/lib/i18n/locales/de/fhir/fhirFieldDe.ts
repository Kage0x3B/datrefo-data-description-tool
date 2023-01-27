import type { LocaleData } from '$lib/i18n/locales/LocaleData';

export default {
    field: {
        Patient: {
            gender: {
                name: 'Geschlecht',
                description: 'Administratives Geschlecht - das Geschlecht, das der Patient für Verwaltungs- und Archivierungszwecke hat.'
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
                description: 'Beschreibt, was beobachtet wurde. Manchmal wird dies auch als "Name" der Beobachtung bezeichnet.'
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
                description: 'Gibt die Stelle am Körper des Probanden an, an der die Beobachtung gemacht wurde (d. h. die Zielstelle).'
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
        },
        Condition: {
            meta: {
                description:
                    'Die Metadaten über die Ressource. Dies ist Inhalt, der von der Infrastruktur gepflegt wird. Änderungen am Inhalt sind nicht immer mit Versionsänderungen der Ressource verbunden.'
            },
            implicitRules: {
                description:
                    'Ein Verweis auf eine Menge von Regeln, die bei der Konstruktion der Ressource befolgt wurden und die bei der Verarbeitung des Inhalts verstanden werden müssen. Oft handelt es sich hierbei um einen Verweis auf eine Implementierungsanleitung, die die speziellen Regeln zusammen mit anderen Profilen usw. definiert.'
            },
            language: { description: 'Die Basissprache, in der die Ressource geschrieben ist.' },
            text: {
                description:
                    'Eine für den Menschen lesbare Erzählung, die eine Zusammenfassung der Ressource enthält und verwendet werden kann, um den Inhalt der Ressource einem Menschen darzustellen. Die Erzählung muss nicht alle strukturierten Daten codieren, aber sie muss ausreichende Details enthalten, um sie für einen Menschen "klinisch sicher" zu machen, indem er nur die Erzählung liest. Ressourcendefinitionen können festlegen, welche Inhalte in der Erzählung dargestellt werden sollen, um eine klinische Sicherheit sicherzustellen.'
            },
            contained: {
                description:
                    'Diese Ressourcen haben keine unabhängige Existenz neben der Ressource, die sie enthält - sie können weder unabhängig identifiziert werden, noch können sie ihren eigenen unabhängigen Transaktionsbereich haben. Sie dürfen nur dann eine Parameter-Ressource sein, wenn sie von einer Ressource referenziert wird, die Kontext/Bedeutung liefert.'
            },
            clinicalStatus: { description: 'The clinical status of the condition.' },
            verificationStatus: {
                description:
                    'Der Verifizierungsstatus zur Unterstützung des klinischen Status der Bedingung.  Der Verifizierungsstatus bezieht sich auf den Zustand selbst, nicht auf ein bestimmtes Zustandsattribut.'
            },
            category: { description: 'Eine Kategorie, die dem medizinischen Zustand zugeordnet ist.' },
            severity: {
                description: 'Eine subjektive Einschätzung des Schweregrads der Erkrankung durch den Kliniker.'
            },
            code: { description: 'Identification of the condition, problem or diagnosis.' },
            bodySite: { description: 'The anatomical location where this condition manifests itself.' },
            subject: { description: 'Indicates the patient or group who the condition record is associated with.' },
            encounter: {
                description:
                    'The Encounter during which this Condition was created or to which the creation of this record is tightly associated.'
            },
            onsetDateTime: {
                description: 'Estimated or actual date or date-time  the condition began, in the opinion of the clinician.'
            },
            onsetAge: {
                description: 'Estimated or actual date or date-time  the condition began, in the opinion of the clinician.'
            },
            onsetPeriod: {
                description: 'Estimated or actual date or date-time  the condition began, in the opinion of the clinician.'
            },
            onsetRange: {
                description: 'Estimated or actual date or date-time  the condition began, in the opinion of the clinician.'
            },
            onsetString: {
                description: 'Estimated or actual date or date-time  the condition began, in the opinion of the clinician.'
            },
            abatementDateTime: {
                description:
                    'The date or estimated date that the condition resolved or went into remission. This is called "abatement" because of the many overloaded connotations associated with "remission" or "resolution" - Some conditions, such as chronic conditions, are never really resolved, but they can abate.'
            },
            abatementAge: {
                description:
                    'The date or estimated date that the condition resolved or went into remission. This is called "abatement" because of the many overloaded connotations associated with "remission" or "resolution" - Some conditions, such as chronic conditions, are never really resolved, but they can abate.'
            },
            abatementPeriod: {
                description:
                    'The date or estimated date that the condition resolved or went into remission. This is called "abatement" because of the many overloaded connotations associated with "remission" or "resolution" - Some conditions, such as chronic conditions, are never really resolved, but they can abate.'
            },
            abatementRange: {
                description:
                    'The date or estimated date that the condition resolved or went into remission. This is called "abatement" because of the many overloaded connotations associated with "remission" or "resolution" - Some conditions, such as chronic conditions, are never really resolved, but they can abate.'
            },
            abatementString: {
                description:
                    'The date or estimated date that the condition resolved or went into remission. This is called "abatement" because of the many overloaded connotations associated with "remission" or "resolution" - Some conditions, such as chronic conditions, are never really resolved, but they can abate.'
            },
            recordedDate: {
                description:
                    'The recordedDate represents when this particular Condition record was created in the system, which is often a system-generated date.'
            },
            participant: {
                description: 'Indicates who or what participated in the activities related to the condition and how they were involved.'
            },
            stage: {
                description:
                    'A simple summary of the stage such as "Stage 3" or "Early Onset". The determination of the stage is disease-specific, such as cancer, retinopathy of prematurity, kidney diseases, Alzheimer\'s, or Parkinson disease.'
            },
            evidence: {
                description:
                    "Supporting evidence / manifestations that are the basis of the Condition's verification status, such as evidence that confirmed or refuted the condition."
            },
            note: {
                description:
                    'Additional information about the Condition. This is a general notes/comments entry  for description of the Condition, its diagnosis and prognosis.'
            }
        }
    },
    definition: {}
} satisfies Pick<LocaleData['fhir'], 'field' | 'definition'>;
