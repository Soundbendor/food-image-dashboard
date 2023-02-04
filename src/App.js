import './App.css';
import Navbar from './components/navbar';
import React, { Component }  from 'react';
import { BrowserRouter as Router, Routes, Route}
    from 'react-router-dom';
import Home from './pages';
import User from './pages/user';
import Patients from './pages/patients';
import Meals from './pages/meals';
import { FooterContainer } from './components/footer/footer'

function App() {
  return (
      <Router>
      <Navbar />
      <Routes>
          <Route exact path='/' element={<Home />} />
          <Route path='/user' element={<User/>} />
          <Route path='/patients' element={<Patients />} />
          <Route path='/meals' element={<Meals/>} />
      </Routes>
      <FooterContainer/>
      </Router>
  );
  }
    
  export default App;
