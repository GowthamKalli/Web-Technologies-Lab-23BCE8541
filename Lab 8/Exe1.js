const studentName = "Gowtham";
const marks = [95, 90, 98];
const calculateAverage = (marksArray) => {
    let total = 0;
    marksArray.forEach(mark => total += mark);
    return (total / marksArray.length).toFixed(2);
};

let totalMarks = marks.reduce((acc, curr) => acc + curr, 0);
let averageMarks = calculateAverage(marks);

console.log(`Student Name: ${studentName}`);
console.log(`Average Marks: ${averageMarks}`);