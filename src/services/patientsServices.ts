import patientsData from '../data/PatientsData';

import { NonSensitivePatient, Patient , NewPatientEntry, EntryWithoutId } from '../../types';
import { v1 as uuid } from 'uuid';

const getPatients = (): Patient[] => {
    return patientsData;
};
const getPatientById = (id: string): Patient => {
  
    const patient = patientsData.find((p) => p.id === id);
  
    if (!patient) {
      throw new Error(`Patient with id ${id} not found`);
    }
  
    return patient;
  };
  

const getNonSensitivePatients = (): NonSensitivePatient[] => {
    return patientsData.map(({ id, name, ssn ,  dateOfBirth, gender, occupation , entries }) => ({
        id,
        name,
        ssn,
        dateOfBirth,
        gender,
        occupation,
        entries
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

const addEntry = (entry: EntryWithoutId, patient: Patient): Patient => {
    const newEntry = {
      id: uuid(),
      ...entry
    };
    patient.entries.push(newEntry);
    return patient;
  };
     
export default {
    getPatients,
    getNonSensitivePatients,
    addPatient,
    getPatientById,
    addEntry
};



