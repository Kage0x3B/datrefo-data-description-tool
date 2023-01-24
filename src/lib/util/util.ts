// eslint-disable-next-line @typescript-eslint/ban-types

export function hasOwnProperty<X extends {}, Y extends PropertyKey>(obj: X, prop: Y): obj is X & Record<Y, unknown> {
    return Object.hasOwn(obj, prop);
}

export function groupByKey<T, KeyType extends string | number | symbol = string>(
    array: T[],
    key: keyof T
): Record<KeyType, T[]> {
    // @ts-ignore
    return array.reduce((hash, obj) => {
        if (obj[key] === undefined) {
            return hash;
        }

        // @ts-ignore
        return Object.assign(hash, { [obj[key]]: (hash[obj[key]] || []).concat(obj) });
    }, {});
}

export function enumKeys<O extends object, K extends keyof O = keyof O>(obj: O): K[] {
    return Object.keys(obj).filter((k) => Number.isNaN(+k)) as K[];
}

export function enumValues<O extends object>(obj: O): O[keyof O][] {
    return enumKeys(obj).map((key) => obj[key]);
}

export function debounce<ArgsType extends unknown[]>(
    func: (...args: ArgsType) => void,
    timeout: number
): (...args: ArgsType) => void {
    let timer: NodeJS.Timeout;

    return (...args: ArgsType) => {
        clearTimeout(timer);
        timer = setTimeout(() => func(...args), timeout);
    };
}

export function debounceLeading<ArgsType extends unknown[]>(func: (...args: ArgsType) => void, timeout: number) {
    let timer: NodeJS.Timeout | undefined;

    return (...args: ArgsType) => {
        if (!timer) {
            // @ts-ignore
            func.apply(this, args);
        }

        clearTimeout(timer);

        timer = setTimeout(() => {
            timer = undefined;
        }, timeout);
    };
}
