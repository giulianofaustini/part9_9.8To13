import { NewPatientEntry } from './types';
import { Gender } from './types';


export const parseName = (name: unknown): string => {
    if (!name || !isString(name)){
        throw new Error('Incorrect or missing name: ' + name);
    }
    return name;
};
const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
};

export const parseDateOfBirth = (dateOfBirth: unknown): string => {
    if (!dateOfBirth || !isString(dateOfBirth)){
        throw new Error('Incorrect or missing dateOfBirth: ' + dateOfBirth);
    }
    return dateOfBirth;
};

export const parseSsn = (ssn: unknown): string => {
    if (!ssn || !isString(ssn)){
        throw new Error('Incorrect or missing ssn: ' + ssn);
    }
    return ssn;
};

export const parseGender = (gender: unknown) : Gender => {
    if(!isString(gender) || !isGender(gender)) {
    throw new Error('Incorrect Gender or missing gender: ' + gender );
}
return gender;
};

export const isGender = (param: string) : param is Gender => {
    return Object.values(Gender).map((g) => g.toString()).includes(param);
};



export const parseOccupation = (occupation: unknown): string => {
    if (!occupation || !isString(occupation)){
        throw new Error('Incorrect or missing occupation: ' + occupation);
    }
    return occupation;
};


export const toNewPatientEntry = ( object: unknown): NewPatientEntry => {
    if ( !object || typeof object !== 'object' ) {
        throw new Error('Incorrect or missing data');
      }
    
if('name' in object && 'dateOfBirth' in object && 'ssn' in object && 'gender' in object && 'occupation' in object) {

    const newPatient: NewPatientEntry = {
        name: parseName(object.name),
        dateOfBirth: parseDateOfBirth(object.dateOfBirth),
        ssn: parseSsn(object.ssn),
        gender: parseGender(object.gender as string),
        occupation: parseOccupation(object.occupation)
    };

return newPatient;
}
throw new Error('Incorrect data: some fields are missing');
};

    



