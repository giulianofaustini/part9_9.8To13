
import Part from "./Part";
import { CoursePart } from "../App";

interface ContentProps {
  
  partsOfTheCourse: CoursePart[]
}


export const Content = ({partsOfTheCourse} : ContentProps) : JSX.Element   => {
  return (
    <div>
      {partsOfTheCourse.map((part) => (
        <div key={part.name}>
          <Part coursePart={part} /> 
        </div>
      ))}
    
    </div>
  )
}


