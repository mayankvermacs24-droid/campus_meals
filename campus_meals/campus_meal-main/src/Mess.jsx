import React from 'react';

function Mess({ onNavigate, className = "" }) {
    return (
        <section id="mess" className={className}>
            <div className="container">
                <h1 className="section-title">Mess Services</h1>
                <p className="section-subtitle">Book your meals and enjoy hassle-free dining with QR-based check-in</p>
                <div className="mess-options">
                    <div className="mess-card">
                        <h3>👥 For Hostelites</h3>
                        <p className="card-description">Automatic meal access with QR check-in at meal times</p>
                        <ul>
                            <li>View daily menu</li>
                            <li>Scan QR code at mess counter</li>
                            <li>Instant meal verification</li>
                            <li>Track meal history</li>
                        </ul>
                        <button className="btn btn-primary btn-full-width" onClick={() => onNavigate && onNavigate('student-dashboard')}>View Menu</button>
                    </div>
                    <div className="mess-card">
                        <h3>📅 For Non-Hostelites</h3>
                        <p className="card-description">Book meals when booking window is open</p>
                        <ul>
                            <li>Wait for booking window</li>
                            <li>Book and pay online</li>
                            <li>Get QR code coupon</li>
                            <li>Show QR at counter</li>
                        </ul>
                        <button className="btn btn-primary btn-disabled btn-full-width" onClick={() => onNavigate && onNavigate('student-dashboard')}>Booking Closed</button>
                    </div>
                </div>
                <div className="menu-display">
                    <h2 className="section-title">Today's Menu</h2>
                    <div className="menu-tabs">
                        <button className="menu-tab active">All</button>
                        <button className="menu-tab">Breakfast</button>
                        <button className="menu-tab">Lunch</button>
                        <button className="menu-tab">Snacks</button>
                        <button className="menu-tab">Dinner</button>
                    </div>
                    <div className="menu-content">
                        <h3>No Menu Available</h3>
                        <p className="content-message">Menu will be available soon. Please check back later.</p>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Mess;
