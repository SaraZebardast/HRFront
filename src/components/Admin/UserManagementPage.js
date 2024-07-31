import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'react-datepicker/dist/react-datepicker.css';
import Modal from '../HRManagementDashboard/PersonnelManagement/Modal';
import axiosInstance from '../../api';
import { LogOut, UserPlus, User, Trash2 } from 'lucide-react';

const UserManagement = ({ logout }) => {
    const [users, setUsers] = useState([]);
    const [personnel, setPersonnel] = useState([]);
    const [availablePersonnel, setAvailablePersonnel] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newUser, setNewUser] = useState({
        username: '',
        email: '',
        password: '',
        role: '',
        personnelId: null
    });
    const navigate = useNavigate();

    useEffect(() => {
        fetchUsers();
        fetchPersonnel();
    }, []);

    useEffect(() => {
        updateAvailablePersonnel();
    }, [users, personnel]);

    const fetchUsers = async () => {
        try {
            const response = await axiosInstance.get('/api/users');
            setUsers(response.data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const fetchPersonnel = async () => {
        try {
            const response = await axiosInstance.get('/api/personnel/search');
            setPersonnel(response.data);
        } catch (error) {
            console.error('Error fetching personnel:', error);
        }
    };

    const updateAvailablePersonnel = () => {
        const assignedPersonnelIds = users.map(user => user.personnelId);
        const available = personnel.filter(person => !assignedPersonnelIds.includes(person.id));
        setAvailablePersonnel(available);
    };

    const handleCreateUser = () => {
        setIsModalOpen(true);
    };

    const handleInputChange = (e) => {
        setNewUser({ ...newUser, [e.target.name]: e.target.value });
    };

    const handlePersonnelSelect = (e) => {
        const selectedPersonnelId = parseInt(e.target.value);
        const selectedPerson = personnel.find(p => p.id === selectedPersonnelId);
        setNewUser({
            ...newUser,
            personnelId: selectedPersonnelId,
            username: `${selectedPerson.firstName}.${selectedPerson.lastName}`.toLowerCase(),
            email: `${selectedPerson.firstName}.${selectedPerson.lastName}@company.com`.toLowerCase()
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!newUser.username || !newUser.email || !newUser.password || !newUser.role || !newUser.personnelId) {
            alert('Please fill in all fields.');
            return;
        }

        try {
            await axiosInstance.post('/api/users', newUser);
            setIsModalOpen(false);
            fetchUsers();
            setNewUser({
                username: '',
                email: '',
                password: '',
                role: '',
                personnelId: null
            });
        } catch (error) {
            console.error('Error creating user:', error);
            alert('An error occurred while creating the user. Please try again.');
        }
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        setNewUser({
            username: '',
            email: '',
            password: '',
            role: '',
            personnelId: null
        });
    };

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const handleDeleteUser = async (userId) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            try {
                await axiosInstance.delete(`/api/users/${userId}`);
                fetchUsers();
            } catch (error) {
                console.error('Error deleting user:', error);
                alert('An error occurred while deleting the user. Please try again.');
            }
        }
    };

    const pageStyle = {
        backgroundColor: '#f0faf8',
        minHeight: '100vh',
        padding: '20px',
        fontFamily: 'Arial, sans-serif',
        position: 'relative',
    };

    const headerStyle = {
        color: '#2c7a7b',
        textAlign: 'center',
        marginBottom: '20px',
        fontSize: '2.5rem',
        textShadow: '1px 1px 2px rgba(132, 220, 198, 0.2)',
    };

    const buttonStyle = {
        backgroundColor: '#84dcc6',
        color: '#2c7a7b',
        border: 'none',
        padding: '12px 20px',
        borderRadius: '5px',
        cursor: 'pointer',
        marginBottom: '5px',
        transition: 'all 0.3s',
        fontWeight: 'bold',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    };

    const cancelButtonStyle = {
        ...buttonStyle,
        backgroundColor: '#b2ebf2',
    };

    const deleteButtonStyle = {
        ...buttonStyle,
        backgroundColor: '#ff9999',
        padding: '8px 12px',
        fontSize: '0.9rem',
    };

    const tableStyle = {
        width: '90%',
        margin: '0 auto',
        borderCollapse: 'separate',
        borderSpacing: '0 10px',
        backgroundColor: '#ffffff',
        boxShadow: '0 0 20px rgba(132, 220, 198, 0.2)',
        borderRadius: '10px',
        overflow: 'hidden',
    };

    const thStyle = {
        backgroundColor: '#84dcc6',
        color: '#2c7a7b',
        padding: '15px',
        textAlign: 'left',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        letterSpacing: '1px',
    };

    const tdStyle = {
        padding: '15px',
        borderBottom: '1px solid #e0f5f4',
        transition: 'background-color 0.3s',
    };

    const trHoverStyle = {
        ':hover': {
            backgroundColor: '#e6f7f4',
        },
    };

    const modalStyle = {
        backgroundColor: '#ffffff',
        padding: '30px',
        borderRadius: '10px',
        maxWidth: '500px',
        width: '80%',
        margin: '0 auto',
        boxShadow: '0 5px 15px rgba(132, 220, 198, 0.3)',
    };

    const modalTitleStyle = {
        color: '#2c7a7b',
        margin: '0 0 20px',
        fontSize: '1.8rem',
        textAlign: 'center',
        fontWeight: 'bold',
    };

    const inputStyle = {
        width: '100%',
        padding: '12px',
        marginBottom: '15px',
        borderRadius: '5px',
        border: '1px solid #84dcc6',
        fontSize: '1rem',
        transition: 'border-color 0.3s',
    };

    const logoutButtonStyle = {
        position: 'absolute',
        top: '20px',
        right: '20px',
        display: 'flex',
        alignItems: 'center',
        padding: '10px 15px',
        backgroundColor: '#84dcc6',
        color: '#2c7a7b',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '16px',
        zIndex: 1000,
        transition: 'all 0.3s',
    };

    return (
        <div style={pageStyle}>
            <button
                className="admin-button logout-button"
                onClick={handleLogout}
                style={logoutButtonStyle}
            >
                <LogOut size={20} style={{ marginRight: '5px' }} />
                <span>Logout</span>
            </button>

            <h1 style={headerStyle}>User Management</h1>
            <div style={{ textAlign: 'center', marginBottom: '30px'}}>
                <button style={buttonStyle} onClick={handleCreateUser}>
                    <UserPlus size={20} style={{ marginRight: '5px', verticalAlign: 'middle' }} />
                    Create New User
                </button>
            </div>

            <table style={tableStyle}>
                <thead>
                <tr>
                    <th style={thStyle}>Username</th>
                    <th style={thStyle}>Email</th>
                    <th style={thStyle}>Role</th>
                    <th style={thStyle}>Actions</th>
                </tr>
                </thead>
                <tbody>
                {users.map((user) => (
                    <tr key={user.id} style={trHoverStyle}>
                        <td style={tdStyle}>
                            <User size={16} style={{ marginRight: '5px', verticalAlign: 'middle', color: '#84dcc6' }} />
                            {user.username}
                        </td>
                        <td style={tdStyle}>{user.email}</td>
                        <td style={tdStyle}>{user.role}</td>
                        <td style={tdStyle}>
                            <button
                                style={deleteButtonStyle}
                                onClick={() => handleDeleteUser(user.id)}
                            >
                                <Trash2 size={16} style={{ marginRight: '5px', verticalAlign: 'middle' }} />
                                Delete
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            <Modal isOpen={isModalOpen} onClose={handleCancel}>
                <div style={modalStyle}>
                    <h2 style={modalTitleStyle}>Create New User</h2>
                    <form onSubmit={handleSubmit}>
                        <select
                            name="personnelId"
                            onChange={handlePersonnelSelect}
                            style={inputStyle}
                            required
                        >
                            <option value="">Select Personnel</option>
                            {availablePersonnel.map((person) => (
                                <option key={person.id} value={person.id}>
                                    {person.firstName} {person.lastName} - {person.department}
                                </option>
                            ))}
                        </select>
                        <input
                            type="text"
                            name="username"
                            value={newUser.username}
                            onChange={handleInputChange}
                            placeholder="Username"
                            style={inputStyle}
                            required
                        />
                        <input
                            type="email"
                            name="email"
                            value={newUser.email}
                            onChange={handleInputChange}
                            placeholder="Email"
                            style={inputStyle}
                            required
                        />
                        <input
                            type="password"
                            name="password"
                            value={newUser.password}
                            onChange={handleInputChange}
                            placeholder="Password"
                            style={inputStyle}
                            required
                        />
                        <select
                            name="role"
                            value={newUser.role}
                            onChange={handleInputChange}
                            style={inputStyle}
                            required
                        >
                            <option value="">Select Role</option>
                            <option value="HR">HR</option>
                            <option value="IM">IM</option>
                            <option value="Admin">Admin</option>
                        </select>
                        <div style={{ textAlign: 'center', marginTop: '20px' }}>
                            <button type="submit" style={buttonStyle}>Create</button>
                            <button type="button" onClick={handleCancel} style={cancelButtonStyle}>Cancel</button>
                        </div>
                    </form>
                </div>
            </Modal>
        </div>
    );
};

export default UserManagement;