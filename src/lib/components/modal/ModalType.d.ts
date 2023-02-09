import type { FhirResourceField } from '$lib/fhir/FhirMetadata';

export interface ModalType {
    open(): void;

    close(): void;
}

export interface ConfirmModalType extends ModalType {
    open(promptMessage: string, affirmativeText?: string, cancelText?: string): Promise<boolean>;
}

export interface PromptModalType extends ModalType {
    open(_promptMessage: string, defaultValue?: string, _saveMessage?: string, _cancelMessage?: string): Promise<string | false>;
}

export interface SelectionOptionsModalType extends ModalType {
    open(documentId: string, selectionFieldPath: string, selectionField: FhirResourceField);
}

type ModalTypeNames = 'confirm' | 'prompt' | 'createDocument' | 'selectionOptions' | 'export';
