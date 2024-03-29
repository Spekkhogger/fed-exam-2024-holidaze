import React from 'react';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom"; 
import { useNavigate } from 'react-router-dom';
import Navbar from './components/layout/Nav';
import Footer from './components/layout/footer';
import LogInPage from './pages/authPages/logInPage';
import RegisterUser from './pages/authPages/registerUserPage';
import RegisterManager from './pages/authPages/registerManagerPage';

import VenuePage from './pages/venuePage';
import VenueDetails from './venues/SuperDetail';
import CreateNewVenue from './pages/PostVenue';
import EditVenue from './pages/EditVenuePage';

import ProfilePage from './pages/profilePage';
import EditProfile from './pages/EditProfile';

import './App.css';

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<VenuePage />} />
          <Route path="/auth/login" element={<LogInPage />}/>
          <Route path="/auth/register" element={<RegisterUser />}/>
          <Route path="/auth/register-manager" element={<RegisterManager />}/>
          <Route path="/browse" element={<VenuePage />}/>
          <Route path="/venues/:id" element={<VenueDetails />}/>
          <Route path="/venues/:id/edit" element={<EditVenue />} />
          <Route path="/profile/:param" element={<ProfilePage />}/>
          <Route path="/profile/edit-profile" element={<EditProfile />}/>
          <Route path="/profile/new-venue" element={<CreateNewVenue />}/>
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
