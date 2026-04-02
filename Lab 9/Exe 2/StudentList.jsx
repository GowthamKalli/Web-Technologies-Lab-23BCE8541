import StudentCard from './StudentCard';

function StudentList() {
  return (
    <div>
      <h1>Student Cards</h1>
      <StudentCard name="Gowtham Kalli" department="Computer Science and Engineering" marks={92} />
      <StudentCard name="Arun Kumar" department="Electronics and Communication Engineering" marks={85} />
      <StudentCard name="Priya Sharma" department="Mechanical Engineering" marks={78} />
    </div>
  );
}

export default StudentList;
