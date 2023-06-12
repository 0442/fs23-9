const calculateBmi = (height: number, weight: number): string => {
    height = height / 100;
    const bmi:number = weight / (height**2);

    let bmiString = "";

    if (bmi < 18.5 ) {
        bmiString += "Underweight";
        if (bmi < 16) {
            bmiString += "(Severe thinness)";
        } else if (bmi < 17) {
            bmiString += "(Moderate thinness)";
        } else {
            bmiString += "(Mild thinness)";
        }

    } else if ( 18.5 <= bmi && bmi < 25 ) {
        bmiString += "Normal (healthy weight)";

    } else if ( 25 <= bmi && bmi < 30 ) {
        bmiString += "Overweight (Pre-obese)";

    } else if ( 30 <= bmi ) {
        bmiString += "Obese";
        if (bmi < 35) {
            bmiString += "(Class I)";
        } else if (bmi < 40) {
            bmiString += "(Class II)";
        } else {
            bmiString += "(Class III)";
        }
    }

    return bmiString;
};

const parseArguments = (args: string[]): {height: number, weight: number} => {
    if (args.length < 4) throw new Error('Not enough arguments');
    if (args.length > 4) throw new Error('Too many arguments');

    if (isNaN(Number(args[2])) && isNaN(Number(args[3]))) {
       throw new Error('Provided values are not numbers');
    }

    return {
        height: Number(args[2]),
        weight: Number(args[3])
    };
};

try {
    const { height, weight } = parseArguments(process.argv);
    console.log(calculateBmi(height, weight));
} catch(error: unknown) {
    if (error instanceof Error) {
        console.log(error.message);
    }
}

export { calculateBmi };