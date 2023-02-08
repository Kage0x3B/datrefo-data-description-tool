export enum MappingFunction {
    TIME_SHIFT = 'timeShift',
    DATE_ROUNDING = 'dateRounding',
    CODE_ROUNDING = 'codeRounding',
    AGE = 'age'
}

export enum AggregationFunction {
    CATEGORY = 'category',
    AVERAGE = 'average'
}

export interface MappingParameters {
    timeShift?: {
        shift: number;
        timeUnit: 'year' | 'month' | 'week' | 'day' | 'hour';
    };
    dateRounding?: {
        timeUnit: 'year' | 'month' | 'week' | 'day' | 'hour';
    };
    codeRounding?: {
        precision: number;
    };
    age?: undefined;
}

export interface AggregationParameters {
    category?: {
        categories: {
            lessThan?: number;
            moreThan?: number;
            lessThanOrEqual?: number;
            moreThanOrEqual?: number;
            label?: string;
        }[];
    };
    average?: undefined;
}

export interface DaTreFoSelectionOptions {
    mappingFunction: MappingFunction | MappingFunction[];
    mappingParameters: MappingParameters;
    aggregationFunction: AggregationFunction | AggregationFunction[];
    aggregationParameters: AggregationParameters;
}

export type DaTreFoSelection = boolean | DaTreFoSelectionOptions;
