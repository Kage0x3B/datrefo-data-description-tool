import type { FhirResourceField } from '$lib/fhir/FhirMetadata';

export interface ModalType {
    open(): void;

    close(): void;
}

export interface SelectionOptionsModalType extends ModalType {
    open(documentId: string, selectionFieldPath: string, selectionField: FhirResourceField);
}

type ModalTypeNames = 'createDocument' | 'selectionOptions' | 'export';
