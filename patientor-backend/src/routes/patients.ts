import express from "express";
import patientService from "../services/patientService";

const router = express.Router();

router.get('/', (_req, res) => {
    const patients = patientService.getPatientsWithoutSsn();
    return res.status(200).json(patients);
});

router.post('/', (req, res) => {
    const patient = patientService.addPatient(req.body);
    return res.status(200).json(patient);
});

export default router;

