import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { HealthCheckEntry, HospitalEntry, OccupationalHealthcareEntry } from "../../types";
import { Patient } from "../../types";
import { Diagnosis } from "../../types";
import diagnosisService from '../../services/diagnosis';
import { HealthCheckEntryDisplay } from "../AddPatientModal/HealthCheckEntryDisplay";
import { HospitalEntryDisplay } from "../AddPatientModal/HospitalEntryDisplay";
import { OccupationalEntryDisplay } from "../AddPatientModal/OccupationalEntryDisplay";

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
         <HealthCheckEntryDisplay entry={entry} getDiagnosisInfo={getDiagnosisInfo} />
        );
      case "Hospital":
        return (
         <HospitalEntryDisplay entry={entry} getDiagnosisInfo={getDiagnosisInfo} />
        );
      case "OccupationalHealthcare":
        return (
         <OccupationalEntryDisplay entry={entry} getDiagnosisInfo={getDiagnosisInfo} />
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
