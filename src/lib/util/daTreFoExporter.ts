import { documents as documentsStore, excludePatientConditions as excludePatientConditionsStore } from '$lib/projectData';
import { get } from 'svelte/store';
import type { InternalCondition, InternalDocument } from '$lib/types/InternalDocument';
import type { DaTreFoDocument, DaTreFoRecursiveSelection } from '$lib/types/datrefoFormat/DaTreFoDocument';
import JSZip from 'jszip';
import type { DaTreFoCondition } from '$lib/types/datrefoFormat/DaTreFoCondition';
import { isCombinedCondition } from '$lib/components/conditions/conditionUtil';
import type { FhirResourceType } from '$lib/generated/FhirResourceType';
import { pascalCase } from 'change-case';

export interface ExportOptions {
    documentContainer: 'json' | 'zip';
    jsonFormat: 'prettified' | 'minified';
    selection: 'fieldNameArray' | 'expandedObject';
    conditions: 'odrl';
}

export async function exportProject(options: ExportOptions): Promise<{ data: Blob; fileName: string }> {
    const documents = get(documentsStore);
    const excludePatientConditions = get(excludePatientConditionsStore);
    let exportedDocuments: Record<string, DaTreFoDocument> = {};

    for (const [documentId, document] of Object.entries(documents)) {
        exportedDocuments[documentId] = exportDocument(document, options);
    }

    const exportedExcludeConditionDocuments = exportExcludePatientConditionDocuments(excludePatientConditions, options);
    exportedDocuments = {
        ...exportedDocuments,
        ...exportedExcludeConditionDocuments
    };

    if (options.documentContainer === 'zip') {
        return {
            fileName: 'daTreFoDataDescriptionExport.zip',
            data: await exportProjectZip(exportedDocuments, options)
        };
    } else {
        const exportedJson = JSON.stringify(Object.values(exportedDocuments), null, options.jsonFormat === 'prettified' ? 2 : 0);
        return {
            fileName: 'daTreFoDataDescriptionExport.json',
            data: new Blob([exportedJson], { type: 'application/json' })
        };
    }
}

async function exportProjectZip(documents: Record<string, DaTreFoDocument>, options: ExportOptions): Promise<Blob> {
    const projectZip = new JSZip();

    for (const [documentId, document] of Object.entries(documents)) {
        projectZip.file(`${documentId}.json`, JSON.stringify(document, null, options.jsonFormat === 'prettified' ? 2 : 0));
    }

    return await projectZip.generateAsync({
        type: 'blob'
    });
}

function exportDocument(document: InternalDocument, options: ExportOptions): DaTreFoDocument {
    const selections = generateSelections(document, options);

    return {
        resourceType: document.resourceType,
        condition: generateConditions(document.condition, options),
        ...selections
    };
}

function exportExcludePatientConditionDocuments(
    excludePatientConditions: Record<FhirResourceType, InternalCondition[]>,
    options: ExportOptions
): Record<string, DaTreFoDocument> {
    const exportedDocuments: Record<string, DaTreFoDocument> = {};

    for (const [resourceType, conditionList] of Object.entries(excludePatientConditions) as [FhirResourceType, InternalCondition[]][]) {
        if (!conditionList?.length) {
            continue;
        }

        exportedDocuments['excludePatientConditions' + pascalCase(resourceType)] = {
            resourceType,
            excludePatientCondition: generateConditions(conditionList, options)
        };
    }

    return exportedDocuments;
}

function generateSelections(document: InternalDocument, options: ExportOptions): DaTreFoRecursiveSelection {
    const selections = {};

    if (options.selection === 'expandedObject') {
        for (const [fieldPath, selection] of Object.entries(document.selections)) {
            setObjectPath(selections, fieldPath, selection);
        }
    } else if (options.selection === 'fieldNameArray') {
        // @ts-ignore
        selections.selections = [];

        for (const [fieldPath, selection] of Object.entries(document.selections)) {
            if (selection) {
                // @ts-ignore
                selections.selections.push(fieldPath);
            }
        }
    }

    return selections;
}

function generateConditions(conditionList: InternalCondition[], options: ExportOptions): DaTreFoCondition[] {
    const exportConditions: DaTreFoCondition[] = [];

    for (const condition of conditionList) {
        if (isCombinedCondition(condition)) {
            for (const subCondition of condition.conditions) {
                exportConditions.push({
                    ...subCondition,
                    leftOperand: condition.basePath + '.' + subCondition.leftOperand
                });
            }
        } else {
            exportConditions.push(condition);
        }
    }

    return exportConditions;
}

/**
 * Set the value of a nested object with a dot-notation path
 *
 * @param obj
 * @param path
 * @param value
 * @see https://stackoverflow.com/a/6394168/6311961
 */
function setObjectPath<T extends Record<string, any>>(obj: T, path: string | string[], value: unknown): T {
    if (typeof path == 'string') {
        return setObjectPath(obj, path.split('.'), value);
    } else if (path.length == 1 && value !== undefined) {
        // @ts-ignore
        return (obj[path[0]] = value);
    } else if (path.length == 0) {
        return obj;
    } else {
        if (!obj[path[0]]) {
            // @ts-ignore
            obj[path[0]] = {};
        }

        return setObjectPath(obj[path[0]], path.slice(1), value);
    }
}
