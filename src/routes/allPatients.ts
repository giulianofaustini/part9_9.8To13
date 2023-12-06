/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express from "express";
import patientsServices from "../services/patientsServices";


const router = express.Router();

router.get('/', (_req, res) => {
    res.send(patientsServices.getNonSensitivePatients());
});


router.post('/', (req, res) => {
    const {  name , dateOfBirth , ssn , gender , occupation } = req.body;
    const addedPatient = patientsServices.addPatient({
        name, 
        dateOfBirth,
        ssn,
        gender,
        occupation
    });
    res.json(addedPatient);
});

export default router;




// import express from "express";
// import diagnosesService from "../services/diagnosesServices";


// const router = express.Router();

// router.get('/' , (_req, res) => {
//     res.send(diagnosesService.getDiagnoses());
// });

// export default router;