import { useEffect, useState } from 'react';
import patientService from '../../services/patients';
import diagnosisService from '../../services/diagnoses';
import { Diagnosis, Patient } from '../../types';
import { useParams } from 'react-router-dom';

const PatientPage = () => {
    const id = useParams().id;
    const [patient, setPatient] = useState<Patient>();
    const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);

    useEffect(() => {
        if (!id)
            return;

        patientService.getById(id)
            .then((patient) => {
                setPatient(patient);
            });
    }, [id]);

    useEffect(() => {
        diagnosisService.getAll()
            .then((diagnosisList) => {
                setDiagnoses(diagnosisList);
            });
    },[]);

    if (!patient) {
        return <></>;
    }
    return (
        <div>
            <h2>{patient.name}</h2>
            <div>gender: {patient.gender}</div>
            <div>ssn: {patient.ssn}</div>
            <div>occupation: {patient.occupation}</div>

            <h2>entries</h2>
            <div>
                {patient.entries.map(e => {
                    return (
                        <div key={e.id}>
                            <p>{e.date} {e.description}</p>
                            <ul>
                            {e.diagnosisCodes &&
                                e.diagnosisCodes.map(code => {
                                    const diagnosis = diagnoses.find(d => d.code === code);
                                    if (diagnosis) {
                                        return <li key={code}>{diagnosis.code} {diagnosis.name}</li>;
                                    } else {
                                        return(<li key={code}>{code}</li>);
                                    }
                                })
                            }
                            </ul>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default PatientPage;