import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import BookDetail from './components/BookDetail';
import Home from './components/Home';
import BookList from './components/BookList';
import 'bootstrap/dist/css/bootstrap.min.css';



function App() {
  return (
    <Router>
      <div className="container">
        <header>
          <h1 className="my-4">Inventory Management System</h1>
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link to="/" className="nav-link">Home</Link>
              </li>
              <li className="nav-item">
                <Link to="/inventory" className="nav-link">Inventory</Link>
              </li>
            </ul>
          </nav>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/inventory/:productId" element={<BookDetail />} />
            <Route path="/inventory" element={<BookList />} />
          </Routes>
        </main>
        <footer className="py-3">
          <p className="text-center">&copy; 2024 Inventory Management System by Goo Ye Jui</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;