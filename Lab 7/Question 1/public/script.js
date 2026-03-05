const noteForm = document.getElementById('noteForm');
const titleInput = document.getElementById('title');
const subjectInput = document.getElementById('subject');
const descInput = document.getElementById('description');
const noteIdInput = document.getElementById('noteId');
const submitBtn = document.getElementById('submitBtn');
const cancelBtn = document.getElementById('cancelBtn');
const notesList = document.getElementById('notesList');

async function fetchNotes() {
  try {
    const res = await fetch('/api/notes');
    const notes = await res.json();
    renderNotes(notes);
  } catch (err) {
    console.error('Error fetching notes:', err);
  }
}

function renderNotes(notes) {
  notesList.innerHTML = '';
  notes.forEach(note => {
    const date = new Date(note.created_date).toLocaleDateString();
    const card = document.createElement('div');
    card.className = 'note-card';
    card.innerHTML = `
      <h3>${note.title}</h3>
      <div class="subject">${note.subject}</div>
      <div class="date">Created: ${date}</div>
      <p>${note.description.replace(/\n/g, '<br>')}</p>
      <div class="note-actions">
        <button class="edit-btn" onclick="editNote('${note._id}', '${note.title.replace(/'/g,"\\'")}', '${note.subject.replace(/'/g,"\\'")}', '${note.description.replace(/'/g,"\\'")}')">Edit</button>
        <button class="delete-btn" onclick="deleteNote('${note._id}')">Delete</button>
      </div>
    `;
    notesList.appendChild(card);
  });
}

noteForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const noteData = {
    title: titleInput.value.trim(),
    subject: subjectInput.value.trim(),
    description: descInput.value.trim()
  };

  const id = noteIdInput.value;

  try {
    let res;
    if (id) {
      res = await fetch(`/api/notes/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(noteData)
      });
    } else {
      res = await fetch('/api/notes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(noteData)
      });
    }

    if (res.ok) {
      noteForm.reset();
      noteIdInput.value = '';
      submitBtn.textContent = 'Add Note';
      cancelBtn.style.display = 'none';
      fetchNotes();
    } else {
      alert('Error saving note');
    }
  } catch (err) {
    console.error(err);
    alert('Network error');
  }
});

cancelBtn.addEventListener('click', () => {
  noteForm.reset();
  noteIdInput.value = '';
  submitBtn.textContent = 'Add Note';
  cancelBtn.style.display = 'none';
});

window.editNote = function(id, title, subject, description) {
  noteIdInput.value = id;
  titleInput.value = title;
  subjectInput.value = subject;
  descInput.value = description;
  submitBtn.textContent = 'Update Note';
  cancelBtn.style.display = 'inline-block';
  window.scrollTo(0, 0);
};

window.deleteNote = async function(id) {
  if (!confirm('Are you sure you want to delete this note?')) return;

  try {
    const res = await fetch(`/api/notes/${id}`, { method: 'DELETE' });
    if (res.ok) {
      fetchNotes();
    } else {
      alert('Error deleting note');
    }
  } catch (err) {
    console.error(err);
    alert('Network error');
  }
};
fetchNotes();