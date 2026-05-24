// Getting elements
const inputValues = document.getElementById("input-values");
const submitBtn = document.getElementById("submit");
const locationOutput = document.getElementById("location-measures");
const spreadOutput = document.getElementById("spread-measures");
const summary = document.getElementById("five-number-summary");

// Other variables
let values; // String
let scores; // List

// Functions
function mean(scoresList) {
    let n = scoresList.length;
    let sum = scoresList.reduce((acc, val) => acc + val, 0);
    let meanValue = sum / n;
    return Number(meanValue.toFixed(2));
}

function median(scoresList) {
    const sorted = scoresList.slice().sort((a, b) => a - b);
    let n = sorted.length;
    let medianValue;
    if (n % 2 === 1) {
        medianValue = sorted[Math.floor(n / 2)];
    } else {
        medianValue = (sorted[n / 2 - 1] + sorted[n / 2]) / 2;
    }
    return Number(medianValue.toFixed(2));
}

function mode(scoresList) {
    // Create an object to store frequency of each value
    const frequency = {};
    let maxFrequency = 0;
    
    // Count frequency of each value
    for (let i = 0; i < scoresList.length; i++) {
        const value = scoresList[i];
        frequency[value] = (frequency[value] || 0) + 1;
        maxFrequency = Math.max(maxFrequency, frequency[value]);
    }
    
    // Find all values with the maximum frequency
    const modes = [];
    for (let key in frequency) {
        if (frequency[key] === maxFrequency) {
            modes.push(Number(Number(key).toFixed(2)));
        }
    }
    
    // Return single mode or array of modes
    return modes.length === 1 ? modes[0] : modes;
}

function min(scoresList) {
    const minimum = Math.min(...scoresList);
    return minimum;
}

function q1(scoresList) {
    // Sort the data
    const sorted = scoresList.slice().sort((a, b) => a - b);
    const n = sorted.length;
    
    // Calculate position of Q1 (25th percentile)
    const position = (n + 1) * 0.25;
    const lower = Math.floor(position) - 1;
    const upper = Math.ceil(position) - 1;
    
    // Interpolate between values if position is not a whole number
    let result;
    if (lower === upper) {
        result = sorted[lower];
    } else {
        const fraction = position - Math.floor(position);
        result = sorted[lower] + fraction * (sorted[upper] - sorted[lower]);
    }
    return Number(result.toFixed(2));
}

function q3(scoresList) {
    // Sort the data
    const sorted = scoresList.slice().sort((a, b) => a - b);
    const n = sorted.length;
    
    // Calculate position of Q3 (75th percentile)
    const position = (n + 1) * 0.75;
    const lower = Math.floor(position) - 1;
    const upper = Math.ceil(position) - 1;
    
    // Interpolate between values if position is not a whole number
    let result;
    if (lower === upper) {
        result = sorted[lower];
    } else {
        const fraction = position - Math.floor(position);
        result = sorted[lower] + fraction * (sorted[upper] - sorted[lower]);
    }
    return Number(result.toFixed(2));
}

function max(scoresList) {
    const maximum = Math.max(...scoresList);
    return maximum;
}

function range(scoresList) {
    const maxVal = Math.max(...scoresList);
    const minVal = Math.min(...scoresList);
    const rangeNumbers = maxVal - minVal;
    return Number(rangeNumbers.toFixed(2));
}

function interquartileRange(scoresList) {
    const q3Value = q3(scoresList);
    const q1Value = q1(scoresList);
    return Number((q3Value - q1Value).toFixed(2));
}

function standardDeviation(scoresList) {
    const meanValue = mean(scoresList);
    let listOfDistances = [];
    for (let i = 0; i < scoresList.length; i++) {
        const distance = (scoresList[i] - meanValue) ** 2;
        listOfDistances.push(distance);
    }
    const sum = listOfDistances.reduce((acc, val) => acc + val, 0);
    const sd = Math.sqrt(sum / listOfDistances.length);
    return Number(sd.toFixed(2));
}

// Event listeners

submitBtn.onclick = () => {
    values = inputValues.value;
    scores = values.split(", ");

    for (let i = 0; i < scores.length; i++) {
        scores[i] = parseInt(scores[i]);
    }

    const meanOfScores = mean(scores);
    const medianOfScores = median(scores);
    const modeOfScores = mode(scores);
    const minOfScores = min(scores);
    const q1OfScores = q1(scores);
    const q3OfScores = q3(scores);
    const maxOfScores = max(scores);
    const rangeOfScores = range(scores);
    const iqrOfScores = interquartileRange(scores);
    const sdOfScores = standardDeviation(scores);

    locationOutput.innerHTML = `<b>Measures of location:</b> <br>
    Mean: ${meanOfScores} <br>
    Median: ${medianOfScores} <br>
    Mode: ${modeOfScores}`;

    spreadOutput.innerHTML = `<b>Measures of spread:</b> <br>
    Range: ${rangeOfScores} <br>
    Interquartile range: ${iqrOfScores} <br>
    Standard deviation: ${sdOfScores}`;

    summary.innerHTML = `<b>Five number summary:</b> <br>
    Minimum: ${minOfScores} <br>
    Q1: ${q1OfScores} <br>
    Q2: ${medianOfScores} <br>
    Q3: ${q3OfScores} <br>
    Maximum: ${maxOfScores}`;
}