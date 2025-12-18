// FILENAME: src/AdminDashboard.jsx

import React, { useState, useEffect, useCallback } from 'react';

const ADMIN_ID = 'ADMIN123';
const API_BASE_URL = 'http://localhost:3001/api/auth/admin';

function AdminDashboard({ onNavigate, className = "" }) {
    const [activeTab, setActiveTab] = useState('menu');
    const [students, setStudents] = useState([]);
    const [events, setEvents] = useState([]);
    const [income, setIncome] = useState([]);
    const [loading, setLoading] = useState(false);

    // ✅ SAFE fetch function (NO CRASH)
    const fetchData = useCallback(async (endpoint, setter) => {
        setLoading(true);
        try {
            const res = await fetch(`${API_BASE_URL}/${endpoint}`, {
                headers: { 'X-Admin-ID': ADMIN_ID }
            });

            if (!res.ok) {
                console.error(`Failed to fetch ${endpoint}`);
                setter([]); // 👈 ALWAYS set array
                return;
            }

            const data = await res.json();
            setter(Array.isArray(data) ? data : []); // 👈 CRASH PROTECTION
        } catch (err) {
            console.error(err);
            setter([]); // 👈 CRASH PROTECTION
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        if (activeTab === 'students') fetchData('students', setStudents);
        if (activeTab === 'events') fetchData('events', setEvents);
        if (activeTab === 'income') fetchData('income', setIncome);
    }, [activeTab, fetchData]);

    return (
        <section id="admin-dashboard" className={className}>
            <div className="container">
                <h1 className="section-title">Admin Dashboard</h1>

                <div className="admin-nav hero-buttons">
                    <button className={`btn ${activeTab === 'menu' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setActiveTab('menu')}>Menu Management</button>
                    <button className={`btn ${activeTab === 'income' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setActiveTab('income')}>Monthly Income</button>
                    <button className={`btn ${activeTab === 'students' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setActiveTab('students')}>Student Details</button>
                    <button className={`btn ${activeTab === 'events' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setActiveTab('events')}>Event Approvals</button>
                </div>

                {/* -------- MENU MANAGEMENT (PDF ONLY) -------- */}
                {activeTab === 'menu' && (
                    <div id="admin-menu" className="admin-tab">
                        <h2>Menu Management</h2>

                        <div className="content-box" style={{ textAlign: 'center', padding: '2rem' }}>
                            <p style={{ marginBottom: '1.5rem' }}>
                                The current mess menu is available below.
                            </p>

                            <a
                                href="/messmenu.jpg"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-primary"
                            >
                                📄 View Mess Menu
                            </a>
                        </div>
                    </div>
                )}

                {/* -------- STUDENTS -------- */}
                {activeTab === 'students' && (
    <div id="admin-students" className="admin-tab">
        <h2>Student Details</h2>

        <div className="content-box">
            {loading && <p>Loading...</p>}

            {!loading && Array.isArray(students) && students.length === 0 && (
                <p>No students found.</p>
            )}

            {!loading && Array.isArray(students) && students.length > 0 && (
                <table style={{ width: '100%', marginBottom: '1rem' }}>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>USN</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.map(student => (
                            <tr key={student.student_id}>
                                <td>{student.first_name} {student.last_name}</td>
                                <td>{student.email}</td>
                                <td>{student.usn}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    </div>
)}


                {/* -------- EVENTS -------- */}
                {activeTab === 'events' && (
                    <div className="admin-tab">
                        <h2>Event Approvals</h2>

                        {Array.isArray(events) && events.length === 0 && (
                            <p>No pending events.</p>
                        )}

                        {Array.isArray(events) && events.map(e => (
                            <p key={e.event_id}>{e.name}</p>
                        ))}
                    </div>
                )}

                {/* -------- INCOME -------- */}
                {activeTab === 'income' && (
                    <div className="admin-tab">
                        <h2>Monthly Income</h2>

                        {Array.isArray(income) && income.length === 0 && (
                            <p>No income data available.</p>
                        )}

                        {Array.isArray(income) && income.map((i, idx) => (
                            <p key={idx}>
                                {i.month} : ₹{i.canteenIncome}
                            </p>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}

export default AdminDashboard;
