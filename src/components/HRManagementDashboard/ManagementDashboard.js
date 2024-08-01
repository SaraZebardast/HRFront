import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TabBar from './TabBar';
import PersonnelManagement from './PersonnelManagement/PersonnelPage';
import AssignmentPage from "./AssignmentManagement/AssignmentPage";
import { LogOut } from 'lucide-react';

const ManagementDashboard = ({ logout }) => {
    const [activeTab, setActiveTab] = useState('personnel');
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <div style={{ position: 'relative', minHeight: '100vh' }}>
            <button
                className="admin-button logout-button"
                onClick={handleLogout}
                style={{
                    position: 'absolute',
                    left: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    padding: '10px 15px',
                    backgroundColor: '#c62828',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    fontSize: '16px',
                    zIndex: 1000,
                    width: '10%',
                    height: '3%'

                }}
            >
                <LogOut size={20} style={{ marginRight: '5px' }} />
                <span>Logout</span>
            </button>

            <TabBar activeTab={activeTab} onTabChange={setActiveTab} />
            {activeTab === 'personnel' ? <PersonnelManagement /> : <AssignmentPage />}
        </div>
    );
};


export default ManagementDashboard;