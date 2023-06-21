import { Patient, NonSensitivePatient} from "../types";
import patients from "../../data/patients";
import { v1 as uuid } from 'uuid';
import { toNewPatient }  from '../utils';

const getPatientsWithoutSsn = (): NonSensitivePatient[] => {
    return patients.map(({id, name, dateOfBirth, gender, occupation, entries}) => {
        return {
            id,
            name,
            dateOfBirth,
            gender,
            occupation,
            entries
        };
    });
};

const getPatientById = (id: string): Patient | undefined => {
    const patient = patients.find(p => p.id === id);
    return patient;
};

const addPatient = (newPatient: unknown): Patient=> {
    const validNewPatient = toNewPatient(newPatient);
    const patient: Patient = {...validNewPatient, id: uuid()};
    return patient;
};

export default {
    getPatientsWithoutSsn,
    addPatient,
    getPatientById
};