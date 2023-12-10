
import express from "express";
import patientsServices from "../services/patientsServices";
import { toNewPatientEntry } from "../../utils";
import { Patient} from "../../types";
import { EntryWithoutId } from "../../types";



const router = express.Router();

router.get('/', (_req, res) => {
    res.send(patientsServices.getNonSensitivePatients());
});

router.get('/:id', (req, res) => {
  const id = req.params.id;
  try {
    const patient: Patient = patientsServices.getPatientById(id);
    res.send(patient);
  } catch (error) {
    console.log(error);
  }
});

router.post('/:id/entries', (req, res) => {
  const id = req.params.id;
  const patient: Patient = patientsServices.getPatientById(id);
  const newEntry = req.body as EntryWithoutId;

  try {
    const updatedPatient = patientsServices.addEntry(newEntry, patient);
    res.json(updatedPatient);
  } catch (error) { 
    console.log(error);
}
});



router.post('/', (req, res) => {

    try {
        const newPatientEntry = toNewPatientEntry(req.body);
        const addedPatient = patientsServices.addPatient(newPatientEntry);
        res.json(addedPatient);
    } catch (error: unknown) {
        let errorMessage = 'Something went wrong.';
        if (error instanceof Error) {
          errorMessage += ' Error: ' + error.message;
        }
        res.status(400).send(errorMessage);
      }
  
});

export default router;


// import express from "express";
// import diagnosesService from "../services/diagnosesServices";


// const router = express.Router();

// router.get('/' , (_req, res) => {
//     res.send(diagnosesService.getDiagnoses());
// });

// export default router;