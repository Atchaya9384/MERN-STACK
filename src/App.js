import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BookRentalPage from './pages/BookRentalPage';
import WishlistPage from './pages/WishlistPage';
import RentPage from './pages/RentPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import ConfirmationPage from './pages/ConfirmationPage';
//import Navbar from './pages/Navbar';
import Fiction from './pages/Fiction';
import Nonfic from './pages/Nonfic';
import Ece from './pages/Ece';
import Home from './pages/Home';
import About from './pages/About';
import ContactPage from './pages/ContactPage';
// import AdminDashboard from './components/AdminDashboard';
// import ManageBooks from './components/ManageBooks';
// import TrackRentals from './components/TrackRentals';
// import UserManagement from './components/UserManagement';
// import Reviews from './components/Reviews';
// import Navbar from './components/Navbar';
// import UserAdminChoose from './components/UserAdminChoose';
import L from './components/L';
//import AdminLo from './components/AdminLo';



function App() {
  return (
    <Router>
     
      
      <Routes>
      {/* <Route path="/" element={<UserAdminChoose />} />
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      <Route path="/admin/manage-books" element={<ManageBooks />} />
      <Route path="/admin/track-rentals" element={<TrackRentals />} />
      <Route path="/admin/user-management" element={<UserManagement />} /> 
       <Route path="/admin/reviews" element={<Reviews />} />
       <Route path="/admi" element={<AdminLo />} /> */}

      <Route path="/" element={<L />} />
       <Route path="/home" element={<Home />} />
        <Route path="/child" element={<BookRentalPage />} />
        <Route path="/wishlist" element={<WishlistPage />} />
        <Route path="/rent" element={<RentPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/confirmation" element={<ConfirmationPage />} />
        <Route path="/fiction" element={<Fiction />} />
        <Route path="/nonfic" element={<Nonfic />} />
        <Route path="/ece" element={<Ece />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<ContactPage/>} />
      </Routes>
    </Router>
  );
}

export default App;