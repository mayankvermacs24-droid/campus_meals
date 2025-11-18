import React from 'react';

function Events({ onNavigate, className = "" }) {
    return (
        <section id="events" className={className}>
            <div className="container">
                <h1 className="section-title">Event Catering</h1>
                <p className="section-subtitle">Request catering services for your college events and club activities</p>
                <button className="btn btn-primary btn-center" onClick={() => onNavigate && onNavigate('student-dashboard')}>Request Catering</button>
                <h2 className="section-title">How It Works</h2>
                <div className="process-steps">
                    <div className="step">
                        <div className="step-number">1</div>
                        <h3>Submit Request</h3>
                        <p className="step-description">Fill event details</p>
                    </div>
                    <div className="step">
                        <div className="step-number">2</div>
                        <h3>Admin Review</h3>
                        <p className="step-description">Wait for approval</p>
                    </div>
                    <div className="step">
                        <div className="step-number">3</div>
                        <h3>Get Notified</h3>
                        <p className="step-description">Receive decision</p>
                    </div>
                    <div className="step">
                        <div className="step-number">4</div>
                        <h3>Event Day</h3>
                        <p className="step-description">Food delivered</p>
                    </div>
                </div>
                <h2 className="section-title">What You Need to Provide</h2>
                <div className="requirements-grid">
                    <div className="requirement-box">
                        <h4>📋 Event Details</h4>
                        <ul>
                            <li>Event name</li>
                            <li>Date and time</li>
                            <li>Duration</li>
                        </ul>
                    </div>
                    <div className="requirement-box">
                        <h4>📍 Venue Details</h4>
                        <ul>
                            <li>Location</li>
                            <li>Setup requirements</li>
                            <li>Access details</li>
                        </ul>
                    </div>
                    <div className="requirement-box">
                        <h4>👥 Attendee Information</h4>
                        <ul>
                            <li>Number of people</li>
                            <li>Food preferences</li>
                            <li>Special requirements</li>
                        </ul>
                    </div>
                    <div className="requirement-box">
                        <h4>🍽️ Meal Type</h4>
                        <ul>
                            <li>Breakfast</li>
                            <li>Lunch</li>
                            <li>Dinner / Snacks</li>
                        </ul>
                    </div>
                </div>
                <div className="content-box">
                    <h2 className="box-title">My Requests</h2>
                    <div className="empty-state">
                        <p className="empty-state-title">No Requests Yet</p>
                        <p className="empty-state-message">You haven't submitted any catering requests. Click "Request Catering" above to get started.</p>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Events;
