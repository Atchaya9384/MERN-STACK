import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import Navbar from './Navbar';


const modalStyles = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    padding: '20px',
    borderRadius: '10px',
    width: '400px',
  },
};

const ManageBooks = () => {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [newBook, setNewBook] = useState({ title: '', author: '', genre: '', year: '' });
  const [selectedGenre, setSelectedGenre] = useState('All');

  const genres = ['All', 'Fiction', 'Non-Fiction', 'Children Book'];

  useEffect(() => {
    
    fetch('https://run.mocky.io/v3/92bb2d2d-fa60-4aac-8ea5-d01dffea0c6e')
      .then(response => response.json())
      .then(data => {
        setBooks(data);
        setFilteredBooks(data);
      })
      .catch(error => console.error('Error fetching books:', error));
  }, []);

  const handleAddBook = () => {
    if (newBook.title && newBook.author && newBook.genre && newBook.year) {
      const newBookData = { ...newBook, id: books.length + 1 };
      setBooks([...books, newBookData]);
      setFilteredBooks([...books, newBookData]);
      setNewBook({ title: '', author: '', genre: '', year: '' });
      setModalIsOpen(false);
    } else {
      alert('Please fill in all fields.');
    }
  };

  const handleDeleteBook = (id) => {
    const updatedBooks = books.filter(book => book.id !== id);
    setBooks(updatedBooks);
    setFilteredBooks(updatedBooks);
  };

  const handleFilterByGenre = (genre) => {
    setSelectedGenre(genre);
    if (genre === 'All') {
      setFilteredBooks(books);
    } else {
      setFilteredBooks(books.filter(book => book.genre === genre));
    }
  };

  return (
    <div style={styles.content}>
       <Navbar/>
      <h1 style={styles.title}>Manage Books</h1>

      <div style={styles.filterContainer}>
        {genres.map(genre => (
          <button
            key={genre}
            style={selectedGenre === genre ? styles.activeFilterButton : styles.filterButton}
            onClick={() => handleFilterByGenre(genre)}
          >
            {genre}
          </button>
        ))}
      </div>

      <button style={styles.addButton} onClick={() => setModalIsOpen(true)}>Add New Book</button>

      <table style={styles.table}>
        <thead>
          <tr style={styles.tableHeader}>
            <th style={styles.tableHeaderCell}>Title</th>
            <th style={styles.tableHeaderCell}>Author</th>
            <th style={styles.tableHeaderCell}>Genre</th>
            <th style={styles.tableHeaderCell}>Year</th>
            <th style={styles.tableHeaderCell}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredBooks.map(book => (
            <tr key={book.id} style={styles.tableRow}>
              <td style={styles.tableCell}>{book.title}</td>
              <td style={styles.tableCell}>{book.author}</td>
              <td style={styles.tableCell}>{book.genre}</td>
              <td style={styles.tableCell}>{book.year}</td>
              <td style={styles.tableCell}>
                <button
                  style={styles.deleteButton}
                  onClick={() => handleDeleteBook(book.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        style={modalStyles}
        contentLabel="Add New Book"
      >
        <h2>Add New Book</h2>
        <form style={styles.form}>
          <input
            type="text"
            placeholder="Title"
            value={newBook.title}
            onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
            style={styles.input}
          />
          <input
            type="text"
            placeholder="Author"
            value={newBook.author}
            onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
            style={styles.input}
          />
          <input
            type="text"
            placeholder="Genre"
            value={newBook.genre}
            onChange={(e) => setNewBook({ ...newBook, genre: e.target.value })}
            style={styles.input}
          />
          <input
            type="number"
            placeholder="Year"
            value={newBook.year}
            onChange={(e) => setNewBook({ ...newBook, year: e.target.value })}
            style={styles.input}
          />
          <div style={styles.modalButtons}>
            <button type="button" onClick={handleAddBook} style={styles.submitButton}>Add Book</button>
            <button type="button" onClick={() => setModalIsOpen(false)} style={styles.cancelButton}>Cancel</button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

const styles = {
  content: {
    padding: '20px',
    backgroundColor: '#f0f4f8',
    fontFamily: '"Arial", sans-serif',
  },
  title: {
    fontSize: '2.5rem',
    color: '#333',
    marginBottom: '20px',
    textAlign: 'center',
  },
  filterContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '20px',
  },
  filterButton: {
    padding: '10px 20px',
    fontSize: '1rem',
    border: '1px solid #007bff',
    borderRadius: '5px',
    backgroundColor: '#fff',
    color: '#007bff',
    cursor: 'pointer',
    margin: '0 5px',
    transition: 'background-color 0.3s ease, color 0.3s ease',
  },
  activeFilterButton: {
    padding: '10px 20px',
    fontSize: '1rem',
    border: '1px solid #007bff',
    borderRadius: '5px',
    backgroundColor: '#007bff',
    color: '#fff',
    cursor: 'pointer',
    margin: '0 5px',
  },
  addButton: {
    display: 'block',
    margin: '0 auto 20px auto',
    padding: '10px 20px',
    fontSize: '1.2rem',
    border: 'none',
    borderRadius: '5px',
    backgroundColor: '#007bff',
    color: '#fff',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  tableHeader: {
    backgroundColor: '#007bff',
    color: '#fff',
  },
  tableHeaderCell: {
    padding: '10px',
    fontSize: '1.1rem',
    textAlign: 'left',
  },
  tableRow: {
    borderBottom: '1px solid #ddd',
  },
  tableCell: {
    padding: '10px',
    fontSize: '1rem',
    textAlign: 'left',
  },
  deleteButton: {
    padding: '5px 10px',
    fontSize: '0.9rem',
    border: 'none',
    borderRadius: '4px',
    backgroundColor: '#dc3545',
    color: '#fff',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  input: {
    width: '100%',
    padding: '10px',
    marginBottom: '10px',
    border: '1px solid #ddd',
    borderRadius: '4px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  modalButtons: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '20px',
  },
  submitButton: {
    padding: '10px 20px',
    fontSize: '1rem',
    border: 'none',
    borderRadius: '5px',
    backgroundColor: '#28a745',
    color: '#fff',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  cancelButton: {
    padding: '10px 20px',
    fontSize: '1rem',
    border: 'none',
    borderRadius: '5px',
    backgroundColor: '#dc3545',
    color: '#fff',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
};

export default ManageBooks;
