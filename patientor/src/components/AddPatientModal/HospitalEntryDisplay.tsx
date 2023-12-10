import { HospitalEntry } from "../../types";

interface HospitalEntryDisplayProps {
    entry: HospitalEntry;
    getDiagnosisInfo: (code: string | undefined) => string | undefined;
    }


export const HospitalEntryDisplay = ( { entry , getDiagnosisInfo} : HospitalEntryDisplayProps  ) => {
  return (
    <div>
         <div style={{backgroundColor:"Azure", border: "1px solid black", borderRadius:"10px", margin:"10px"}} >
            <h2>{entry.type}</h2>
            <h3>Date: {entry.date}</h3>
            <h3>Description: {entry.description}</h3>
            <h3>Diagnosis code:
              {entry.diagnosisCodes && entry.diagnosisCodes.length > 0 ? (
                <ul>
                  {entry.diagnosisCodes.map((code) => (
                    <li key={code}>{getDiagnosisInfo(code)}</li>
                  ))}
                </ul>
              ) : (
                <span>No diagnosis codes</span>
              )}
            </h3>
            <h3>Specialist: {entry.specialist}</h3>
            <h3>Discharge Date: {entry.discharge.date}</h3>
            <h3>Discharge Criteria: {entry.discharge.criteria}</h3>
          </div>
    </div>
  );
};
