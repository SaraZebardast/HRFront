import React from 'react';

const PersonnelTable = ({ personnel, onUpdate, onTerminate }) => {
    const tableStyle = {
        width: '100%',
        borderCollapse: 'separate',
        borderSpacing: '0 10px',
        backgroundColor: '#ffffff',
        boxShadow: '0 0 10px rgba(0,0,0,0.1)',
    };

    const thStyle = {
        backgroundColor: '#1565c0',
        color: 'white',
        padding: '15px',
        textAlign: 'left',
    };

    const tdStyle = {
        padding: '15px',
        borderBottom: '1px solid #e0e0e0',
    };

    const buttonStyle = {
        margin: '0 5px',
        padding: '5px 10px',
        borderRadius: '5px',
        border: 'none',
        cursor: 'pointer',
        color: 'white',
    };

    return (
        <table style={tableStyle}>
            <thead>
            <tr>
                <th style={thStyle}>First Name</th>
                <th style={thStyle}>Last Name</th>
                <th style={thStyle}>Gender</th>
                <th style={thStyle}>Birth Date</th>
                <th style={thStyle}>Marital Status</th>
                <th style={thStyle}>TCKN</th>
                <th style={thStyle}>Education Status</th>
                <th style={thStyle}>Department</th>
                <th style={thStyle}>Position</th>
                <th style={thStyle}>Active</th>
                <th style={thStyle}>Actions</th>
            </tr>
            </thead>
            <tbody>
            {personnel.map((person) => (
                <tr key={person.id}>
                    <td style={tdStyle}>{person.firstName}</td>
                    <td style={tdStyle}>{person.lastName}</td>
                    <td style={tdStyle}>{person.gender}</td>
                    <td style={tdStyle}>{new Date(person.birthDate).toLocaleDateString()}</td>
                    <td style={tdStyle}>{person.maritalStatus}</td>
                    <td style={tdStyle}>{person.tckn}</td>
                    <td style={tdStyle}>{person.educationStatus}</td>
                    <td style={tdStyle}>{person.department}</td>
                    <td style={tdStyle}>{person.position}</td>
                    <td style={tdStyle}>{person.active ? 'Yes' : 'No'}</td>
                    <td style={tdStyle}>
                        <button style={{...buttonStyle, backgroundColor: '#4caf50'}} onClick={() => onUpdate(person)}>Update</button>
                        <button style={{...buttonStyle, backgroundColor: '#f44336'}} onClick={() => onTerminate(person.id)}>Terminate</button>
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    );
};

export default PersonnelTable;