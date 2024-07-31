import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const PersonnelForm = ({ departments, personnel, onSubmit, onCancel, checkTcknUniqueness }) => {
    const [formData, setFormData] = useState({
        id: null,
        firstName: '',
        lastName: '',
        gender: '',
        birthDate: new Date(),
        maritalStatus: '',
        tckn: '',
        educationStatus: '',
        department: '',
        position: '',
        active: false,
    });

    const [tcknError, setTcknError] = useState('');

    const educationStatusOptions = [
        'Associate Degree',
        "Bachelor's Degree",
        "Master's Degree",
        'Doctorate',
    ];

    useEffect(() => {
        if (personnel) {
            setFormData({
                ...personnel,
                birthDate: new Date(personnel.birthDate),
            });
        }
    }, [personnel]);

    const handleChange = async (e) => {
        const { name, value, type, checked } = e.target;
        if (name === 'tckn') {
            if (!/^\d{0,11}$/.test(value)) {
                return;
            }
            setTcknError(value.length === 11 || value.length === 0 ? '' : 'TCKN must be 11 digits');

            if (value.length === 11 && value !== personnel?.tckn) {
                const isUnique = await checkTcknUniqueness(value, formData.id);
                if (!isUnique) {
                    setTcknError('This TCKN is already in use');
                }
            }
        }
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleDateChange = (date) => {
        setFormData({ ...formData, birthDate: date });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!personnel || formData.tckn !== personnel.tckn) {
            if (formData.tckn.length !== 11) {
                setTcknError('TCKN must be 11 digits');
                return;
            }

            const isUnique = await checkTcknUniqueness(formData.tckn, formData.id);
            if (!isUnique) {
                setTcknError('This TCKN is already in use');
                return;
            }
        }
        setTcknError('');
        onSubmit(formData);
    };

    const inputStyle = {
        width: 'calc(50% - 10px)',
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
        margin: '0 5px',
    };

    return (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexWrap: 'wrap' }}>
            <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange}
                required
                style={inputStyle}
            />
            <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleChange}
                required
                style={inputStyle}
            />
            <select name="gender" value={formData.gender} onChange={handleChange} required style={inputStyle}>
                <option value="">Select Gender</option>
                <option value="M">Male</option>
                <option value="F">Female</option>
            </select>
            <DatePicker
                selected={formData.birthDate}
                onChange={handleDateChange}
                dateFormat="yyyy-MM-dd"
                style={inputStyle}
            />
            <select name="maritalStatus" value={formData.maritalStatus} onChange={handleChange} required style={inputStyle}>
                <option value="">Select Marital Status</option>
                <option value="Single">Single</option>
                <option value="Married">Married</option>
                <option value="Divorced">Divorced</option>
                <option value="Widowed">Widowed</option>
            </select>
            <input
                type="text"
                name="tckn"
                placeholder="TCKN (11 digits)"
                value={formData.tckn}
                onChange={handleChange}
                required
                maxLength="11"
                style={inputStyle}
            />
            {tcknError && <p style={{ color: 'red', width: '100%' }}>{tcknError}</p>}
            <select
                name="educationStatus"
                value={formData.educationStatus}
                onChange={handleChange}
                required
                style={inputStyle}
            >
                <option value="">Select Education Status</option>
                {educationStatusOptions.map((status, index) => (
                    <option key={index} value={status}>
                        {status}
                    </option>
                ))}
            </select>
            <select name="department" value={formData.department} onChange={handleChange} required style={inputStyle}>
                <option value="">Select Department</option>
                {departments.map((dept) => (
                    <option key={dept.id} value={dept.name}>
                        {dept.name}
                    </option>
                ))}
            </select>
            <input
                type="text"
                name="position"
                placeholder="Position"
                value={formData.position}
                onChange={handleChange}
                style={inputStyle}
            />
            <label style={{ width: '100%', margin: '10px 0' }}>
                <input
                    type="checkbox"
                    name="active"
                    checked={formData.active}
                    onChange={handleChange}
                />
                Active
            </label>
            <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                <button type="submit" style={buttonStyle}>{personnel ? 'Update' : 'Add'} Personnel</button>
                <button type="button" style={{...buttonStyle, backgroundColor: '#f44336'}} onClick={onCancel}>Cancel</button>
            </div>
        </form>
    );
};

export default PersonnelForm;