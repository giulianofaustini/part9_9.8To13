import { Content } from './components/Content';
import { Header } from './components/Header'; 
import { Total } from './components/Total';

export interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

export interface CoursePartBaseWithDescription extends CoursePartBase {
  description: string;
}

export interface CoursePartBasic extends CoursePartBase , CoursePartBaseWithDescription {
  
  kind: "basic"
}

export interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: "group"
}

export interface CoursePartBackground extends CoursePartBase , CoursePartBaseWithDescription{
 
  backgroundMaterial: string;
  kind: "background"
}

export interface CoursePartSpecial extends CoursePartBase , CoursePartBaseWithDescription {
  requirements: string[];
  kind: "special"
}

export type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackground | CoursePartSpecial ;

const App = () => {
  const courseName = "Half Stack application development";
  

  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is an awesome course part",
      kind: "basic"
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3,
      kind: "group"
    },
    {
      name: "Basics of type Narrowing",
      exerciseCount: 7,
      description: "How to go from unknown to string",
      kind: "basic"
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      backgroundMaterial: "https://type-level-typescript.com/template-literal-types",
      kind: "background"
    },
    {
      name: "TypeScript in frontend",
      exerciseCount: 10,
      description: "a hard part",
      kind: "basic",
    },
    {
      name: "Backend development",
      exerciseCount: 21,
      description: "Typing the backend",
      requirements: ["nodejs ", " jest"],
      kind: "special"
    },
  ];





  const totalExercises = courseParts.reduce((sum, part) => sum + part.exerciseCount, 0);

  return (
    <div>
      <Header nameOfTheCourse={courseName} />
      <Content partsOfTheCourse={courseParts} />
      <Total totalExOfTheCOurse={totalExercises} />
      
    </div>
  );
};

export default App









// part 9 . 14

// import { Content } from './components/Content';
// import { Header } from './components/Header'; 
// import { Total } from './components/Total';


// const App = () => {
//   const courseName = "Half Stack application development";
//   const courseParts = [
//     {
//       name: "Fundamentals",
//       exerciseCount: 10
//     },
//     {
//       name: "Using props to pass data",
//       exerciseCount: 7
//     },
//     {
//       name: "Deeper type usage",
//       exerciseCount: 14
//     }
//   ];

//   const totalExercises = courseParts.reduce((sum, part) => sum + part.exerciseCount, 0);

//   return (
//     <div>
//       <Header nameOfTheCourse={courseName} />
//       <Content partsOfTheCourse={courseParts} />
//       <Total totalExOfTheCOurse={totalExercises} />
      
//     </div>
//   );
// };

// export default App
