import React, { useState } from 'react';
import { useAuth } from './AuthContext';
import { useNavigate, Link } from 'react-router-dom';

function Signin() {
    const [userRole, setUserRole] = useState('Student'); 
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const API_BASE_URL = 'http://localhost:3001/api/auth'; 

    // CRITICAL: Ensure useAuth provides a 'login' function that accepts three arguments
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleRoleChange = (e) => {
        setUserRole(e.target.value);
        setId('');
        setPassword('');
        setError('');
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        // --- 1. Basic Field Validation ---
        if (!id) {
            setError(`${getIdLabel()} is required.`);
            setLoading(false);
            return;
        }

        if (userRole === 'Student' && !password) {
            setError('Password is required for Students.');
            setLoading(false);
            return;
        }

        // --- 2. Determine Endpoint and Body ---
        let endpoint = '';
        let body = {};

        if (userRole === 'Student') {
            endpoint = `${API_BASE_URL}/login`;
            body = { email: id, password }; 
        } else if (userRole === 'Staff') {
            endpoint = `${API_BASE_URL}/staff-signin`; 
            body = { staffId: id };
        } else if (userRole === 'Admin') {
            endpoint = `${API_BASE_URL}/admin-signin`; 
            body = { adminId: id };
        }
        
        try {
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),
            });

            const data = await response.json();

            if (response.ok) {
                const token = data.token;
                const actualRole = data.role || userRole; 
                
               
                const userId = data.userId || id;
                
                
                login(token, actualRole, userId); 
                
               
                const dashboardPath = `/${actualRole.toLowerCase()}-dashboard`;
                navigate(dashboardPath, { replace: true });
                
            } else {
                setError(data.message || data.error || 'Invalid credentials. Please try again.');
            }

        } catch (err) {
            console.error('Network or server error:', err);
            setError('Could not connect to the server. Please check the backend service.');
        } finally {
            setLoading(false);
        }
    };

    const getIdLabel = () => {
        if (userRole === 'Staff') return 'Staff ID';
        if (userRole === 'Admin') return 'Admin ID';
        return 'Email'; 
    };

    const getIdPlaceholder = () => {
        if (userRole === 'Staff') return 'Enter Staff ID ';
        if (userRole === 'Admin') return 'Enter Admin ID ';
        return 'Enter Email (student.branchyear@bmsce.ac.in)';
    };

    return (
        <section className="auth-container">
            <div className="auth-form">
                
                <h2>Sign In</h2>
                <p>Access your portal to manage meals and events.</p>

                <form onSubmit={handleFormSubmit}>
                    
                    {/* Role Selection Field */}
                    <div className="form-group">
                        <label htmlFor="userRole">I am a</label>
                        <select 
                            id="userRole" 
                            value={userRole} 
                            onChange={handleRoleChange}
                        >
                            <option value="Student">Student</option>
                            <option value="Staff">Staff</option>
                            <option value="Admin">Admin</option>
                        </select>
                    </div>

                    {/* ID Field (Always visible) */}
                    <div className="form-group">
                        <label htmlFor="id">{getIdLabel()}</label>
                        <input
                            type="text"
                            id="id"
                            value={id}
                            onChange={(e) => setId(e.target.value)}
                            required
                            placeholder={getIdPlaceholder()}
                        />
                    </div>

                    {/* Password Field (Visible ONLY for Student) */}
                    {userRole === 'Student' && (
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                placeholder="Enter your password"
                            />
                        </div>
                    )}

                    {/* Error Message */}
                    {error && <p style={{ color: 'red', marginBottom: '1rem', textAlign: 'center' }}>{error}</p>}

                    {/* Submit Button */}
                    <button type="submit" className="btn btn-primary btn-full-width" disabled={loading}>
                        {loading ? 'Signing In...' : 'Sign In'}
                    </button>
                </form>

                <div className="text-center">
                    <p className="text-muted">Don't have an account? <Link to="/signup">Register Now</Link></p>
                </div>
            </div>
        </section>
    );
}

export default Signin;