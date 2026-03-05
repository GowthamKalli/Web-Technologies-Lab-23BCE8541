use('student-notes')

db.notes.insertOne({
  title: "Test Note from VS Code Playground",
  subject: "MongoDB & VS Code",
  description: "Just checking that everything is wired up correctly!",
  created_date: new Date()
});

db.notes.find().pretty();
