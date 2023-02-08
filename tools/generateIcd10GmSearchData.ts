import fs from 'fs/promises';
import * as path from 'path';
import { writeGeneratedFile } from './util.js';
import type { Icd10GmSearchEntry } from '../src/lib/types/Icd10GmSearchEntry';

const TOOLS_DATA_DIRECTORY = './tools/data';
const ICD_10_GM_CSV_FILE = 'icd10gm2023alpha_edvtxt_20220930.txt';

type Icd10GmCodeType = 0 | 1 | 2 | 3 | 4 | 5 | 6;

interface Icd10GmCodeEntry {
    /**
     * - 0: reiner Verweissatz
     *
     *      Diese Datensätze haben keine Schlüsselnummer,
     *      sondern innerhalb des Textfeldes Verweise auf andere Begriffe,
     *      unter denen ihre Schlüsselnummern nachgewiesen sind.
     *
     * - 1: Kodierung nur mit einer Primärschlüsselnummer
     *
     * - 2: Kodierung mit einer Kreuz- und einer Sternschlüsselnummer
     *
     * - 3: Kodierung mit einer Primärschlüsselnummer und mit einer Zusatzschlüsselnummer mit Ausrufezeichen
     *
     * - 4: Kodierung mit einer Kreuz-, einer Stern- und einer Zusatzschlüsselnummer
     *
     * - 5: Kodierung nur als Zusatzschlüsselnummer möglich
     *
     * - 6: Kodierung mit zwei Primärschlüsselnummern
     */
    type: Icd10GmCodeType;
    /**
     * BfArM-interne fortlaufende Nummer
     */
    internalId: number;
    /**
     * Druckkennzeichen - ob dieser Satz in der Buchversion erscheint
     */
    includedInPrintVersion: boolean;
    /**
     * Primärschlüsselnummer 1 (ggf. mit Kreuz)
     */
    primaryCoding1: string | undefined;
    /**
     * Sternschlüsselnummer (mit Stern)
     */
    starCoding: string | undefined;
    /**
     * Zusatzschlüsselnummer (mit Ausrufezeichen)
     */
    additionalCoding: string | undefined;
    /**
     * Primärschlüsselnummer 2 (ggf. mit Kreuz)
     */
    primaryCoding2: string | undefined;
    /**
     * zugehöriger Text, ggf. mit Verweis
     */
    description: string;
}

function parseIcd10EntryType(value: string): Icd10GmCodeType {
    const type = Number(value);

    if (type >= 0 && type <= 6) {
        return type as Icd10GmCodeType;
    } else {
        throw new Error(`Invalid icd 10 code type ${value}`);
    }
}

// TODO: doppelte Primärcodes und Sekundäre Codes, wie z.B. Kreuz-Stern-System wird bis jetzt ignoriert
async function generateIcd10GmSearchData() {
    console.info('Reading ICD-10-GM PSV data');

    // Actually Pipe Separated Values, not CSV
    const icd10PsvData = await fs.readFile(path.join(TOOLS_DATA_DIRECTORY, ICD_10_GM_CSV_FILE), 'utf-8');

    const icd10CodeList: Icd10GmCodeEntry[] = icd10PsvData
        .split(/[\n\r]+/)
        .map((icd10Line) => {
            const data = icd10Line.split('|');

            return {
                type: parseIcd10EntryType(data[0]),
                internalId: Number(data[1]),
                includedInPrintVersion: Boolean(data[2]),
                primaryCoding1: data[3] ? data[3] : undefined,
                starCoding: data[4] ? data[4] : undefined,
                additionalCoding: data[5] ? data[5] : undefined,
                primaryCoding2: data[6] ? data[6] : undefined,
                description: data[7] ? data[7] : '',
                rawField: icd10Line
            };
        })
        .filter((entry) => {
            const definedCodes = [entry.primaryCoding1, entry.primaryCoding2, entry.starCoding, entry.additionalCoding].filter((v) => !!v);

            return (
                definedCodes.length &&
                entry.description &&
                (entry.primaryCoding1 || entry.primaryCoding2) &&
                !(entry.primaryCoding1 && entry.primaryCoding2)
            );
        });

    const searchEntryList: Icd10GmSearchEntry[] = icd10CodeList.map((icd10Code) => ({
        c: icd10Code.primaryCoding1 ?? icd10Code.primaryCoding2!,
        d: icd10Code.description
    }));

    /*console.info('Creating Search Index');

	const searchEntryIndex = Fuse.createIndex(['code', 'description'], searchEntryList);*/

    console.info('Saving data');

    await writeGeneratedFile('autocomplete/icd10Gm.json', JSON.stringify(searchEntryList), false);
    //await writeGeneratedFile('autocomplete/icd10GmIndex.json', JSON.stringify(searchEntryIndex.toJSON()), false);

    console.info('Done');
}

generateIcd10GmSearchData().catch((err) => {
    console.error("Couldn't execute script", err);
    process.exit(1);
});
