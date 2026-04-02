function StudentProfile() {
  const name = "Gowtham Kalli";
  const department = "Computer Science and Engineering";
  const year = 2;
  const section = "A";

  return (
    <div>
      <h1>Student Profile</h1>
      <p>Name: {name}</p>
      <p>Department: {department}</p>
      <p>Year: {year}</p>
      <p>Section: {section}</p>
    </div>
  );
}

export default StudentProfile;
