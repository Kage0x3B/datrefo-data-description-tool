import type { FhirResourceField } from '$lib/fhir/FhirMetadata';
import { AutocompleteType } from '$lib/components/autocomplete/AutocompleteType';

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

export interface CodeAutocompleteModalType extends ModalType {
    open(autocompleteType: AutocompleteType, initialValue: string);
}

type ModalTypeNames =
    | 'confirm'
    | 'prompt'
    | 'createDocument'
    | 'createExcludeCondition'
    | 'selectionOptions'
    | 'export'
    | 'codeAutocomplete';
