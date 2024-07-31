import React, { useState } from 'react';

const PersonnelFilter = ({ departments, onFilter }) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [tckn, setTckn] = useState('');
    const [department, setDepartment] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onFilter({ firstName, lastName, tckn, department });
    };

    const inputStyle = {
        width: 'calc(25% - 10px)',
        padding: '10px',
        fontSize: '16px',
        border: '2px solid #1565c0',
        borderRadius: '5px',
        margin: '0 5px 10px 0',
    };

    const buttonStyle = {
        backgroundColor: '#1565c0',
        color: 'white',
        border: 'none',
        padding: '10px 15px',
        borderRadius: '5px',
        cursor: 'pointer',
        width:'10%'
    };

    return (
        <form onSubmit={handleSubmit}
              style={{display: 'flex', flexWrap: 'wrap', marginBottom: '20px', justifyContent: 'center'}}>
            <input
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                style={inputStyle}
            />
            <input
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                style={inputStyle}
            />
            <input
                type="text"
                placeholder="TCKN"
                value={tckn}
                onChange={(e) => setTckn(e.target.value)}
                style={inputStyle}
            />
            <select value={department} onChange={(e) => setDepartment(e.target.value)} style={inputStyle}>
                <option value="">Select Department</option>
                {departments.map((dept) => (
                    <option key={dept.id} value={dept.name}>
                        {dept.name}
                    </option>
                ))}
            </select>
            <div style={{width: '100%', display: 'flex', justifyContent: 'center', marginBottom: '-10px'}}>
                <button type="submit" style={buttonStyle}>Filter</button>
            </div>
        </form>

    );
};

export default PersonnelFilter;