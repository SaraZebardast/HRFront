import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../api';
import './SignIn.css';

const SignIn = ({ login }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await axiosInstance.post('/api/users/auth/signin', { username, password });

            if (response.data.authenticated) {
                login(response.data.role);  // Use the login function from useAuth

                switch (response.data.role) {
                    case 'HR':
                        navigate('/hrpage');
                        break;
                    case 'IM':
                        navigate('/inventorypage');
                        break;
                    case 'Admin':
                        navigate('/AdminPage');
                        break;
                    default:
                        setError('Invalid role');
                }
            } else {
                setError('Invalid username or password');
            }
        } catch (error) {
            setError('! Please try again !');
            console.error('Error:', error);
        }
    };

    return (
        <div className="sign-in-container">
            <h2>Sign In</h2>
            <form onSubmit={handleSubmit} className="sign-in-form">
                <div className="form-group">
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="submit-button">Sign In</button>
            </form>
            {error && <p className="error-message">{error}</p>}
        </div>
    );
};

export default SignIn;