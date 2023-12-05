import data from '../data/DiagnosisData';
import { Diagnosis } from '../../types';

const getDiagnoses = (): Diagnosis[] => {
    return data;
};


export default {
    getDiagnoses
};