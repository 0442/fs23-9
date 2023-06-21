export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other"
}


interface BaseEntry {
    id: string,
    description: string,
    date: string,
    specialist: string,
    diagnosisCodes?: Array<Diagnosis['code']>,
}

interface OccupationalHealthcareEntry extends BaseEntry {
    type: 'OccupationalHealthcare',
    sickLeave?: { startDate: string, endDate: string },
    employerName?: string
}

interface HospitalEntry extends BaseEntry {
    type: 'Hospital',
    discharge: { date: string, criteria: string }
}

export enum healthCheckRating {
    "Healthy" = 0,
    "LowRisk" = 1,
    "HighRisk" = 2,
    "CriticalRisk" = 3
}

interface HealthCheckEntry extends BaseEntry {
    type: 'HealthCheck';
    healthCheckRating: healthCheckRating;
}

export type Entry =
    | OccupationalHealthcareEntry
    | HospitalEntry
    | HealthCheckEntry;

export interface Patient {
  id: string;
  name: string;
  occupation: string;
  gender: Gender;
  ssn?: string;
  dateOfBirth?: string;
  entries: Entry[];
}
export type PatientFormValues = Omit<Patient, "id" | "entries">;