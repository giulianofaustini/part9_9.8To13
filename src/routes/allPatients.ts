
import express from "express";
import patientsServices from "../services/patientsServices";
import { toNewPatientEntry } from "../../utils";


const router = express.Router();

router.get('/', (_req, res) => {
    res.send(patientsServices.getNonSensitivePatients());
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