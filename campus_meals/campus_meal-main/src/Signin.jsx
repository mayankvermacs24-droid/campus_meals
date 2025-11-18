// FILENAME: src/Signin.jsx

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { API_BASE_URL } from './config';

function Signin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const res = await fetch(`${API_BASE_URL}/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();

            if (!res.ok) {
                // Handle 404/401 errors from backend
                throw new Error(data.error || 'Login failed. Check credentials.');
            }
            
            // --- THIS IS THE FIX ---
            // 1. Store the token
            localStorage.setItem('token', data.token);

            // 2. Determine the role (The backend currently only registers students)
            // The student object has studentId, email, and name. We will hardcode 'student' for now
            // or we could assume the backend needs to send the role explicitly.
            const userRole = 'student'; // Assuming registered users are students per backend logic

            // 3. Navigate based on role
            if (userRole === 'student') {
                navigate('/dashboard'); // Should navigate to StudentDashboard
            } else {
                // Fallback for staff/admin if you implement them later
                navigate('/');
            }
            // --- END OF FIX ---

        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <section id="signin">
            <div className="auth-container">
                <form className="auth-form" onSubmit={handleSubmit}>
                    <div className="auth-icon">🔑</div>
                    <h2>Sign In</h2>
                    <p>Welcome back to Campus Dining</p>
                    
                    {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}

                    <div className="form-group">
                        <label htmlFor="email-signin">Email</label>
                        <input type="email" id="email-signin" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password-signin">Password</label>
                        <input type="password" id="password-signin" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </div>

                    <p className="text-right margin-bottom-2">
                        <a href="/forgot">Forgot Password?</a>
                    </p>

                    <button type="submit" className="btn btn-primary btn-full-width">Sign In</button>

                    <p className="text-center text-muted margin-top-2">
                        Don't have an account? <Link to="/signup">Sign Up</Link>
                    </p>
                </form>
            </div>
        </section>
    );
}

export default Signin;