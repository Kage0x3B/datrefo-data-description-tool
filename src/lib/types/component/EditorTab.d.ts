import type { DaTreFoDocument } from '$lib/types/datrefo/DaTreFoDocument';

export type TabType = 'document' | 'excludeConditions';

export interface EditorTab {
    get type(): TabType;

    serializeDocument(): DaTreFoDocument | DaTreFoDocument[];
}

export interface DocumentTab extends EditorTab {
    get type(): 'document';

    serializeDocument(): DaTreFoDocument;
}

export interface ExcludeConditionsTab extends EditorTab {
    get type(): 'excludeConditions';

    serializeDocument(): DaTreFoDocument[];
}
