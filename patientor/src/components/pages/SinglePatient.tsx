import { Params } from "react-router-dom";
import { useParams } from "react-router-dom";

import { Patient } from "../../types";

interface Props {
  patients: Patient[];
  setPatients: React.Dispatch<React.SetStateAction<Patient[]>>;
}

export const SinglePatient = ({ patients }: Props) => {
  const { id } = useParams<Params>();

  const patient = patients.find((p) => p.id === id);

  console.log(patient);

  return (
    <div>
      {patient && (
        <div>
          <h1> Patient: {patient.name} / {patient.gender} </h1>
          <h3> Date of Birth: {patient.dateOfBirth} </h3>
          <h3> Ocuupation: {patient.occupation} </h3>
          <div></div>
        </div>
      )}
    </div>
  );
};
