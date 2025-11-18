import React, { useState } from 'react';

function AdminDashboard({ onNavigate, className = "" }) {
    const [activeTab, setActiveTab] = useState('menu');
    return (
        <section id="admin-dashboard" className={className}>
            <div className="container">
                <h1 className="section-title">Admin Dashboard</h1>
                <button className="btn btn-secondary" style={{ marginBottom: '1rem' }} onClick={() => onNavigate && onNavigate('home')}>← Back to Home</button>
                <p className="section-subtitle">Manage menu, view analytics, edit students, and approve events</p>
                <div className="admin-nav hero-buttons" style={{ marginBottom: '2rem' }}>
                    <button className={`btn ${activeTab === 'menu' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setActiveTab('menu')}>Menu Management</button>
                    <button className={`btn ${activeTab === 'income' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setActiveTab('income')}>Monthly Income</button>
                    <button className={`btn ${activeTab === 'students' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setActiveTab('students')}>Student Details</button>
                    <button className={`btn ${activeTab === 'events' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setActiveTab('events')}>Event Approvals</button>
                </div>
                {activeTab === 'menu' && (
                    <div id="admin-menu" className="admin-tab">
                        <h2>Menu Management</h2>
                        <form className="event-form">
                            <div className="form-group">
                                <label htmlFor="menu-item-name">Item Name</label>
                                <input id="menu-item-name" type="text" required placeholder="E.g. Paneer Butter Masala" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="menu-item-type">Type</label>
                                <select id="menu-item-type" required>
                                    <option value="">Select type</option>
                                    <option>Breakfast</option>
                                    <option>Lunch</option>
                                    <option>Snacks</option>
                                    <option>Dinner</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="menu-item-time">Mess Timing</label>
                                <input id="menu-item-time" type="time" required />
                            </div>
                            <button type="submit" className="btn btn-primary">Add Item</button>
                        </form>
                        <div className="content-box">
                            <h3>Current Menu Items</h3>
                            <table className="menu-table" style={{ width: '100%', marginBottom: '1rem' }}>
                                <thead>
                                    <tr><th>Name</th><th>Type</th><th>Time</th><th>Action</th></tr>
                                </thead>
                                <tbody>
                                    <tr><td>Idli</td><td>Breakfast</td><td>08:00</td><td><button className="btn btn-secondary btn-sm">Remove</button></td></tr>
                                    <tr><td>Rice & Dal</td><td>Lunch</td><td>13:00</td><td><button className="btn btn-secondary btn-sm">Remove</button></td></tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
                {activeTab === 'income' && (
                    <div id="admin-income" className="admin-tab">
                        <h2>Monthly Income Analysis</h2>
                        <div className="content-box">
                            <h3>Income (Demo Data)</h3>
                            <table style={{ width: '100%', marginBottom: '1rem' }}>
                                <thead><tr><th>Month</th><th>Mess Income</th><th>Canteen Income</th><th>Total</th></tr></thead>
                                <tbody>
                                    <tr><td>October</td><td>₹1,20,000</td><td>₹40,000</td><td>₹1,60,000</td></tr>
                                    <tr><td>September</td><td>₹1,10,000</td><td>₹35,000</td><td>₹1,45,000</td></tr>
                                </tbody>
                            </table>
                            <div style={{ textAlign: 'center', color: '#666' }}>(Charts and more analytics can be added here)</div>
                        </div>
                    </div>
                )}
                {activeTab === 'students' && (
                    <div id="admin-students" className="admin-tab">
                        <h2>Student Details</h2>
                        <div className="content-box">
                            <table style={{ width: '100%', marginBottom: '1rem' }}>
                                <thead><tr><th>Name</th><th>Email</th><th>USN</th><th>Type</th><th>Action</th></tr></thead>
                                <tbody>
                                    <tr><td>Riya Sharma</td><td>riya@college.edu</td><td>2021CS001</td><td>Hostelite</td><td><button className="btn btn-secondary btn-sm">Edit</button></td></tr>
                                    <tr><td>Aman Verma</td><td>aman@college.edu</td><td>2021CS002</td><td>Day Scholar</td><td><button className="btn btn-secondary btn-sm">Edit</button></td></tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
                {activeTab === 'events' && (
                    <div id="admin-events" className="admin-tab">
                        <h2>Event Approval Requests</h2>
                        <div className="content-box">
                            <table style={{ width: '100%', marginBottom: '1rem' }}>
                                <thead><tr><th>Event</th><th>Date</th><th>Requested By</th><th>Status</th><th>Action</th></tr></thead>
                                <tbody>
                                    <tr><td>Tech Fest</td><td>2025-10-20</td><td>club@college.edu</td><td>Pending</td><td><button className="btn btn-primary btn-sm">Approve</button> <button className="btn btn-secondary btn-sm">Reject</button></td></tr>
                                    <tr><td>Sports Day</td><td>2025-11-05</td><td>sports@college.edu</td><td>Pending</td><td><button className="btn btn-primary btn-sm">Approve</button> <button className="btn btn-secondary btn-sm">Reject</button></td></tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}

export default AdminDashboard;
