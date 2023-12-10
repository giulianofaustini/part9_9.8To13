import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  HealthCheckEntry,
  HospitalEntry,
  OccupationalHealthcareEntry,
} from "../../types";
import { Patient } from "../../types";
import { Diagnosis } from "../../types";
import diagnosisService from "../../services/diagnosis";
import { HealthCheckEntryDisplay } from "../AddPatientModal/HealthCheckEntryDisplay";
import { HospitalEntryDisplay } from "../AddPatientModal/HospitalEntryDisplay";
import { OccupationalEntryDisplay } from "../AddPatientModal/OccupationalEntryDisplay";
import { HealthCheckRating } from "../../types";
import axios from "axios";

interface Props {
  patients: Patient[];
  setPatients: React.Dispatch<React.SetStateAction<Patient[]>>;
}

export const SinglePatient: React.FC<Props> = ({ patients }: Props) => {
  const apiBaseUrl = "http://localhost:3000/api";

  const { id } = useParams<{ id: string }>();
  const [diagnosis, setDiagnosis] = useState<Diagnosis[]>([]);
  const [patient, setPatient] = useState<Patient | undefined>();

  //health check
  const [isHealthCheckOpen, setIsHealthCheckOpen] = useState<boolean>(false);
  const [description, setDescription] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [specialist, setSpecialist] = useState<string>("");
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);
  const [healthCheckRating, setHealthCheckRating] = useState<
    HealthCheckRating | undefined
  >(undefined);

  // hospital

  const [isHospitalOpen, setIsHospitalOpen] = useState<boolean>(false);
  const [dischargeDate, setDischargeDate] = useState<string>("");
  const [dischargeCriteria, setDischargeCriteria] = useState<string>("");

// occupational

const [isOccupationalOpen, setIsOccupationalOpen] =  useState<boolean>(false);
const [employerName, setEmployerName] = useState<string>("");
const [sickLeaveStartDate, setSickLeaveStartDate] = useState<string>("");
const [sickLeaveEndDate, setSickLeaveEndDate] = useState<string>("");


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
    return foundDiagnosis
      ? `${foundDiagnosis.code}: ${foundDiagnosis.name}`
      : code;
  };

  const renderEntryDetails = (
    entry: HealthCheckEntry | HospitalEntry | OccupationalHealthcareEntry
  ) => {
    switch (entry.type) {
      case "HealthCheck":
        return (
          <HealthCheckEntryDisplay
            entry={entry}
            getDiagnosisInfo={getDiagnosisInfo}
          />
        );
      case "Hospital":
        return (
          <HospitalEntryDisplay
            entry={entry}
            getDiagnosisInfo={getDiagnosisInfo}
          />
        );
      case "OccupationalHealthcare":
        return (
          <OccupationalEntryDisplay
            entry={entry}
            getDiagnosisInfo={getDiagnosisInfo}
          />
        );
      default:
        return null;
    }
  };

  const handleOccupationalCheckSubmit = async () => {
    const newOccupationalHealthcareEntry = {
      type: "OccupationalHealthcare",
      description,
      date,
      specialist,
      diagnosisCodes,
      employerName,
      sickLeave: {
        startDate: sickLeaveStartDate,
        endDate: sickLeaveEndDate,
      },
    };
    try {
      const response = await axios.post(
        `${apiBaseUrl}/patients/${id}/entries`,
        newOccupationalHealthcareEntry
      );
      const addEntry = response.data;

      setPatient((prevPatient) => {
        if (!prevPatient) return prevPatient;
        return {
          ...prevPatient,
          entries: [...prevPatient.entries, addEntry],
        };
      });
    } catch (error) {
      console.log("Error adding new entry", error);
    }
    setIsOccupationalOpen(false);
  };

  const handleHospitalSubmit = async () => {
    const newHospitalEntry = {
      type: "Hospital",
      description,
      date,
      specialist,
      diagnosisCodes,
      discharge: {
        date: dischargeDate,
        criteria: dischargeCriteria,
      },
    };
    try {
      const response = await axios.post(
        `${apiBaseUrl}/patients/${id}/entries`,
        newHospitalEntry
      );
      const addEntry = response.data;

      setPatient((prevPatient) => {
        if (!prevPatient) return prevPatient;
        return {
          ...prevPatient,
          entries: [...prevPatient.entries, addEntry],
        };
      });
    } catch (error) {
      console.log("Error adding new entry", error);
    }
    setIsHospitalOpen(false);
  };

  const handleHealthCheckSubmit = async () => {
    const newHealthCheckEntry = {
      type: "HealthCheck",
      description,
      date,
      specialist,
      diagnosisCodes,
      healthCheckRating,
    };
    try {
      if(healthCheckRating !== 0 && healthCheckRating !== 1 && healthCheckRating !== 2 && healthCheckRating !== 3  ) {
        alert("Health check rating must be 0 (healthy), 1 (low-risk), 2(hight-risk), or 3(critical)");
        return;
      }

      const response = await axios.post(
        `${apiBaseUrl}/patients/${id}/entries`,
        newHealthCheckEntry
      );
      const addEntry = response.data;

      setPatient((prevPatient) => {
        if (!prevPatient) return prevPatient;
        return {
          ...prevPatient,
          entries: [...prevPatient.entries, addEntry],
        };
      });
    } catch (error) {
      console.log("Error adding new entry", error);
    }
    setIsHealthCheckOpen(false);
  };

  if (isHealthCheckOpen) {
    return (
      <div>
        <h1>Health Check</h1>
        <form onSubmit={handleHealthCheckSubmit}>
          <div>
            <label>date</label>
            <input
              type="text"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <div>
            <label>description</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div>
            <label>specialist</label>
            <input
              type="text"
              value={specialist}
              onChange={(e) => setSpecialist(e.target.value)}
            />
          </div>
          <div>
            <label>diagnosisCodes</label>
            <input
              type="text"
              value={diagnosisCodes.join(", ")}
              onChange={(e) =>
                setDiagnosisCodes((e.target.value as string).split(", "))
              }
            />
          </div>
          <div>
            <label>healthCheckRating</label>
            <input
              type="text"
              value={healthCheckRating ? healthCheckRating.toString() : ""}
              onChange={(e) => {
                const value = e.target.value.trim();
                setHealthCheckRating(
                  value !== ""
                    ? (parseInt(value, 10) as HealthCheckRating)
                    : undefined
                );
              }}
            />
          </div>
          <button>submit</button>
        </form>
      </div>
    );
  }


  if (isHospitalOpen) {
    return (
      <div>
        <h1>Hospitalization details</h1>
        <form onSubmit={handleHospitalSubmit}>
          <div>
            <label>date</label>
            <input
              type="text"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <div>
            <label>description</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div>
            <label>specialist</label>
            <input
              type="text"
              value={specialist}
              onChange={(e) => setSpecialist(e.target.value)}
            />
          </div>
          <div>
            <label>diagnosisCodes</label>
            <input
              type="text"
              value={diagnosisCodes.join(", ")}
              onChange={(e) =>
                setDiagnosisCodes((e.target.value as string).split(", "))
              }
            />
          </div>
          <div>
          <label>discharge date</label>
          <input
            type="text"
            value={dischargeDate}
            onChange={(e) => setDischargeDate(e.target.value)}
          />
        </div>
        <div>
          <label>discharge criteria</label>
          <input
            type="text"
            value={dischargeCriteria}
            onChange={(e) => setDischargeCriteria(e.target.value)}
          />
        </div>
          <button>submit</button>
        </form>
      </div>
    );
  }





  if (isOccupationalOpen) {
    return (
      <div>
        <h1>Occupational check details</h1>
        <form onSubmit={handleOccupationalCheckSubmit}>
          <div>
            <label>date</label>
            <input
              type="text"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <div>
            <label>description</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div>
            <label>specialist</label>
            <input
              type="text"
              value={specialist}
              onChange={(e) => setSpecialist(e.target.value)}
            />
          </div>
          <div>
            <label>diagnosisCodes</label>
            <input
              type="text"
              value={diagnosisCodes.join(", ")}
              onChange={(e) =>
                setDiagnosisCodes((e.target.value as string).split(", "))
              }
            />
          </div>
          <div>
          <label>employer name</label>
          <input
            type="text"
            value={employerName}
            onChange={(e) => setEmployerName(e.target.value)}
          />
        </div>
        <div>
          <label>sick leave start date</label>
          <input
            type="text"
            value={sickLeaveStartDate}
            onChange={(e) => setSickLeaveStartDate(e.target.value)}
          /> 
        </div>
        <div>
          <label>sick leave end date</label>
          <input
            type="text"
            value={sickLeaveEndDate}
            onChange={(e) => setSickLeaveEndDate(e.target.value)}
          />
        </div>
          <button>submit</button>
        </form>
      </div>
    );
  }



  return (
    <div>
      <div>
        <button onClick={() => setIsHealthCheckOpen(true)}>
          {" "}
          Add Health check Entry{" "}
        </button>
        <button onClick={() => setIsHospitalOpen(true)} > Add Hospitalization Entry </button>
        <button onClick={() => setIsOccupationalOpen(true)} > Add occupational Health Check Entry </button>
      </div>
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
