// FILENAME: src/StaffDashboard.jsx (Simplified for connection only)

import React from 'react';
import { useNavigate } from 'react-router-dom';
import './StaffDashboard.css';

function StaffDashboard() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/signin');
    };

    // Handler function that does nothing (as requested)
    const handleScan = () => {
        console.log("Scan button clicked - Functionality pending.");
        // We will not add any logic here yet.
    };

    return (
        <section id="staff-dashboard">
            <div className="container">
                <div className="dashboard-header">
                    <h1 className="section-title">Staff Validation Portal</h1>
                </div>

                <div className="content-box scanner-view">
                   
                    
                    {/* The Scan Button */}
                    <button 
                        className="btn btn-primary btn-large-scan"
                        onClick={handleScan} // This function does nothing right now
                    >
                        Tap to Scan
                    </button>
                </div>
            </div>
        </section>
    );
}

export default StaffDashboard;