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

const TrackRentals = () => {
  const [rentals, setRentals] = useState([]);
  const [filteredRentals, setFilteredRentals] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState('book');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [newRental, setNewRental] = useState({ book: '', user: '', dueDate: '' });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
   
    fetch('https://run.mocky.io/v3/0ed97640-7215-4941-a72a-935dd4bc4d77')
      .then((response) => response.json())
      .then((data) => {
        setRentals(data);
        setFilteredRentals(data);
      })
      .catch((error) => {
        console.error('Error fetching rental data:', error);
      });
  }, []);

  const handleAddRental = () => {
    if (newRental.book && newRental.user && newRental.dueDate) {
      const updatedRentals = [...rentals, { ...newRental, id: rentals.length + 1 }];
      setRentals(updatedRentals);
      setFilteredRentals(updatedRentals);
      setNewRental({ book: '', user: '', dueDate: '' });
      setModalIsOpen(false);
    } else {
      alert('Please fill in all fields.');
    }
  };

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    setFilteredRentals(
      rentals.filter(
        (rental) =>
          rental.book.toLowerCase().includes(term) ||
          rental.user.toLowerCase().includes(term)
      )
    );
  };

  const handleSort = (field) => {
    const sortedRentals = [...filteredRentals].sort((a, b) => {
      if (a[field] < b[field]) return -1;
      if (a[field] > b[field]) return 1;
      return 0;
    });
    setFilteredRentals(sortedRentals);
    setSortField(field);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedRentals = filteredRentals.slice(startIndex, startIndex + itemsPerPage);
  const totalPages = Math.ceil(filteredRentals.length / itemsPerPage);

  return (
    <div style={styles.content}>
      <Navbar />
      <h1 style={styles.title}>Track Rentals</h1>

      <input
        type="text"
        placeholder="Search by book title or user"
        value={searchTerm}
        onChange={handleSearch}
        style={styles.searchInput}
      />

      <button style={styles.addButton} onClick={() => setModalIsOpen(true)}>Add New Rental</button>

      <table style={styles.table}>
        <thead>
          <tr style={styles.tableHeader}>
            <th style={styles.tableHeaderCell} onClick={() => handleSort('book')}>Book</th>
            <th style={styles.tableHeaderCell} onClick={() => handleSort('user')}>User</th>
            <th style={styles.tableHeaderCell} onClick={() => handleSort('dueDate')}>Due Date</th>
          </tr>
        </thead>
        <tbody>
          {paginatedRentals.map(rental => (
            <tr key={rental.id} style={styles.tableRow}>
              <td style={styles.tableCell}>{rental.book}</td>
              <td style={styles.tableCell}>{rental.user}</td>
              <td style={styles.tableCell}>{rental.dueDate}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={styles.pagination}>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            style={index + 1 === currentPage ? styles.activePageButton : styles.pageButton}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        style={modalStyles}
        contentLabel="Add New Rental"
      >
        <h2>Add New Rental</h2>
        <form style={styles.form}>
          <input
            type="text"
            placeholder="Book Title"
            value={newRental.book}
            onChange={(e) => setNewRental({ ...newRental, book: e.target.value })}
            style={styles.input}
          />
          <input
            type="text"
            placeholder="User"
            value={newRental.user}
            onChange={(e) => setNewRental({ ...newRental, user: e.target.value })}
            style={styles.input}
          />
          <input
            type="date"
            placeholder="Due Date"
            value={newRental.dueDate}
            onChange={(e) => setNewRental({ ...newRental, dueDate: e.target.value })}
            style={styles.input}
          />
          <div style={styles.modalButtons}>
            <button type="button" onClick={handleAddRental} style={styles.submitButton}>Add Rental</button>
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
  searchInput: {
    display: 'block',
    width: '100%',
    padding: '10px',
    marginBottom: '20px',
    border: '1px solid #ddd',
    borderRadius: '5px',
    fontSize: '1rem',
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
    cursor: 'pointer',
    userSelect: 'none',
  },
  tableRow: {
    borderBottom: '1px solid #ddd',
  },
  tableCell: {
    padding: '10px',
    fontSize: '1rem',
    textAlign: 'left',
  },
  pagination: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '20px',
  },
  pageButton: {
    padding: '10px 20px',
    fontSize: '1rem',
    border: '1px solid #ddd',
    borderRadius: '5px',
    backgroundColor: '#fff',
    color: '#007bff',
    cursor: 'pointer',
    margin: '0 5px',
    transition: 'background-color 0.3s ease, color 0.3s ease',
  },
  activePageButton: {
    padding: '10px 20px',
    fontSize: '1rem',
    border: '1px solid #007bff',
    borderRadius: '5px',
    backgroundColor: '#007bff',
    color: '#fff',
    cursor: 'pointer',
    margin: '0 5px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  input: {
    marginBottom: '10px',
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '5px',
  },
  modalButtons: {
    display: 'flex',
    justifyContent: 'space-between',
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

export default TrackRentals;
