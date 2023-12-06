import patientsData from '../data/PatientsData';

import { NonSensitivePatient, Patient , NewPatientEntry } from '../../types';
import { v1 as uuid } from 'uuid';

const getPatients = (): Patient[] => {
    return patientsData;
};

const getNonSensitivePatients = (): NonSensitivePatient[] => {
    return patientsData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
    }));
};

const addPatient = ( entry: NewPatientEntry ): Patient[] => {

        const newPatientEntry = {   
            id: uuid(),
         ...entry
        }; 
        patientsData.push(newPatientEntry);
        return patientsData;
};
     
export default {
    getPatients,
    getNonSensitivePatients,
    addPatient
};



