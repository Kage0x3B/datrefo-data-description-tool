export enum MappingFunction {
    TIME_SHIFT = 'timeShift',
    DATE_ROUNDING = 'dateRounding',
    CODE_ROUNDING = 'codeRounding',
    AGE = 'age'
}

export enum AggregationFunction {
    CATEGORY = 'category'
}

export interface MappingParameters {
    timeShift?: {
        shift: number;
        timeUnit: 'year' | 'month' | 'week';
    };
    dateRounding?: undefined;
    codeRounding?: {
        precision: number;
    };
    age?: undefined;
}

export interface AggregationParameters {
    category?: {
        lessThan?: number;
        moreThan?: number;
        lessThanOrEqual?: number;
        moreThanOrEqual?: number;
        label?: string;
    }[];
}

export interface DaTreFoSelectionOptions {
    mappingFunction: MappingFunction | MappingFunction[];
    mappingParameters: MappingParameters;
    aggregationFunction: AggregationFunction | AggregationFunction[];
    aggregationParameters: AggregationParameters;
}

export type DaTreFoSelection = boolean | DaTreFoSelectionOptions;
