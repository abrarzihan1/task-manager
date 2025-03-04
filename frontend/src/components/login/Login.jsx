import React from 'react';
import { Link, useNavigate } from "react-router-dom";
import './Login.css';
import axios from "axios";

const Login = ({ onLoginSuccess }) => {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [error, setError] = React.useState('');
    const [loading, setLoading] = React.useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            const response = await axios.post(
                'http://localhost:8082/api/auth/login',
                { username, password },
                { withCredentials: true }
            );

            if (response.status === 200) {
                const { token, username } = response.data;
                localStorage.setItem('token', token);
                localStorage.setItem('username', username);
                onLoginSuccess();
                navigate('/dashboard');
            } else {
                setError('Invalid credentials, please try again.');
            }
        } catch (err) {
            console.error(err);
            setError('An error occurred. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-form">
                <form onSubmit={handleLogin}>
                    <h2>Login</h2>
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
                    {error && <div className="error-message">{error}</div>}
                    <button type="submit" className="button" disabled={!username || !password || loading}>
                        {loading ? "Logging in..." : "Login"}
                    </button>
                    <div className="register-link-text">
                        Don't have an account? <Link to="/register" className="register-link">Register here</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
