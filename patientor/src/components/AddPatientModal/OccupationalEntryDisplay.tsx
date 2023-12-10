import { OccupationalHealthcareEntry } from "../../types";

interface OccupationalEntryDisplayProps {
    entry: OccupationalHealthcareEntry;
    getDiagnosisInfo: (code: string | undefined) => string | undefined;
    }


export const OccupationalEntryDisplay = ( { entry, getDiagnosisInfo} : OccupationalEntryDisplayProps ) => {
  return (
    <div>
         <div style={{backgroundColor:"LavenderBlush", border: "1px solid black", borderRadius:"10px", margin:"10px"}}>
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
            <h3>Employer: {entry.employerName}</h3>
            {entry.sickLeave && (
              <div>
                <h3>Sick Leave Start Date: {entry.sickLeave.startDate}</h3>
                <h3>Sick Leave End Date: {entry.sickLeave.endDate}</h3>
              </div>
            )}
          </div>


    </div>
  );
};

