import fs from 'fs/promises';
import * as path from 'path';
import type { BuiltInParserName } from 'prettier';
import prettier from 'prettier';
import { constantCase } from 'change-case';

const GENERATED_FILES_DIRECTORY = './src/lib/generated';

export async function writeGeneratedFile(filePath: string, source: string, prettierParser: BuiltInParserName | false = 'typescript') {
    if (prettierParser) {
        source = prettier.format(source, {
            useTabs: false,
            singleQuote: true,
            trailingComma: 'none',
            printWidth: 120,
            tabWidth: 4,
            semi: true,
            bracketSpacing: true,
            parser: prettierParser
        });
    }

    await fs.writeFile(path.join(GENERATED_FILES_DIRECTORY, filePath), source);
}

export function generateEnum(name: string, entries: (string | [string, string])[]): string {
    const entriesString = entries
        .map((e) => (Array.isArray(e) ? `${constantCase(e[0])} = '${e[1]}'` : `${constantCase(e)} = '${e}'`))
        .join(',\n');

    console.info(`Generated FhirResourceType enum with ${entries.length} entries`);

    return `
export enum FhirResourceType {
    ${entriesString}
}`;
}
