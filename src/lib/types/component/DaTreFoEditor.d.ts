import { FhirResourceType } from '$lib/generated/FhirResourceType';
import { InternalDocument } from '$lib/types/InternalDocument';
import { ModalTypeNames } from '$lib/components/modal/ModalType';

export type TabId = 'excludePatientConditions' | string;
export type TabType = 'document' | 'excludePatientConditions';

export interface EditorDocumentTabData {
    id: string;
    type: 'document';
    documentId: string;
}

export interface EditorExcludePatientConditionsTabData {
    id: 'excludePatientConditions';
    type: 'excludePatientConditions';
}

export type EditorTabData = EditorDocumentTabData | EditorExcludePatientConditionsTabData;

export interface DaTreFoEditorContext {
    createDocument(resourceType: FhirResourceType): InternalDocument;

    openTab(type: TabType, documentOrId?: InternalDocument | string): Promise<void>;

    focusTab(tabId: string);

    closeTab(tabId: string): void;
    showModal(type: ModalTypeNames, ...args: unknown[]);
}
