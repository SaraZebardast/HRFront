import React from 'react';

const InventoryTable = ({ inventory, onUpdate, onDelete }) => {
    const tableStyle = {
        width: '80%',
        margin: '20px auto',
        borderCollapse: 'separate',
        borderSpacing: '0 10px',
        backgroundColor: '#ffffff',
        boxShadow: '0 0 10px rgba(0,0,0,0.1)',
    };

    const thStyle = {
        backgroundColor: '#735d78',
        color: 'white',
        padding: '15px',
        textAlign: 'left',
    };

    const tdStyle = {
        padding: '15px',
        borderBottom: '1px solid #d1b3c4',
    };

    const buttonStyle = {
        backgroundColor: '#735d78',
        color: 'white',
        border: 'none',
        padding: '10px 15px',
        borderRadius: '5px',
        cursor: 'pointer',
        marginRight: '5px',
    };

    return (
        <table style={tableStyle}>
            <thead>
            <tr>
                <th style={thStyle}>Type</th>
                <th style={thStyle}>Brand</th>
                <th style={thStyle}>Model</th>
                <th style={thStyle}>Serial Number</th>
                <th style={thStyle}>Entry Date</th>
                <th style={thStyle}>Assignment Type</th>
                <th style={thStyle}>Actions</th>
            </tr>
            </thead>
            <tbody>
            {inventory.map((item) => (
                <tr key={item.id}>
                    <td style={tdStyle}>{item.type.name}</td>
                    <td style={tdStyle}>{item.brand}</td>
                    <td style={tdStyle}>{item.model}</td>
                    <td style={tdStyle}>{item.serialNumber}</td>
                    <td style={tdStyle}>{new Date(item.entryDate).toLocaleDateString()}</td>
                    <td style={tdStyle}>{item.assignmentType}</td>
                    <td style={tdStyle}>
                        <button style={buttonStyle} onClick={() => onUpdate(item)}>Update</button>
                        <button style={{...buttonStyle, backgroundColor: '#b392ac'}} onClick={() => onDelete(item.id)}>Delete</button>
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    );
};

export default InventoryTable;