import React from 'react';

const TabBar = ({ activeTab, onTabChange }) => {
    const tabContainerStyle = {
        display: 'flex',
        justifyContent: 'center',
        background: 'linear-gradient(to right, #3498db, #2ecc71)', // Blue to green gradient
        borderBottom: '1px solid #ccc',
    };

    const tabStyle = {
        display: 'flex',
        width: '100%', // Full width
        maxWidth: '1200px', // Limit maximum width if needed
    };

    const tabItemStyle = (isActive) => ({
        flex: 1,
        padding: '15px 20px', // Increased padding for larger buttons
        cursor: 'pointer',
        textAlign: 'center',
        backgroundColor: isActive ? '#fff' : 'transparent',
        color: isActive ? '#333' : '#fff', // Dark text for active, white for inactive
        fontWeight: isActive ? 'bold' : 'normal',
        borderRight: '1px solid #ccc',
        borderLeft: '1px solid #ccc',
        borderTop: '1px solid #ccc',
        borderBottom: isActive ? 'none' : '1px solid #ccc',
        borderRadius: '5px 5px 0 0',
        fontSize: '16px', // Slightly larger font size
        transition: 'all 0.3s ease', // Smooth transition for hover effects
    });

    return (
        <div style={tabContainerStyle}>
            <div style={tabStyle}>
                <div
                    style={tabItemStyle(activeTab === 'personnel')}
                    onClick={() => onTabChange('personnel')}
                >
                    Personnel Management
                </div>
                <div
                    style={tabItemStyle(activeTab === 'assignment')}
                    onClick={() => onTabChange('assignment')}
                >
                    Assignment Management
                </div>
            </div>
        </div>
    );
};

export default TabBar;