import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { HealthCheckEntry, HospitalEntry, OccupationalHealthcareEntry } from "../../types";
import { Patient } from "../../types";
import { Diagnosis } from "../../types";
import diagnosisService from '../../services/diagnosis';

interface Props {
  patients: Patient[];
  setPatients: React.Dispatch<React.SetStateAction<Patient[]>>;
}
export const SinglePatient: React.FC<Props> = ({ patients }: Props) => {
  const { id } = useParams<{ id: string }>();
  const [diagnosis, setDiagnosis] = useState<Diagnosis[]>([]);
  const [patient, setPatient] = useState<Patient | undefined>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const diagnosisData = await diagnosisService.getAllDiagnosis();
        setDiagnosis(diagnosisData);
      } catch (error) {
        console.error("Error fetching diagnosis data", error);
      }

      const selectedPatient = patients.find((p) => p.id === id);
      setPatient(selectedPatient);
    };

    void fetchData();
  }, [id, patients]);

  const getDiagnosisInfo = (code: string | undefined) => {
    const foundDiagnosis = diagnosis.find((d) => d.code === code);
    return foundDiagnosis ? `${foundDiagnosis.code}: ${foundDiagnosis.name}` : code;
  };


  const renderEntryDetails = (entry: HealthCheckEntry | HospitalEntry | OccupationalHealthcareEntry) => {
    switch (entry.type) {
      case "HealthCheck":
        return (
          <div>
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
            <h3>Health Check Rating: {entry.healthCheckRating}</h3>
          </div>
        );
      case "Hospital":
        return (
          <div>
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
        );
      case "OccupationalHealthcare":
        return (
          <div>
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
        );
      default:
        return null;
    }
  };

  return (
    <div>
      {patient && (
        <div>
          <h1>
            Patient: {patient.name} / {patient.gender}
          </h1>
          <h3>Date of Birth: {patient.dateOfBirth}</h3>
          <h3>Occupation: {patient.occupation}</h3>
          <div>
            {patient.entries.map((entry) => (
              <div key={entry.id}>
                <h3>{renderEntryDetails(entry)}</h3>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
