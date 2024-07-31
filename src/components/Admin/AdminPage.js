import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, Package, Archive, ChevronDown, LogOut, UserCog, List } from 'lucide-react';
import './AdminPage.css';

const AdminPage = ({ logout }) => {
    const navigate = useNavigate();
    const [showArchiveDropdown, setShowArchiveDropdown] = useState(false);

    const buttons = [
        { label: 'HR Management', icon: Users, onClick: () => navigate('/hrpage') },
        { label: 'User Management', icon: UserCog, onClick: () => navigate('/userpage') },
        { label: 'Inventory', icon: Package, onClick: () => navigate('/inventorypage') },
        { label: 'Inventory Types', icon: List, onClick: () => navigate('/typepage') }, // New button
    ];

    const toggleArchiveDropdown = () => {
        setShowArchiveDropdown(!showArchiveDropdown);
    };

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <div className="admin-page">
            <div className="admin-container">
                <h1 className="admin-title">Welcome, Admin</h1>
                <div className="button-container">
                    {buttons.map((button, index) => (
                        <button
                            key={index}
                            className="admin-button"
                            onClick={button.onClick}
                        >
                            <button.icon size={20} />
                            <span>{button.label}</span>
                        </button>
                    ))}
                    <div className="dropdown">
                        <button
                            className="admin-button dropdown-toggle"
                            onClick={toggleArchiveDropdown}
                        >
                            <Archive size={20} />
                            <span>Archives</span>
                            <ChevronDown size={16} />
                        </button>
                        {showArchiveDropdown && (
                            <div className="dropdown-menu">
                                <button onClick={() => navigate('/personnelarchivepage')}>
                                    Personnel Archive
                                </button>
                                <button onClick={() => navigate('/assignmentarchivepage')}>
                                    Assignment Archive
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <button
                className="admin-button logout-button"
                onClick={handleLogout}
            >
                <LogOut size={20} />
                <span>Logout</span>
            </button>
            <footer className="admin-footer">
                © {new Date().getFullYear()} J FORCE. All rights reserved.
            </footer>
        </div>
    );
};

export default AdminPage;