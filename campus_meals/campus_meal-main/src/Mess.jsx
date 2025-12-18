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
                        <a
                                href="/messmenu.jpg"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-primary"
                            >
                                📄 View Mess Menu
                            </a>
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
                
                
            </div>
        </section>
    );
}

export default Mess;
