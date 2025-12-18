// FILENAME: src/App.jsx

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom'; 
import { AuthProvider, useAuth } from './AuthContext'; 

// --- PAGE COMPONENTS ---
// NOTE: Ensure all these files exist in your src/ directory with the EXACT names (e.g., Signin.jsx)
import Home from './Home.jsx'; 
import Signin from './Signin.jsx'; 
import Signup from './Signup.jsx'; 
import Canteen from './Canteen.jsx'; 
import Mess from './Mess.jsx'; 
import Events from './Events.jsx';
import StudentDashboard from './StudentDashboard.jsx';
import StaffDashboard from './StaffDashboard.jsx';
import AdminDashboard from './AdminDashboard.jsx';

// ----------------------------------------------------------------------
// Protected Route Component (Handles Authentication and Role Check)
// ----------------------------------------------------------------------
const ProtectedRoute = ({ element: Element, requiredRole, ...rest }) => {
    const { isAuthenticated, userRole, loading } = useAuth();
    
    if (loading) {
        return <div style={{paddingTop: '100px', textAlign: 'center'}}>Loading user session...</div>; 
    }

    if (!isAuthenticated) {
        return <Navigate to="/signin" replace />;
    }

    if (requiredRole && userRole !== requiredRole) {
        if (userRole === 'Student') return <Navigate to="/student-dashboard" replace />;
        if (userRole === 'Staff') return <Navigate to="/staff-dashboard" replace />;
        if (userRole === 'Admin') return <Navigate to="/admin-dashboard" replace />;
        
        return <Navigate to="/signin" replace />;
    }

    return <Element {...rest} />;
};

// ----------------------------------------------------------------------
// Header Component (Added loading safeguard)
// ----------------------------------------------------------------------
function Header() {
    // Get loading state along with other auth variables
    const { isAuthenticated, userRole, handleLogout, loading } = useAuth(); 
    
    // CRITICAL SAFEGUARD: Do not try to render links or buttons if context isn't loaded
    if (loading) {
        return null; 
    }

    const getDashboardPath = () => {
        if (userRole === 'Student') return '/student-dashboard';
        if (userRole === 'Staff') return '/staff-dashboard';
        if (userRole === 'Admin') return '/admin-dashboard';
        return '/signin'; 
    };

    return (
        <header>
            <nav>
                <div className="logo">
                  <span className="logo">Campus Meals</span>                
                    </div>
                <ul className="nav-links">
                    <li><Link to="/home"><button>Home</button></Link></li>
                    <li><Link to="/mess"><button>Mess</button></Link></li>
                    <li><Link to="/canteens"><button>Canteens</button></Link></li>
                    <li><Link to="/events"><button>Events</button></Link></li>
                    
                    {isAuthenticated && (
                        <li><Link to={getDashboardPath()}><button>Dashboard</button></Link></li>
                    )}
                </ul>

                <div className="nav-buttons">
                    {isAuthenticated ? (
                        <button onClick={handleLogout} className="btn btn-secondary">Logout</button>
                    ) : (
                        <>
                            <Link to="/signin" className="btn btn-secondary">Sign In</Link>
                            <Link to="/signup" className="btn btn-primary">Get Started</Link>
                        </>
                    )}
                </div>
            </nav>
        </header>
    );
}

// ----------------------------------------------------------------------
// The App component (Main structure)
// ----------------------------------------------------------------------
function App() {
    return (
        <Router>
            <AuthProvider>
                <Header />

                <main>
                    <Routes>
                        {/* Public Routes */}
                        <Route path="/" element={<Home />} />
                        <Route path="/home" element={<Home />} />
                        <Route path="/signin" element={<Signin />} />
                        <Route path="/signup" element={<Signup />} />
                        <Route path="/canteens" element={<Canteen />} />
                        <Route path="/mess" element={<Mess />} />
                        <Route path="/events" element={<Events />} />
                        
                        {/* Protected Dashboard Routes */}
                        <Route path="/student-dashboard" element={<ProtectedRoute element={StudentDashboard} requiredRole="Student" />} />
                        <Route path="/staff-dashboard" element={<ProtectedRoute element={StaffDashboard} requiredRole="Staff" />} /> 
                        <Route path="/admin-dashboard" element={<ProtectedRoute element={AdminDashboard} requiredRole="Admin" />} />
                        
                        {/* Catch-all route for invalid URLs */}
                        <Route path="*" element={<AuthRedirect />} />
                    </Routes>
                </main>
            </AuthProvider>
        </Router>
    );
}

// Helper component for default redirect logic
const AuthRedirect = () => {
    const { isAuthenticated, userRole, loading } = useAuth();
    
    if (loading) return null; 

    if (!isAuthenticated) return <Navigate to="/home" replace />;
    
    if (userRole === 'Student') return <Navigate to="/student-dashboard" replace />;
    if (userRole === 'Staff') return <Navigate to="/staff-dashboard" replace />;
    if (userRole === 'Admin') return <Navigate to="/admin-dashboard" replace />;
    
    return <Navigate to="/home" replace />;
};

export default App;