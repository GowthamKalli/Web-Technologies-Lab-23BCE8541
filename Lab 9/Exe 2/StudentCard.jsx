function StudentCard(props) {
  return (
    <div>
      <p>Name: {props.name}</p>
      <p>Department: {props.department}</p>
      <p>Marks: {props.marks}</p>
    </div>
  );
}

export default StudentCard;
