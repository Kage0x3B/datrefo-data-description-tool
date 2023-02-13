import type { FhirDefinition, FhirResourceField } from '$lib/fhir/FhirMetadata';
import type { ConditionOperator, DaTreFoOperatorCondition, LogicalConditionOperator } from '$lib/types/datrefoFormat/DaTreFoCondition';
import { isFieldTypeCombinedCondition, isFieldTypeNumber } from '$lib/fhir/fhirUtil';
import type { InternalCombinedCondition, InternalCondition } from '$lib/types/InternalDocument';
import { hasOwnProperty } from '$lib/util/util';
import { FhirFieldObjectType } from '$lib/fhir/FhirFieldObjectType';

export const displayedOperators: ConditionOperator[] = ['eq', 'neq', 'lt', 'lteq', 'gt', 'gteq'];
export const conditionOperatorInfo: Record<
    ConditionOperator,
    {
        appliesToField: (field: FhirResourceField) => boolean;
    }
> = {
    eq: {
        appliesToField: () => true
    },
    neq: {
        appliesToField: () => true
    },
    lt: {
        appliesToField: isFieldTypeNumber
    },
    lteq: {
        appliesToField: isFieldTypeNumber
    },
    gt: {
        appliesToField: isFieldTypeNumber
    },
    gteq: {
        appliesToField: isFieldTypeNumber
    },
    hasPart: {
        appliesToField: () => false
    },
    isAllOf: {
        appliesToField: () => false
    },
    isNoneOf: {
        appliesToField: () => false
    },
    isA: {
        appliesToField: () => false
    },
    isAnyOf: {
        appliesToField: () => false
    },
    isPartOf: {
        appliesToField: () => false
    }
};

export const logicalConditionOperator: Record<LogicalConditionOperator, {}> = {
    or: {},
    xone: {},
    and: {}
};

export function isCombinedCondition(condition: InternalCondition): condition is InternalCombinedCondition {
    return hasOwnProperty(condition, 'basePath');
}

export function findNestedField(
    fields: FhirResourceField[],
    definitions: Record<string, FhirDefinition>,
    fieldPath: string
): FhirResourceField | undefined {
    const pathPart = fieldPath.indexOf('.') > 0 ? fieldPath.substring(0, fieldPath.indexOf('.')) : fieldPath;
    const pathRest = fieldPath.indexOf('.') > 0 ? fieldPath.substring(fieldPath.indexOf('.') + 1) : '';

    const matchingField = fields.find((field) => field.name === pathPart);

    if (!matchingField) {
        return undefined;
    }

    if (matchingField.type === 'definition') {
        if (!matchingField.definition) {
            return undefined;
        }

        const definition = definitions[matchingField.definition];

        if (!definition) {
            return undefined;
        }

        return findNestedField(definition.fields, definitions, pathRest);
    } else {
        return matchingField;
    }
}

export function createCondition(field: FhirResourceField, fieldPath: string): InternalCondition {
    if (isFieldTypeCombinedCondition(field)) {
        const subConditions: DaTreFoOperatorCondition[] = [];

        if (field.type === FhirFieldObjectType.CODEABLE_CONCEPT || field.type === FhirFieldObjectType.CODING) {
            subConditions.push(
                {
                    leftOperand: 'system',
                    operator: 'eq',
                    rightOperand: ''
                },
                {
                    leftOperand: 'code',
                    operator: 'eq',
                    rightOperand: ''
                }
            );
        }

        return {
            basePath: fieldPath,
            conditions: subConditions
        } satisfies InternalCombinedCondition;
    } else {
        return {
            leftOperand: fieldPath,
            operator: 'eq',
            rightOperand: ''
        } satisfies DaTreFoOperatorCondition;
    }
}
