document.getElementById('bookForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const title = document.getElementById('title').value.trim();
    const author = document.getElementById('author').value.trim();
    const genre = document.getElementById('genre').value.trim();
    const published_year = document.getElementById('published_year').value.trim();

    const book = { title, author, genre, published_year };

    fetch('http://localhost:5004/books', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(book)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        fetchBooks();
    })
    .catch((error) => {
        console.error('Error:', error);
    });
});

function fetchBooks() {
    fetch('http://localhost:5004/books')
        .then(response => response.json())
        .then(data => {
            const booksList = document.getElementById('booksList');
            booksList.innerHTML = '';
            data.forEach(book => {
                const li = document.createElement('li');
                li.innerHTML = `
                    <div class="book-info">
                        <span>${book.title}</span>
                        <span>${book.author}</span>
                        <span>${book.genre}</span>
                        <span>${book.published_year}</span>
                    </div>
                    <div class="buttons">
                        <button class="edit" onclick="editBook(${book.id})">Edit</button>
                        <button onclick="deleteBook(${book.id})">Delete</button>
                    </div>
                `;
                booksList.appendChild(li);
            });
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}

function editBook(id) {
    const title = prompt('Enter new title:');
    const author = prompt('Enter new author:');
    const genre = prompt('Enter new genre:');
    const published_year = prompt('Enter new published year:');

    const book = { title, author, genre, published_year };

    fetch(`http://localhost:5004/books/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(book)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        fetchBooks();
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

function deleteBook(id) {
    fetch(`http://localhost:5004/books/${id}`, {
        method: 'DELETE'
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        fetchBooks();
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

fetchBooks();