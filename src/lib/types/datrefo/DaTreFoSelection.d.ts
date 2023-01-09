export enum MappingFunction {
    TIME_SHIFT = 'timeShift',
    DATE_ROUNDING = 'dateRounding',
    CODE_ROUNDING = 'codeRounding',
    AGE = 'age'
}

export enum AggregationFunction {
    CATEGORY = 'category'
}

interface MappingParameters {
    timeShift?: {
        shift: number;
        timeUnit: 'year' | 'month' | 'week';
    };
    codeRounding?: {
        precision: number;
    };
}

interface AggregationParameters {
    category?: {
        lessThan?: number;
        moreThan?: number;
        lessThanOrEqual?: number;
        moreThanOrEqual?: number;
        label?: string;
    }[];
}

interface DaTreFoSelectionOptions {
    mappingFunction: MappingFunction | MappingFunction[];
    mappingParameters: MappingParameters;
    aggregationFunction: AggregationFunction | AggregationFunction[];
    aggregationParameters: AggregationParameters;
}

export type DaTreFoSelection = boolean | DaTreFoSelectionOptions;
