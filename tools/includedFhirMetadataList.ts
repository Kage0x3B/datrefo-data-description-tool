import { FhirResourceType } from '../src/lib/generated/FhirResourceType.js';
import { enumValues } from '../src/lib/util/util.js';

export const globalExcludedKeyList: RegExp[] = buildRegexList([
    /^_/,
    /extended/i,
    /extension/i,
    /reference/i,
    /^id$/,
    /^identifier$/,
    /^assigner$/,
    /^resourceType$/
]);

export const includedFhirMetadataList: Partial<Record<FhirResourceType | string, RegExp[]>> = {
    [FhirResourceType.PATIENT]: buildRegexList(['gender', 'birthDate', 'deceased', 'multipleBirth']),
    [FhirResourceType.MEDICATION]: buildRegexList(['code', 'status', 'doseForm', 'totalVolume', 'ingredient', 'batch']),
    [FhirResourceType.MEDICATION_ADMINISTRATION]: buildRegexList([
        'status',
        'statusReason',
        'category',
        'medication',
        'recorded',
        /subPotant/i,
        'dosage'
    ]),
    [FhirResourceType.OBSERVATION]: buildRegexList([
        'status',
        'category',
        'code',
        'effective',
        'issued',
        'value',
        'dataAbsentReason',
        'interpretation',
        'bodySite',
        'method',
        'referenceRange',
        'component'
    ])
};

/* For testing with all resource types */
for (const type of enumValues(FhirResourceType)) {
    includedFhirMetadataList[type] ??= [/.+/];
}

function buildRegexList(list: (string | RegExp)[]): RegExp[] {
    return list.map((value) => {
        if (typeof value === 'string') {
            return new RegExp(`^${value}`);
        } else {
            return value;
        }
    });
}
