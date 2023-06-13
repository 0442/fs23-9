import { NewPatient, Gender } from "./types";

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};

const isGender = (gender: string): gender is Gender => {
    return Object.values(Gender).map(v => v.toString()).includes(gender);
};

const parseName = (name: unknown): string => {
    if (!name || !isString(name)) {
        throw new Error('Invalid name');
    }
    return name;
};

const parseDateOfBirth = (date: unknown): string => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error('Invalid date of birth');
    }
    return date;
};

const parseGender = (gender: unknown): Gender => {
    if (!gender || !isString(gender) || !isGender(gender)) {
        throw new Error('Invalid gender');
    }
    return gender;
};

const parseSsn = (ssn: unknown): string => {
    if (!ssn || !isString(ssn)) {
        throw new Error('Invalid ssn');
    }
    return ssn;
};

const parseOccupation = (occupation: unknown): string => {
    if (!occupation || !isString(occupation)) {
        throw new Error('Invalid occupation');
    }
    return occupation;
};

const toNewPatient = (object: unknown): NewPatient => {
    if (!object || typeof object !== 'object') {
        throw new Error('Missing data');
    }

    if ('name' in object && 'dateOfBirth' in object && 'gender' in object && 'ssn' in object && 'occupation' in object) {
        const newPatient: NewPatient = {
            name: parseName(object.name),
            dateOfBirth: parseDateOfBirth(object.dateOfBirth),
            gender: parseGender(object.gender),
            ssn: parseSsn(object.ssn),
            occupation: parseOccupation(object.occupation)
        };

        return newPatient;
    }

    throw new Error('Incorrect or missing data');
};

export { toNewPatient };