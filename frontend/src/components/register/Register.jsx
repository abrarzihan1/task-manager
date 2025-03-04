import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();

        if (!username || !password || !email) {
            setError('All fields are required.');
            return;
        }

        try {
            const response = await axios.post(
                'http://localhost:8082/api/auth/register',
                {
                    username,
                    password,
                    email,
                }
            );

            if (response.status === 200) {
                navigate('/login');
            } else {
                const errorMessage = response.data?.errorMessage || 'Failed to register';
                setError(errorMessage);
            }
        } catch (error) {
            setError(error.response?.data?.errorMessage || 'An error occurred. Please try again.');
        }
    }

    return (
        <div className="auth-page">
            <div className="auth-form">
                <form onSubmit={handleSubmit}>
                    <h2>Register</h2>
                    <p>Enter details to create an account</p>
                    <div className="form-input-row">
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Enter username"
                            className="text-input"
                        />
                    </div>
                    <div className="form-input-row">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter password"
                            className="text-input"
                        />
                    </div>
                    <div className="form-input-row">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter email"
                            className="text-input"
                        />
                    </div>
                    <button type="submit" className="button">Register</button>
                    {error && <div className="error-message">{error}</div>}
                </form>
            </div>
        </div>
    );
}

export default Register;
