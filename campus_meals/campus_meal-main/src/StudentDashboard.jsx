// FILENAME: src/StudentDashboard.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


function StudentDashboard() {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('profile');

    const handleLogout = () => {
        // Clear the token and redirect to the signin page
        localStorage.removeItem('token');
        navigate('/signin');
    };

    // A simple component to render the main content based on the active tab
    const MainContent = () => {
        switch (activeTab) {
            case 'profile':
                return <div><h3>Your Profile 👤</h3><p>Manage your personal and account details here.</p></div>;
            case 'mess_booking':
                return <div><h3>Mess Booking 🍽️</h3><p>Book your daily meals and view your meal history.</p>
               <button className="btn btn-secondary">
                    <h3>Generate QR</h3>
                </button>

               </div>
               
                ;
            case 'canteen_orders':
                return <div><h3>Canteen Orders 🛒</h3><p>View your past canteen orders and receipts.</p></div>;
            case 'wallet':
                return <div><h3>Campus Wallet 💳</h3><p>Manage your balance and view transaction history.</p></div>;
            default:
                return <div>Select a navigation item.</div>;
        }
    };

    return (
        <section id="dashboard" className="dashboard-layout">
            <div className="sidebar">
                <div className="sidebar-header">
                    <h2>Student Portal</h2>
                </div>
                <nav className="sidebar-nav">
                    <ul>
                        <li 
                            className={activeTab === 'profile' ? 'active' : ''} 
                            onClick={() => setActiveTab('profile')}
                        >
                            Profile
                        </li>
                        <li 
                            className={activeTab === 'mess_booking' ? 'active' : ''} 
                            onClick={() => setActiveTab('mess_booking')}
                        >
                            Mess Booking
                        </li>
                        <li 
                            className={activeTab === 'canteen_orders' ? 'active' : ''} 
                            onClick={() => setActiveTab('canteen_orders')}
                        >
                            Canteen Orders
                        </li>
                        <li 
                            className={activeTab === 'wallet' ? 'active' : ''} 
                            onClick={() => setActiveTab('wallet')}
                        >
                            Campus Wallet
                        </li>
                    </ul>
                </nav>
               
            </div>
            <div className="main-content">
                <div className="content-area">
                    <MainContent />
                </div>
            </div>
        </section>
    );
}

export default StudentDashboard;