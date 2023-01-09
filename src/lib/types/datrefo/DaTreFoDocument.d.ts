import type { DaTreFoCondition } from './DaTreFoCondition';
import type { DaTreFoSelection } from './DaTreFoSelection';

export enum FhirResourceType {
    ACCOUNT = 'Account',
    ACTIVITY_DEFINITION = 'ActivityDefinition',
    // ...,
    CONDITION = 'Condition',
    MEDICATION = 'Medication',
    MEDICATION_ADMINISTRATION = 'MedicationAdministration',
    MEDICATION_DISPENSE = 'MedicationDispense',
    OBSERVATION = 'Observation',
    PATIENT = 'Patient',
    PROCEDURE = 'Procedure'
}

type DaTreFoRecursiveSelection = Record<string, DaTreFoSelection | DaTreFoRecursiveSelection>;

export interface DaTreFoDocument extends DaTreFoRecursiveSelection {
    resourceType: FhirResourceType;
    condition?: DaTreFoCondition[];
    excludePatientCondition?: DaTreFoCondition[];
}
