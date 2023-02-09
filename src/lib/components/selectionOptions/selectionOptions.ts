import type { FhirFieldType, FhirResourceField } from '$lib/fhir/FhirMetadata.js';
import { FhirFieldPrimitiveType } from '$lib/fhir/FhirFieldPrimitiveType.js';
import type { AggregationParameters, MappingParameters } from '$lib/types/datrefoFormat/DaTreFoSelection';
import { AggregationFunction, MappingFunction } from '$lib/types/datrefoFormat/DaTreFoSelection';
import TimeShiftMappingFunctionComponent from '$lib/components/selectionOptions/TimeShiftMappingFunctionComponent.svelte';
import CategoryAggregationFunctionComponent from '$lib/components/selectionOptions/CategoryAggregationFunctionComponent.svelte';
import DateRoundingMappingFunctionComponent from '$lib/components/selectionOptions/DateRoundingMappingFunctionComponent.svelte';
import AverageAggregationFunctionComponent from '$lib/components/selectionOptions/AverageAggregationFunctionComponent.svelte';
import { FhirFieldObjectType } from '$lib/fhir/FhirFieldObjectType';
import CodeRoundingMappingFunctionComponent from '$lib/components/selectionOptions/CodeRoundingMappingFunctionComponent.svelte';

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

const codeSystemTypes: FhirFieldType[] = [FhirFieldObjectType.CODEABLE_CONCEPT, FhirFieldObjectType.CODING];

const dateTypes: FhirFieldPrimitiveType[] = [FhirFieldPrimitiveType.DATE, FhirFieldPrimitiveType.DATE_TIME, FhirFieldPrimitiveType.INSTANT];

export const aggregationFunctionInfo: Record<
    AggregationFunction,
    {
        isUsableOnField: (field: FhirResourceField) => boolean;
        createDefaultParameters: () => AggregationParameters[AggregationFunction];
        component?: any;
    }
> = {
    [AggregationFunction.CATEGORY]: {
        isUsableOnField(field) {
            return numberTypes.includes(field.type as FhirFieldPrimitiveType);
        },
        createDefaultParameters(): AggregationParameters['category'] {
            return {
                categories: []
            };
        },
        component: CategoryAggregationFunctionComponent
    },
    [AggregationFunction.AVERAGE]: {
        isUsableOnField(field) {
            return numberTypes.includes(field.type as FhirFieldPrimitiveType);
        },
        createDefaultParameters(): AggregationParameters['average'] {
            return undefined;
        },
        component: AverageAggregationFunctionComponent
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
            return {
                timeUnit: 'month'
            };
        },
        component: DateRoundingMappingFunctionComponent
    },
    [MappingFunction.CODE_ROUNDING]: {
        isUsableOnField(field: FhirResourceField) {
            return codeSystemTypes.includes(field.type);
        },
        createDefaultParameters(): MappingParameters['codeRounding'] {
            return {
                precision: 5
            };
        },
        component: CodeRoundingMappingFunctionComponent
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

export function isAnyPseudonymizationFunctionAvailable(field: FhirResourceField): boolean {
    return (
        Object.values(aggregationFunctionInfo).some((func) => func.isUsableOnField(field)) ||
        Object.values(mappingFunctionInfo).some((func) => func.isUsableOnField(field))
    );
}

export function getAvailableAggregationFunctions(
    field: FhirResourceField,
    currentAggregationFunctions: AggregationFunction[] = []
): AggregationFunction[] {
    return (Object.keys(aggregationFunctionInfo) as AggregationFunction[]).filter(
        (func) => !currentAggregationFunctions.includes(func) && aggregationFunctionInfo[func].isUsableOnField(field)
    );
}

export function getAvailableMappingFunctions(field: FhirResourceField, currentMappingFunctions: MappingFunction[] = []): MappingFunction[] {
    return (Object.keys(mappingFunctionInfo) as MappingFunction[]).filter(
        (func) => !currentMappingFunctions.includes(func) && mappingFunctionInfo[func].isUsableOnField(field)
    );
}
