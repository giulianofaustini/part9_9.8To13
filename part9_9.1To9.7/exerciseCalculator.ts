// REQUEST SENT IN POSTMAN: http://localhost:3002/exercises

export interface Result {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}


export const calculateExercises = (dailyHours: number[] , target: number) : Result => {
    const periodLength = dailyHours.length;
    console.log(periodLength);
    const trainingDays = dailyHours.filter(day => day > 0).length;
    console.log(trainingDays);
    const average = dailyHours.reduce((a, b) => a + b) / periodLength;
    console.log(average);
    const success = average >= target;
    console.log(success);
    const rating = average < target ? 1 : average > target ? 3 : 2;
    const ratingDescription = rating === 1 ? "not too bad but could be better" : rating === 2 ? "You are doing great" : "You are doing amazing"; 




    return {
        periodLength,
        trainingDays,
        success,
        rating,
        ratingDescription,
        target,
        average
    };
};





// export interface Result {
//     periodLength: number;
//     trainingDays: number;
//     success: boolean;
//     rating: number;
//     ratingDescription: string;
//     target: number;
//     average: number;
// }


// export const calculateExercises = (dailyHours: number[] , target: number) : Result => {
//     const periodLength = dailyHours.length;
//     console.log(periodLength);
//     const trainingDays = dailyHours.filter(day => day > 0).length;
//     console.log(trainingDays);
//     const average = dailyHours.reduce((a, b) => a + b) / periodLength;
//     console.log(average);
//     const success = average >= target;
//     console.log(success);
//     const rating = average < target ? 1 : average > target ? 3 : 2;
//     const ratingDescription = rating === 1 ? "not too bad but could be better" : rating === 2 ? "You are doing great" : "You are doing amazing"; 




//     return {
//         periodLength,
//         trainingDays,
//         success,
//         rating,
//         ratingDescription,
//         target,
//         average
//     };
// };

// const target = Number(process.argv[2]);
// const dailyHours = process.argv.slice(3).map(day => Number(day));

// if (isNaN(target) || dailyHours.find(day => isNaN(day) !== undefined)) {
//     console.log('Provide a daily amount of hours as a number');
//     process.exit(1);
// }


// const resultInApp = calculateExercises(dailyHours , target);

// console.log(resultInApp);


