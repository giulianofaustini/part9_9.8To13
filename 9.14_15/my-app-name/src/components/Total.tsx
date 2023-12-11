interface TotalProps {
  totalExOfTheCOurse: number;
}

export const Total = ({totalExOfTheCOurse} : TotalProps ): JSX.Element  => {
  return (
    <div>Number of exercises {totalExOfTheCOurse} </div>
  )
}
