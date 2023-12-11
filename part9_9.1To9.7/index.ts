import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises, Result } from './exerciseCalculator';

const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
    const { height, weight } = req.query;
    if (!height || !weight) {
        res.status(400).json({ error: "malformatted parameters" });
        return;
    }
    const heightInCm = Number(height);
    const weightInKg = Number(weight);
    const bmi = calculateBmi(heightInCm, weightInKg);
    
    res.json({ height: heightInCm, weight: weightInKg, bmi });
});

app.post('/exercises', (req, res) => {
    const { daily_exercises, target } = req.body;

    if (!daily_exercises || !target) {
        res.status(400).json({ error: "parameters missing" });
        return;
    }

    const targetInNumber = Number(target);
    const dailyHours = daily_exercises.map((day: string) => Number(day));

    if (isNaN(targetInNumber) || dailyHours.some((day: any) => isNaN(day))) {
        res.status(400).json({ error: "malformatted parameters" });
        return;
    }

    try {
        const result: Result = calculateExercises(dailyHours, targetInNumber);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: 'Unexpected error occurred' });
    }
});

const port = 3002;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
