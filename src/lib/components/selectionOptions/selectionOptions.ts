import type { FhirResourceField } from '$lib/fhir/FhirMetadata.js';
import { FhirFieldPrimitiveType } from '$lib/fhir/FhirFieldPrimitiveType.js';
import type { AggregationParameters, MappingParameters } from '$lib/types/datrefoFormat/DaTreFoSelection';
import { AggregationFunction, MappingFunction } from '$lib/types/datrefoFormat/DaTreFoSelection';
import TimeShiftMappingFunctionComponent from '$lib/components/selectionOptions/TimeShiftMappingFunctionComponent.svelte';

const numberTypes: FhirFieldPrimitiveType[] = [
    FhirFieldPrimitiveType.INTEGER,
    FhirFieldPrimitiveType.INTEGER_64,
    FhirFieldPrimitiveType.POSITIVE_INT,
    FhirFieldPrimitiveType.UNSIGNED_INT,
    FhirFieldPrimitiveType.DECIMAL
];

const dateTimeTypes: FhirFieldPrimitiveType[] = [
    FhirFieldPrimitiveType.DATE,
    FhirFieldPrimitiveType.DATE_TIME,
    FhirFieldPrimitiveType.TIME,
    FhirFieldPrimitiveType.INSTANT
];

const dateTypes: FhirFieldPrimitiveType[] = [
    FhirFieldPrimitiveType.DATE,
    FhirFieldPrimitiveType.DATE_TIME,
    FhirFieldPrimitiveType.INSTANT
];

export const aggregationFunctionInfo: Record<
    AggregationFunction,
    {
        isUsableOnField: (field: FhirResourceField) => boolean;
        createDefaultParameters: () => AggregationParameters[AggregationFunction];
        component?: any;
    }
> = {
    [AggregationFunction.CATEGORY]: {
        isUsableOnField(field: FhirResourceField) {
            return numberTypes.includes(field.type as FhirFieldPrimitiveType);
        },
        createDefaultParameters(): AggregationParameters['category'] {
            return [];
        }
    }
};

export const mappingFunctionInfo: Record<
    MappingFunction,
    {
        isUsableOnField: (field: FhirResourceField) => boolean;
        createDefaultParameters: () => MappingParameters[MappingFunction];
        component?: any;
    }
> = {
    [MappingFunction.TIME_SHIFT]: {
        isUsableOnField(field: FhirResourceField) {
            return dateTimeTypes.includes(field.type as FhirFieldPrimitiveType);
        },
        createDefaultParameters(): MappingParameters['timeShift'] {
            return {
                shift: 1,
                timeUnit: 'month'
            };
        },
        component: TimeShiftMappingFunctionComponent
    },
    [MappingFunction.DATE_ROUNDING]: {
        isUsableOnField(field: FhirResourceField) {
            return dateTypes.includes(field.type as FhirFieldPrimitiveType);
        },
        createDefaultParameters(): MappingParameters['dateRounding'] {
            return undefined;
        }
    },
    [MappingFunction.CODE_ROUNDING]: {
        isUsableOnField(field: FhirResourceField) {
            return numberTypes.includes(field.type as FhirFieldPrimitiveType);
        },
        createDefaultParameters(): MappingParameters['codeRounding'] {
            return {
                precision: 1
            };
        }
    },
    [MappingFunction.AGE]: {
        isUsableOnField(field: FhirResourceField) {
            return field.name === 'birthDate';
        },
        createDefaultParameters(): MappingParameters['age'] {
            return undefined;
        }
    }
};