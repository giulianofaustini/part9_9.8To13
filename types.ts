export interface Diagnosis {
    code: string,
    name: string,
    latin?: string
}

export enum Gender {
    Male = "male",
    Female = "female",
    Other = "other"
}

export interface Entry {
    entry: string
}

export interface Patient {
id: string,
name: string,
dateOfBirth: string,
ssn: string,
gender: Gender,
occupation: string
entries: Entry[]
}


export type NonSensitivePatient = Omit<Patient, 'ssn' | 'entries'>;

export type NewPatientEntry = Omit<Patient, 'id'>;

