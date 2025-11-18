import React, { useState } from 'react';

const demoStudents = {
    '2021CS001': { name: 'Riya Sharma', usn: '2021CS001', email: 'riya@college.edu', booked: true, delivered: false },
    '2021CS002': { name: 'Aman Verma', usn: '2021CS002', email: 'aman@college.edu', booked: false, delivered: false },
    '2021CS003': { name: 'Priya Singh', usn: '2021CS003', email: 'priya@college.edu', booked: true, delivered: true }
};

function StaffDashboard({ onNavigate, className = "" }) {
    const [qrInput, setQrInput] = useState('');
    const [scanResult, setScanResult] = useState(null);
    const [students, setStudents] = useState(demoStudents);
    const [currentUSN, setCurrentUSN] = useState(null);

    const handleScan = (e) => {
        e.preventDefault();
        handleQRScan(qrInput);
    };

    const handleQRScan = (code) => {
        const student = students[code];
        setCurrentUSN(code);
        if (student) {
            setScanResult({
                info: (<><b>Name:</b> {student.name}<br /><b>USN:</b> {student.usn}<br /><b>Email:</b> {student.email}</>),
                status: student.booked
                    ? student.delivered
                        ? (<span style={{ color: 'gray', fontWeight: 600 }}>Order Already Delivered</span>)
                        : (<span style={{ color: 'green', fontWeight: 600 }}>Order Booked</span>)
                    : (<span style={{ color: 'red', fontWeight: 600 }}>No Order Booked</span>),
                showDeliver: student.booked && !student.delivered
            });
        } else {
            setScanResult({
                info: '',
                status: <span style={{ color: 'red' }}>Invalid QR code or student not found.</span>,
                showDeliver: false
            });
        }
    };

    const handleDemoScan = (code) => {
        setQrInput(code);
        handleQRScan(code);
    };

    const markDelivered = () => {
        if (currentUSN && students[currentUSN]) {
            setStudents(prev => ({
                ...prev,
                [currentUSN]: { ...prev[currentUSN], delivered: true }
            }));
            setScanResult(prev => ({
                ...prev,
                status: <span style={{ color: 'gray', fontWeight: 600 }}>Order Marked as Delivered</span>,
                showDeliver: false
            }));
            alert('Order marked as delivered for ' + students[currentUSN].name);
        }
    };

    return (
        <section id="staff-dashboard" className={className}>
            <div className="container">
                <h1 className="section-title">Staff Dashboard</h1>
                <button className="btn btn-secondary" style={{ marginBottom: '1rem' }} onClick={() => onNavigate && onNavigate('home')}>← Back to Home</button>
                <p className="section-subtitle">Scan student QR codes to verify and deliver orders</p>
                <div className="content-box staff-content-box">
                    <h2>Scan Student QR</h2>
                    <form className="event-form" onSubmit={handleScan}>
                        <div className="form-group">
                            <label htmlFor="qr-input">Enter QR Code (Demo: 2021CS001, 2021CS002, 2021CS003)</label>
                            <input id="qr-input" type="text" required placeholder="Scan or enter QR code" value={qrInput} onChange={e => setQrInput(e.target.value)} />
                        </div>
                        <button type="submit" className="btn btn-primary btn-full-width">Scan</button>
                    </form>
                    <div className="divider">DEMO QR CODES</div>
                    <div className="form-group" style={{ textAlign: 'center' }}>
                        <button type="button" className="btn btn-secondary btn-sm" onClick={() => handleDemoScan('2021CS001')}>2021CS001</button>
                        <button type="button" className="btn btn-secondary btn-sm" onClick={() => handleDemoScan('2021CS002')}>2021CS002</button>
                        <button type="button" className="btn btn-secondary btn-sm" onClick={() => handleDemoScan('2021CS003')}>2021CS003</button>
                    </div>
                    {scanResult && (
                        <div id="scan-result" style={{ marginTop: '2rem' }}>
                            <h3>Student Details</h3>
                            <div id="student-info">{scanResult.info}</div>
                            <div id="order-status">{scanResult.status}</div>
                            {scanResult.showDeliver && (
                                <button id="deliver-btn" className="btn btn-primary btn-full-width" style={{ marginTop: '1rem' }} onClick={markDelivered}>Mark as Delivered</button>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}

export default StaffDashboard;
