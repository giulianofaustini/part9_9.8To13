interface CourseName {
  nameOfTheCourse: string;
}

export const Header = ({ nameOfTheCourse }: CourseName): JSX.Element => {
  return (
    <div>
      <h1>{nameOfTheCourse}</h1>
    </div>
  );
};
