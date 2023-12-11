
export interface BmiResult {
  height: number;
  weight: number;
  predictionOnCondition: string;
}

export const calculateBmi = (height: number, weight: number): string => {
  const bmi = weight / ((height / 100) ** 2);

  if (bmi < 18.5) {
      return 'Underweight';
  } else if (bmi >= 18.5 && bmi < 25) {
      return 'Normal (healthy weight)';
  } else if (bmi >= 25 && bmi < 30) {
      return 'Overweight';
  } else {
      return 'Overweight or Obese';
  }
};

const height = 175; // Provide the height directly in the code
const weight = 70; // Provide the weight directly in the code

const predictionOnCondition = calculateBmi(height, weight);
console.log(`The BMI result of height ${height} and weight ${weight} is: ${predictionOnCondition}`);



// interface BmiResult {
//     height: number;
//     weight: number;
//     predictionOnCondition: string;
// }

// const calculateBmi = (height: number, weight: number): BmiResult => {
//     const bmi = height / (weight / 100 * 2);
//     if (bmi < 18.5) {
//         return {height, weight, predictionOnCondition: "Underweight"}
//     } else if (bmi >= 18.5 || bmi < 25) {
//         return {height, weight, predictionOnCondition: "Normal (healthy weight)" };
//     } else if (bmi >= 25 || bmi < 30) {
//         return {height, weight, predictionOnCondition: "Pre-obese"};
//     } else if (bmi <= 30) {
//         return {height, weight, predictionOnCondition: "Overweight"};
//     } else {
//         return {height, weight, predictionOnCondition: "Obese"};
//     }
// }

// const height = Number(process.argv[2]);
// const weight = Number(process.argv[3]);


//  const result = calculateBmi(180, 74);
//  console.log(result);



// interface BmiResult {
//     height: number;
//     weight: number;
//     predictionOnCondition: string;
//   }
  
//   const parseArguments = (args: string[]): BmiResult => {
//     if (args.length !== 4) {
//       throw new Error('Incorrect number of arguments. You should provide exactly two values: height and weight.');
//     }
  
//     const height = Number(args[2]);
//     const weight = Number(args[3]);
  
//     if (!isNaN(height) && !isNaN(weight)) {
//       return {
//         height,
//         weight,
//         predictionOnCondition: calculateBmi(height, weight)
//       };
//     } else {
//       throw new Error('Provided values were not numbers!');
//     }
//   };
  
// export const calculateBmi = (height: number, weight: number): string => {
//   const bmi = weight / ((height / 100) ** 2);

//   if (bmi < 18.5) {
//     return 'Underweight';
//   } else if (bmi >= 18.5 && bmi < 25) {
//     return 'Normal (healthy weight)';
//   } else if (bmi >= 25 && bmi < 30) {
//     return 'Overweight';
//   } else {
//     return 'Overweight or Obese';
//   }
// };

//   try {
//     const { height, weight, predictionOnCondition } = parseArguments(process.argv);
//     console.log(`The BMI result of height ${height} and weight ${weight} is: ${predictionOnCondition}`);
//   } catch (error: unknown) {
//     let errorMessage = 'Something bad happened.';
//     if (error instanceof Error) {
//       errorMessage += ' Error: ' + error.message;
//     }
//     console.log(errorMessage);
//   }
  