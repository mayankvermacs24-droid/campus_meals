// FILENAME: src/Signup.jsx

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { API_BASE_URL } from './config'; // Make sure config.js exists

function Signup() {
    const [usn, setUsn] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [role, setRole] = useState('student'); // Default role
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        try {
            const res = await fetch(`${API_BASE_URL}/auth/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                
                // --- THIS IS THE FIX ---
                // The keys now match what your backend (routes/auth.js) expects
                body: JSON.stringify({
                    usn: usn,
                    first_name: firstName,
                    last_name: lastName,
                    email: email,
                    phone_number: phone,
                    password: password,
                    role: role
                }),
                // --- END OF FIX ---
            });

            const data = await res.json();

            if (!res.ok) {
                // This will now show the *real* error if one happens
                throw new Error(data.error || 'Failed to sign up');
            }

            // Success! 
            alert('Registration successful! Please sign in.');
            navigate('/signin');

        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <section id="signup">
            <div className="auth-container">
                <form className="auth-form" onSubmit={handleSubmit}>
                    <div className="auth-icon">🧑‍🎓</div>
                    <h2>Create Account</h2>
                    <p>Join your campus dining platform</p>
                    
                    {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}

                    <div className="form-group">
                        <label htmlFor="role">I am a</label>
                        <select id="role" value={role} onChange={(e) => setRole(e.target.value)}>
                            <option value="student">Student</option>
                            <option value="staff">Staff</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="usn">USN / Staff ID</label>
                        <input type="text" id="usn" value={usn} onChange={(e) => setUsn(e.target.value)} required />
                    </div>

                    <div className="form-group">
                        <label htmlFor="firstName">First Name</label>
                        <input type="text" id="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
                    </div>

                    <div className="form-group">
                        <label htmlFor="lastName">Last Name</label>
                        <input type="text" id="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </div>

                    <div className="form-group">
                        <label htmlFor="phone">Phone Number</label>
                        <input type="tel" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} required />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </div>

                    <div className="form-group">
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <input type="password" id="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                    </div>

                    <button type="submit" className="btn btn-primary btn-full-width">Sign Up</button>

                    <p className="text-center text-muted margin-top-2">
                        Already have an account? <Link to="/signin">Sign In</Link>
                    </p>
                </form>
            </div>
        </section>
    );
}

export default Signup;