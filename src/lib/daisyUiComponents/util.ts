type ClassNameType = string | number | (string | number)[] | Record<string, boolean>;

function toClassName(value: ClassNameType): string {
    let result = '';

    if (typeof value === 'string' || typeof value === 'number') {
        result += value;
    } else if (typeof value === 'object') {
        if (Array.isArray(value)) {
            result = value.map(toClassName).filter(Boolean).join(' ');
        } else {
            for (const key of Object.keys(value)) {
                if (value[key]) {
                    result && (result += ' ');
                    result += key;
                }
            }
        }
    }

    return result;
}

export default function classnames(...args: ClassNameType[]): string {
    return args.map(toClassName).filter(Boolean).join(' ');
}
