const student = {
    id: 101,
    name: "Varsha",
    department: "BDes",
    marks: 92
};

const { id, name, department, marks } = student;

console.log(`${id} ${name} ${department} ${marks}`);

const updatedStudent = {
    ...student,
    grade: marks > 90 ? 'A' : 'B'
};

console.log(updatedStudent);