

import { HealthCheckEntry } from "../../types";

interface HealthCheckEntryProps {
  entry: HealthCheckEntry;
  getDiagnosisInfo: (code: string | undefined) => string | undefined;
}


export const HealthCheckEntryDisplay = ({ entry , getDiagnosisInfo }: HealthCheckEntryProps  ) => {
  return (
    <div>
        <div style={{backgroundColor:"whitesmoke", border: "1px solid black", borderRadius:"10px", margin:"10px"}}>
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
            <h3>Health Check Rating: {entry.healthCheckRating}</h3>
          </div>
        



    </div>
  );
};




