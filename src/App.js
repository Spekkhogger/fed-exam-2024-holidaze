import React from 'react';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom"; 
import Navbar from './components/layout/nav';
import LogInPage from './pages/authPages/logInPage';
import RegisterUser from './pages/authPages/registerUserPage';
import './App.css';

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/"></Route>
          <Route path="/auth/login" element={<LogInPage />}/>
          <Route path="/auth/register" element={<RegisterUser />}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
