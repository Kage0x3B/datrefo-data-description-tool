type ConditionOperator =
    | 'eq'
    | 'lt'
    | 'hasPart'
    | 'isAllOf'
    | 'isNoneOf'
    | 'isA'
    | 'neq'
    | 'isAnyOf'
    | 'lteq'
    | 'gt'
    | 'isPartOf'
    | 'gteq';
type LogicalConditionOperand = 'or' | 'xone' | 'and';

/**
 * @see https://www.w3.org/TR/odrl-model/#x2-5-1-constraint-class
 */
interface DaTreFoOperatorCondition {
    leftOperand: string;
    operator: ConditionOperator;
    rightOperand: string;
}

/**
 * @see https://www.w3.org/TR/odrl-model/#x2-5-2-logical-constraint-class
 */
interface DaTreFoLogicalCondition {
    operand: DaTreFoCondition[];
    operator: LogicalConditionOperand;
}

export type DaTreFoCondition = DaTreFoOperatorCondition | DaTreFoLogicalCondition;
