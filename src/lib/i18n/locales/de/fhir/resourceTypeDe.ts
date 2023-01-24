import type { LocaleData } from '$lib/i18n/locales/LocaleData';

export default {
    Patient: {
        name: 'Patient',
        description:
            'Demografische und andere administrative Informationen über eine Person oder ein Tier, das Pflege oder andere gesundheitsbezogene Dienstleistungen erhält.'
    },
    Medication: {
        name: 'Medikament',
        description:
            'Diese Ressource dient in erster Linie der Identifizierung und Definition eines Medikaments, einschließlich der Inhaltsstoffe, zum Zwecke der Verschreibung, Abgabe und Verabreichung eines Medikaments sowie für Aussagen über die Verwendung von Medikamenten.'
    },
    MedicationAdministration: {
        name: 'Verabreichung von Medikamenten',
        description:
            'Beschreibt das Ereignis, bei dem ein Patient ein Medikament einnimmt oder ihm auf andere Weise verabreicht wird.  Dies kann so einfach sein wie das Schlucken einer Tablette oder eine lang laufende Infusion.  Verwandte Ressourcen verknüpfen dieses Ereignis mit der genehmigenden Verschreibung und der spezifischen Begegnung zwischen Patient und Arzt.'
    },
    MedicationDispense: {
        name: 'Abgabe von Medikamenten',
        description:
            'Gibt an, dass ein Arzneimittel für eine bestimmte Person/Patienten abgegeben werden soll oder abgegeben wurde.  Dies beinhaltet eine Beschreibung des abgegebenen Medikamentenprodukts (Lieferung) und die Anweisungen zur Verabreichung des Medikaments.  Die Medikamentenabgabe ist das Ergebnis eines Apothekensystems, das auf eine Medikamentenbestellung reagiert.'
    },
    MedicationKnowledge: {
        name: 'Wissen über Medikamente',
        description: 'Informationen über ein Medikament, die der Wissensvermittlung dienen.'
    },
    MedicationRequest: {
        name: 'Medikamentenanfrage',
        description:
            'Eine Bestellung oder Anforderung sowohl für die Lieferung des Medikaments als auch für die Anweisungen zur Verabreichung des Medikaments an einen Patienten. Die Ressource heißt "MedicationRequest" und nicht "MedicationPrescription" oder "MedicationOrder", um die Verwendung in stationären und ambulanten Einrichtungen, einschließlich Pflegeplänen usw., zu verallgemeinern und mit Workflow-Mustern zu harmonisieren.'
    },
    MedicationUsage: {
        name: 'Verwendung von Medikamenten',
        description:
            'Eine Aufzeichnung eines Medikaments, das von einem Patienten eingenommen wird. Eine MedicationUsage kann angeben, dass der Patient das Medikament gerade einnimmt, in der Vergangenheit eingenommen hat oder in Zukunft einnehmen wird.  Die Quelle dieser Informationen kann der Patient selbst, ein nahestehender Mensch (z. B. ein Familienmitglied oder der Ehepartner) oder ein Kliniker sein.  Ein häufiges Szenario, in dem diese Informationen erfasst werden, ist die Anamneseerhebung während eines Patientenbesuchs oder -aufenthalts.   Die Informationen über die Medikation können aus Quellen wie dem Gedächtnis des Patienten, aus einem Rezept oder aus einer Medikamentenliste stammen, die der Patient, der Arzt oder eine andere Partei führt.\n\nDer Hauptunterschied zwischen einem Medikamentengebrauch und einer Medikamentenverabreichung besteht darin, dass die Medikamentenverabreichung vollständige Verabreichungsinformationen enthält und auf den tatsächlichen Verabreichungsinformationen der Person beruht, die das Medikament verabreicht hat.  Ein Medikamentengebrauch ist oft, wenn auch nicht immer, weniger spezifisch.  Es gibt kein vorgeschriebenes Datum und keine Uhrzeit für die Verabreichung des Medikaments, sondern wir wissen nur, dass eine Quelle berichtet hat, dass der Patient dieses Medikament einnimmt, wobei Details wie Zeit, Menge oder Rate oder sogar das Medikamentenprodukt unvollständig sein können oder fehlen oder weniger präzise sind.  Wie bereits erwähnt, können die Informationen über die Medikamenteneinnahme aus dem Gedächtnis des Patienten, aus einer Rezeptflasche oder aus einer Liste von Medikamenten stammen, die der Patient, der Arzt oder eine andere Partei führt.  Die Verabreichung von Medikamenten ist eher formell und es fehlen keine detaillierten Informationen.\n\nDie Ressource "MedicationUsage" hieß früher "MedicationStatement".'
    }
} satisfies Partial<LocaleData['fhir']['resourceType']>;
