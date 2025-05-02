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
    width: '500px',
    maxHeight: '90vh', // Ensure the modal does not exceed viewport height
    overflowY: 'auto', // Allow scrolling if content overflows
  },
};

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [filteredReviews, setFilteredReviews] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState('date');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalType, setModalType] = useState('add'); 
  const [currentReview, setCurrentReview] = useState(null);
  const [newReview, setNewReview] = useState({ book: '', user: '', rating: 1, comment: '', date: '' });

  useEffect(() => {
    fetch('https://run.mocky.io/v3/724aea20-f2fb-4cdd-98ad-24bf44d62cc1')
      .then(response => response.json())
      .then(data => {
        setReviews(data);
        setFilteredReviews(data);
      })
      .catch(error => console.error('Error fetching review data:', error));
  }, []);

  const handleAddReview = () => {
    if (newReview.book && newReview.user && newReview.comment) {
      const newId = reviews.length ? Math.max(...reviews.map(r => r.id)) + 1 : 1;
      const updatedReviews = [...reviews, { ...newReview, id: newId }];
      setReviews(updatedReviews);
      setFilteredReviews(updatedReviews);
      resetModal();
    } else {
      alert('Please fill in all fields.');
    }
  };

  const handleEditReview = () => {
    if (currentReview) {
      const updatedReviews = reviews.map(review => review.id === currentReview.id ? { ...currentReview, ...newReview } : review);
      setReviews(updatedReviews);
      setFilteredReviews(updatedReviews);
      resetModal();
    }
  };

  const handleDeleteReview = (id) => {
    const updatedReviews = reviews.filter(review => review.id !== id);
    setReviews(updatedReviews);
    setFilteredReviews(updatedReviews);
  };

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    setFilteredReviews(reviews.filter(review =>
      review.book.toLowerCase().includes(term) ||
      review.user.toLowerCase().includes(term) ||
      review.comment.toLowerCase().includes(term)
    ));
  };

  const handleSort = (field) => {
    const sortedReviews = [...filteredReviews].sort((a, b) => {
      if (field === 'rating') {
        return b[field] - a[field]; 
      }
      return new Date(b[field]) - new Date(a[field]); 
    });
    setFilteredReviews(sortedReviews);
    setSortField(field);
  };

  const openEditModal = (review) => {
    setCurrentReview(review);
    setNewReview({ book: review.book, user: review.user, rating: review.rating, comment: review.comment, date: review.date });
    setModalType('edit');
    setModalIsOpen(true);
  };

  const resetModal = () => {
    setNewReview({ book: '', user: '', rating: 1, comment: '', date: '' });
    setModalIsOpen(false);
    setCurrentReview(null);
    setModalType('add');
  };

  return (
    <div style={styles.content}>
      <Navbar />
      <h1 style={styles.title}>Manage Reviews</h1>

      <input
        type="text"
        placeholder="Search by book title, user, or comment"
        value={searchTerm}
        onChange={handleSearch}
        style={styles.searchInput}
      />

      <button style={styles.addButton} onClick={() => setModalIsOpen(true)}>Add New Review</button>

      <table style={styles.table}>
        <thead>
          <tr style={styles.tableHeader}>
            <th style={styles.tableHeaderCell} onClick={() => handleSort('book')}>Book</th>
            <th style={styles.tableHeaderCell} onClick={() => handleSort('user')}>User</th>
            <th style={styles.tableHeaderCell} onClick={() => handleSort('rating')}>Rating</th>
            <th style={styles.tableHeaderCell} onClick={() => handleSort('date')}>Date</th>
            <th style={styles.tableHeaderCell}>Comment</th>
            <th style={styles.tableHeaderCell}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredReviews.map(review => (
            <tr key={review.id} style={styles.tableRow}>
              <td style={styles.tableCell}>{review.book}</td>
              <td style={styles.tableCell}>{review.user}</td>
              <td style={styles.tableCell}>{review.rating} / 5</td>
              <td style={styles.tableCell}>{review.date}</td>
              <td style={styles.commentCell}>{review.comment}</td>
              <td style={styles.tableCell}>
                <button onClick={() => openEditModal(review)} style={styles.editButton}>Edit</button>
                <button onClick={() => handleDeleteReview(review.id)} style={styles.deleteButton}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={resetModal}
        style={modalStyles}
        contentLabel={modalType === 'add' ? "Add New Review" : "Edit Review"}
      >
        <h2>{modalType === 'add' ? 'Add New Review' : 'Edit Review'}</h2>
        <form style={styles.form}>
          <input
            type="text"
            placeholder="Book Title"
            value={newReview.book}
            onChange={(e) => setNewReview({ ...newReview, book: e.target.value })}
            style={styles.input}
          />
          <input
            type="text"
            placeholder="User"
            value={newReview.user}
            onChange={(e) => setNewReview({ ...newReview, user: e.target.value })}
            style={styles.input}
          />
          <input
            type="number"
            min="1"
            max="5"
            placeholder="Rating (1-5)"
            value={newReview.rating}
            onChange={(e) => setNewReview({ ...newReview, rating: parseInt(e.target.value, 10) })}
            style={styles.input}
          />
          <textarea
            placeholder="Comment"
            value={newReview.comment}
            onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
            style={styles.textarea}
          />
          <input
            type="date"
            placeholder="Date"
            value={newReview.date}
            onChange={(e) => setNewReview({ ...newReview, date: e.target.value })}
            style={styles.input}
          />
          <div style={styles.modalButtons}>
            <button type="button" onClick={modalType === 'add' ? handleAddReview : handleEditReview} style={styles.submitButton}>
              {modalType === 'add' ? 'Add Review' : 'Save Changes'}
            </button>
            <button type="button" onClick={resetModal} style={styles.cancelButton}>Cancel</button>
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
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  tableHeader: {
    backgroundColor: '#007bff',
    color: '#fff',
  },
  tableHeaderCell: {
    padding: '10px',
    cursor: 'pointer',
    whiteSpace: 'nowrap', // Prevent header text from wrapping
  },
  tableRow: {
    borderBottom: '1px solid #ddd',
  },
  tableCell: {
    padding: '10px',
    wordWrap: 'break-word', // Ensure text wraps within cells
    maxWidth: '150px', // Set max width for regular cells
  },
  commentCell: {
    padding: '10px',
    wordWrap: 'break-word', // Ensure comment text wraps within the cell
    maxWidth: '300px', // Increase width for the comment cell
  },
  editButton: {
    padding: '5px 10px',
    marginRight: '5px',
    border: 'none',
    borderRadius: '5px',
    backgroundColor: '#ffc107',
    color: '#fff',
    cursor: 'pointer',
  },
  deleteButton: {
    padding: '5px 10px',
    border: 'none',
    borderRadius: '5px',
    backgroundColor: '#dc3545',
    color: '#fff',
    cursor: 'pointer',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  input: {
    padding: '10px',
    marginBottom: '15px',
    border: '1px solid #ddd',
    borderRadius: '5px',
    fontSize: '1rem',
  },
  textarea: {
    padding: '10px',
    height: '100px', // Increase the height of the textarea
    marginBottom: '15px',
    border: '1px solid #ddd',
    borderRadius: '5px',
    fontSize: '1rem',
  },
  modalButtons: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  submitButton: {
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    backgroundColor: '#28a745',
    color: '#fff',
    cursor: 'pointer',
  },
  cancelButton: {
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    backgroundColor: '#6c757d',
    color: '#fff',
    cursor: 'pointer',
  },
};

export default Reviews;
