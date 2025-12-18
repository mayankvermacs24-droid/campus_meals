// FILENAME: src/Home.jsx

import React from 'react';
import { Link } from 'react-router-dom';

function Home({ className = "" }) {
    return (
        <section id="home" className={className}>
            <div className="container">
                <div className="hero">
                    <h1>Campus Dining Simplified</h1>
                    <p>Streamlined meal booking, canteen orders, and event catering for your college.</p>
                    <div className="hero-buttons">
                        <Link to="/signup" className="btn btn-primary">Get Started</Link>
                        <Link to="/signin" className="btn btn-secondary">Sign In</Link>
                    </div>
                </div>
                <div className="features">
                    <h2>Core Features</h2>
                    <div className="feature-grid">
                        
                        <Link to="/mess" className="feature-card" style={{ cursor: 'pointer', textDecoration: 'none', color: 'inherit' }}>
                            <div className="feature-icon">🍽️</div>
                            <h3>Mess Management</h3>
                            <p>Easy meal booking with QR-based check-in for hostelites and non-hostelites.</p>
                        </Link>
                        
                        <Link to="/canteen" className="feature-card" style={{ cursor: 'pointer', textDecoration: 'none', color: 'inherit' }}>
                            <div className="feature-icon">🛒</div>
                            <h3>Canteen Orders</h3>
                            <p>Browse menus, order online, and pick up with QR code confirmation.</p>
                        </Link>

                        <Link to="/events" className="feature-card" style={{ cursor: 'pointer', textDecoration: 'none', color: 'inherit' }}>
                            <div className="feature-icon">📅</div>
                            <h3>Event Catering</h3>
                            <p>Request catering for college events with admin approval workflow.</p>
                        </Link>
                    </div>
                </div>
                
            </div>
        </section>
    );
}

export default Home; 