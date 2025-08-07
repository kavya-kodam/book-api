const express = require('express');
const app = express();
const port = 3000;

app.use(express.json()); // to parse JSON

let books = [
    { id: 1, title: "Harry Potter", author: "J.K. Rowling" },
    { id: 2, title: "Atomic Habits", author: "James Clear" }
];

// GET all books
app.get('/books', (req, res) => {
    res.json(books);
});

// POST a new book
app.post('/books', (req, res) => {
    const newBook = req.body;
    books.push(newBook);
    res.status(201).json(newBook);
});

// PUT to update a book
app.put('/books/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const updatedBook = req.body;
    books = books.map(book => book.id === id ? updatedBook : book);
    res.json(updatedBook);
});

// GET a book by ID
app.get('/books/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const book = books.find(b => b.id === id);
    if (book) {
        res.json(book);
    } else {
        res.status(404).json({ message: "Book not found" });
    }
});


// DELETE a book
app.delete('/books/:id', (req, res) => {
    const id = parseInt(req.params.id);
    books = books.filter(book => book.id !== id);
    res.sendStatus(204);
});

// Start server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
