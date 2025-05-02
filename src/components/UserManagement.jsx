import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import Navbar from './Navbar';

const modalStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    padding: '40px',
    borderRadius: '10px',
    width: '400px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#ffffff',
    fontFamily: '"Arial", sans-serif',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
  },
};

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState('name');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalType, setModalType] = useState('add');
  const [currentUser, setCurrentUser] = useState(null);
  const [newUser, setNewUser] = useState({ name: '', email: '', role: 'Member' });

  useEffect(() => {
    fetch('https://run.mocky.io/v3/bd181ff0-25aa-458a-8824-57675b9a06f4')
      .then(response => response.json())
      .then(data => {
        setUsers(data);
        setFilteredUsers(data);
      })
      .catch(error => console.error('Error fetching user data:', error));
  }, []);

  const handleAddUser = () => {
    if (newUser.name && newUser.email) {
      const updatedUsers = [...users, { ...newUser, id: users.length + 1 }];
      setUsers(updatedUsers);
      setFilteredUsers(updatedUsers);
      resetModal();
    } else {
      alert('Please fill in all fields.');
    }
  };

  const handleEditUser = () => {
    if (currentUser) {
      const updatedUsers = users.map(user => user.id === currentUser.id ? { ...currentUser, ...newUser } : user);
      setUsers(updatedUsers);
      setFilteredUsers(updatedUsers);
      resetModal();
    }
  };

  const handleDeleteUser = (id) => {
    const updatedUsers = users.filter(user => user.id !== id);
    setUsers(updatedUsers);
    setFilteredUsers(updatedUsers);
  };

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    setFilteredUsers(users.filter(user =>
      user.name.toLowerCase().includes(term) ||
      user.email.toLowerCase().includes(term)
    ));
  };

  const handleSort = (field) => {
    const sortedUsers = [...filteredUsers].sort((a, b) => {
      if (a[field] < b[field]) return -1;
      if (a[field] > b[field]) return 1;
      return 0;
    });
    setFilteredUsers(sortedUsers);
    setSortField(field);
  };

  const openEditModal = (user) => {
    setCurrentUser(user);
    setNewUser({ name: user.name, email: user.email, role: user.role });
    setModalType('edit');
    setModalIsOpen(true);
  };

  const resetModal = () => {
    setNewUser({ name: '', email: '', role: 'Member' });
    setModalIsOpen(false);
    setCurrentUser(null);
    setModalType('add');
  };

  return (
    <div style={styles.content}>
      <Navbar />
      <h1 style={styles.title}>User Management</h1>

      <input
        type="text"
        placeholder="Search by name or email"
        value={searchTerm}
        onChange={handleSearch}
        style={styles.searchInput}
      />

      <button style={styles.addButton} onClick={() => setModalIsOpen(true)}>Add New User</button>

      <table style={styles.table}>
        <thead>
          <tr style={styles.tableHeader}>
            <th style={styles.tableHeaderCell} onClick={() => handleSort('name')}>Name</th>
            <th style={styles.tableHeaderCell} onClick={() => handleSort('email')}>Email</th>
            <th style={styles.tableHeaderCell} onClick={() => handleSort('role')}>Role</th>
            <th style={styles.tableHeaderCell}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map(user => (
            <tr key={user.id} style={styles.tableRow}>
              <td style={styles.tableCell}>{user.name}</td>
              <td style={styles.tableCell}>{user.email}</td>
              <td style={styles.tableCell}>{user.role}</td>
              <td style={styles.tableCell}>
                <button onClick={() => openEditModal(user)} style={styles.editButton}>Edit</button>
                <button onClick={() => handleDeleteUser(user.id)} style={styles.deleteButton}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={resetModal}
        style={modalStyles}
        contentLabel={modalType === 'add' ? "Add New User" : "Edit User"}
      >
        <h2 style={styles.modalTitle}>{modalType === 'add' ? 'Add New User' : 'Edit User'}</h2>
        <form style={styles.form}>
          <label style={styles.label}>Name</label>
          <input
            type="text"
            placeholder="Name"
            value={newUser.name}
            onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
            style={styles.input}
          />
          <label style={styles.label}>Email</label>
          <input
            type="email"
            placeholder="Email"
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            style={styles.input}
          />
          <label style={styles.label}>Role</label>
          <select
            value={newUser.role}
            onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
            style={styles.input}
          >
            <option value="Member">Member</option>
            <option value="Librarian">Librarian</option>
          </select>
          <div style={styles.modalButtons}>
            <button type="button" onClick={modalType === 'add' ? handleAddUser : handleEditUser} style={styles.submitButton}>
              {modalType === 'add' ? 'Add User' : 'Save Changes'}
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
  editButton: {
    padding: '5px 10px',
    fontSize: '0.9rem',
    border: 'none',
    borderRadius: '5px',
    backgroundColor: '#ffc107',
    color: '#333',
    cursor: 'pointer',
    marginRight: '5px',
  },
  deleteButton: {
    padding: '5px 10px',
    fontSize: '0.9rem',
    border: 'none',
    borderRadius: '5px',
    backgroundColor: '#dc3545',
    color: '#fff',
    cursor: 'pointer',
  },
  modalTitle: {
    fontSize: '1.8rem',
    color: '#333',
    marginBottom: '20px',
    textAlign: 'center',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  label: {
    fontSize: '1rem',
    color: '#333',
    marginBottom: '5px',
  },
  input: {
    padding: '10px',
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
    fontSize: '1.1rem',
    border: 'none',
    borderRadius: '5px',
    backgroundColor: '#28a745',
    color: '#fff',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  cancelButton: {
    padding: '10px 20px',
    fontSize: '1.1rem',
    border: 'none',
    borderRadius: '5px',
    backgroundColor: '#6c757d',
    color: '#fff',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
};

export default UserManagement;
