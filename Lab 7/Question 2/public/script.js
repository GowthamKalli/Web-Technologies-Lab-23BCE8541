let currentPage = 1;
let totalPages = 1;

const resultsDiv = document.getElementById('results');
const pageInfo = document.getElementById('pageInfo');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

async function fetchAndRender(url) {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error('Request failed');
    const data = await res.json();

    if (data.books) {
      renderBooks(data.books);
      currentPage = data.currentPage;
      totalPages = data.totalPages;
      pageInfo.textContent = `Page ${currentPage} of ${totalPages}`;
      prevBtn.disabled = currentPage <= 1;
      nextBtn.disabled = currentPage >= totalPages;
    } else {
      renderBooks(data);
      document.querySelector('.pagination').style.display = 'none';
    }
  } catch (err) {
    resultsDiv.innerHTML = `<p style="color:red;">Error: ${err.message}</p>`;
  }
}

function renderBooks(books) {
  resultsDiv.innerHTML = '';
  if (books.length === 0) {
    resultsDiv.innerHTML = '<p>No books found.</p>';
    return;
  }
  books.forEach(book => {
    const card = document.createElement('div');
    card.className = 'book-card';
    card.innerHTML = `
      <h3>${book.title}</h3>
      <p><strong>Author:</strong> ${book.author}</p>
      <p><strong>Category:</strong> ${book.category}</p>
      <p><strong>Year:</strong> ${book.year}</p>
      <p><strong>Price:</strong> ₹${book.price}</p>
      <p class="rating">Rating: ${book.rating} ★</p>
    `;
    resultsDiv.appendChild(card);
  });
}

function searchByTitle() {
  const title = document.getElementById('searchInput').value.trim();
  if (!title) return;
  fetchAndRender(`/api/books/search?title=${encodeURIComponent(title)}`);
}

function filterByCategory() {
  const cat = document.getElementById('categoryFilter').value;
  if (!cat) {
    loadPaginated();
    return;
  }
  fetchAndRender(`/api/books/category/${encodeURIComponent(cat)}`);
}

function sortBooks() {
  const val = document.getElementById('sortSelect').value;
  if (!val) return;
  const [field, dir] = val.split('-');
  fetchAndRender(`/api/books/sort/${field}?order=${dir}`);
}

function showTopRated() {
  fetchAndRender('/api/books/top');
}

function changePage(delta) {
  currentPage += delta;
  loadPaginated();
}

function loadPaginated() {
  fetchAndRender(`/api/books?page=${currentPage}&limit=8`);
  document.querySelector('.pagination').style.display = 'block';
}

loadPaginated();
