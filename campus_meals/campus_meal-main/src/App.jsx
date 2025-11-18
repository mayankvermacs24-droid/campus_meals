// FILENAME: src/App.jsx

import React from 'react';
// Import Link for our navigation buttons
import { Routes, Route, Link } from 'react-router-dom';

// Import all your page components
import Home from './Home.jsx';
import Signin from './Signin.jsx';
import Signup from './Signup.jsx';
import Canteen from './Canteen.jsx';
import Mess from './Mess.jsx';
import Events from './Events.jsx';
import StudentDashboard from './StudentDashboard.jsx';
import StaffDashboard from './StaffDashboard.jsx';
import AdminDashboard from './AdminDashboard.jsx';


// --- 1. We create a new Header component ---
function Header() {
  return (
    <header>
      <nav>
        {/* 1. CHANGED: Logo is now a normal div, not a link */}
        <div className="logo">
          Campus Meals
        </div>
        
        {/* These are the main navigation links */}
        <ul className="nav-links">
          {/* 2. ADDED: A new "Home" link */}
          <li>
            <Link to="/">
              <button>Home</button>
            </Link>
          </li>
          <li>
            <Link to="/mess">
              <button>Mess</button>
            </Link>
          </li>
          <li>
            <Link to="/canteens">
              <button>Canteens</button>
            </Link>
          </li>
          <li>
            <Link to="/events">
              <button>Events</button>
            </Link>
          </li>
        </ul>

        {/* These are the auth buttons on the right */}
        <div className="nav-buttons">
          <Link to="/signin" className="btn btn-secondary">Sign In</Link>
          <Link to="/signup" className="btn btn-primary">Get Started</Link>
        </div>
      </nav>
    </header>
  );
}


// --- 2. The App component (no changes here) ---
function App() {
  return (
    <div>
      <Header />

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/canteens" element={<Canteen />} />
          <Route path="/mess" element={<Mess />} />
          <Route path="/events" element={<Events />} />
          <Route path="/dashboard" element={<StudentDashboard />} />
          <Route path="/staff-dashboard" element={<StaffDashboard />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;