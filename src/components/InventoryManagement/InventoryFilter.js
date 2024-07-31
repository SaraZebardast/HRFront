import React, { useState } from 'react';

const InventoryFilter = ({ onFilter }) => {
    const [assignmentType, setAssignmentType] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onFilter({ assignmentType });
    };

    const formStyle = {
        display: 'flex',
        justifyContent: 'center',
        margin: '20px 0',
    };

    const selectStyle = {
        width: '300px',
        padding: '10px',
        fontSize: '16px',
        border: '2px solid #b392ac',
        borderRadius: '5px',
        marginRight: '10px',
    };

    const buttonStyle = {
        backgroundColor: '#735d78',
        color: 'white',
        border: 'none',
        padding: '10px 15px',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '16px',
        width: '10%'
    };

    return (
        <form onSubmit={handleSubmit} style={formStyle}>
            <select
                value={assignmentType}
                onChange={(e) => setAssignmentType(e.target.value)}
                style={selectStyle}
            >
                <option value="">All Assignment Types</option>
                <option value="Assigned">Assigned</option>
                <option value="Unassigned">Unassigned</option>
            </select>
            <button type="submit" style={buttonStyle}>
                Filter
            </button>
        </form>
    );
};

export default InventoryFilter;