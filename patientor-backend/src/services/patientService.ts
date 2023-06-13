import { Patient, PatientNoSsn } from "../types";
import patients from "../../data/patients";
import { v1 as uuid } from 'uuid';
import { toNewPatient }  from '../utils';

const getPatientsWithoutSsn = (): PatientNoSsn[] => {
    return patients.map(({id, name, dateOfBirth, gender, occupation}) => {
        return {
            id,
            name,
            dateOfBirth,
            gender,
            occupation
        };
    });
};

const addPatient = (newPatient: unknown): Patient=> {
    const validNewPatient = toNewPatient(newPatient);
    const patient: Patient = {...validNewPatient, id: uuid()};
    return patient;
};

export default {
    getPatientsWithoutSsn,
    addPatient
};