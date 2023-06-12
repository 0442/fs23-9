interface ExerciseSummary {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: 1 | 2 | 3,
    ratingDescription: 'bad' | 'ok' | 'good',
    target: number,
    average: number,
}

const calculateExercises = (target: number, exerciseHours: number[]): ExerciseSummary => {
    const periodLength: number = exerciseHours.length;
    const trainingDays: number = exerciseHours.reduce((sum,day) => day > 0 ? 1+sum : sum, 0);
    const average: number = exerciseHours.reduce((sum,day) => day+sum, 0) / periodLength;
    const success: boolean = average >= target ? true : false;

    let ratingDescription: 'bad' | 'ok' | 'good';
    let rating : 1 | 2 | 3;
    if (average <= target - 1) {
        ratingDescription = 'bad';
        rating = 1;
    }
    else if (target - 1 < average && average <= target + 1) {
        ratingDescription = 'ok';
        rating = 2;
    }
    else {
        ratingDescription = 'good';
        rating = 3;
    }

    return {
        periodLength,
        trainingDays,
        success,
        rating,
        ratingDescription,
        target,
        average,
    };
};

const parseArguments = (args: string[]): {target: number, exerciseHours: number[]} => {
    if (args.length < 4) throw new Error('Not enough arguments');

    for (const d of args.slice(2)) {
        if (isNaN(Number(d))) {
            throw new Error('Provided values are not numbers');
        }
    }

    return {
        target: Number(args[2]),
        exerciseHours: args.slice(3).map(v => Number(v))
    };
};

try {
    const { target, exerciseHours } = parseArguments(process.argv);
    console.log(calculateExercises(target, exerciseHours));
} catch(error: unknown) {
    if (error instanceof Error) {
        console.log(error.message);
    }
}

export { calculateExercises };