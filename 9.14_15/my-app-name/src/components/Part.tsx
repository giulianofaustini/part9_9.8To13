import { CoursePart } from '../App';

interface PartProps {
  coursePart: CoursePart;
}

export const Part = ({ coursePart }: PartProps): JSX.Element => {

    const assertNever = (value: never): never => {
        throw new Error(
          `Unhandled discriminated union member: ${JSON.stringify(value)}`
        );
      };

  switch (coursePart.kind) {
    case "basic":
      return (
        <div>
          <h2>{coursePart.name} {coursePart.exerciseCount}</h2>
          <h4>{coursePart.description}</h4>
        </div>
      );
    case "group":
      return (
        <div>
          <h2>{coursePart.name} {coursePart.exerciseCount}</h2>
          <h4>Group Project Count: {coursePart.groupProjectCount}</h4>
        </div>
      );
    case "background":
      return (
        <div>
          <h2>{coursePart.name} {coursePart.exerciseCount}</h2>
          <h4>{coursePart.description}</h4>
          <h4>Background Material: {coursePart.backgroundMaterial}</h4>
        </div>
      );
      case "special":
        return (
          <div>
            <h2>{coursePart.name} {coursePart.exerciseCount}</h2>
            <h4>{coursePart.description}</h4>
            <h4>Requirements: {coursePart.requirements}</h4>
          </div>
        );
    default:
     return assertNever(coursePart);
  }
};

export default Part;


