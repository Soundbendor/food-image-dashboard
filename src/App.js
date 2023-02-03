import logo from './logo.svg';
import './App.css';
import Navbar from './components/navbar';
import React, { Component }  from 'react';
import { BrowserRouter as Router, Routes, Route}
    from 'react-router-dom';
import Home from './pages';
import About from './pages/about';

function App() {
  return (
      <Router>
      <Navbar />
      <Routes>
          <Route exact path='/' element={<Home />} />
          <Route path='/about' element={<About/>} />
      </Routes>
      </Router>
  );
  }
    
  export default App;
