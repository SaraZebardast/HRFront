import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axiosInstance from '../../api';

const InventoryForm = ({ inventory, onSubmit, onCancel }) => {
    const [selectedType, setSelectedType] = useState('');
    const [formData, setFormData] = useState({
        id: null,
        brand: '',
        model: '',
        serialNumber: '',
        entryDate: new Date(),
        assignmentType: 'Unassigned',
    });
    const [inventoryTypes, setInventoryTypes] = useState([]);

    useEffect(() => {
        fetchInventoryTypes();
        if (inventory) {
            setFormData({
                ...inventory,
                entryDate: new Date(inventory.entryDate),
            });
            setSelectedType(inventory.type ? inventory.type.name : '');
        }
    }, [inventory]);

    const fetchInventoryTypes = async () => {
        try {
            const response = await axiosInstance.get('/api/inventory-types');
            setInventoryTypes(response.data);
        } catch (error) {
            console.error('Error fetching inventory types:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleTypeChange = (e) => {
        setSelectedType(e.target.value);
    };

    const handleDateChange = (date) => {
        setFormData({ ...formData, entryDate: date });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const selectedTypeObj = inventoryTypes.find(type => type.name === selectedType);
        onSubmit({ ...formData, type: selectedTypeObj }, selectedTypeObj ? selectedTypeObj.id : null);
    };

    const formStyle = {
        display: 'flex',
        flexDirection: 'column',
        gap: '15px',
        padding: '20px',
        backgroundColor: '#f8f5f9',
        borderRadius: '10px',
    };

    const inputStyle = {
        padding: '10px',
        fontSize: '16px',
        border: '2px solid #b392ac',
        borderRadius: '5px',
    };

    const buttonStyle = {
        backgroundColor: '#735d78',
        color: 'white',
        border: 'none',
        padding: '10px 15px',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '16px',
    };

    return (
        <form onSubmit={handleSubmit} style={formStyle}>
            <select
                name="type"
                value={selectedType}
                onChange={handleTypeChange}
                required
                style={inputStyle}
            >
                <option value="">Select Inventory Type</option>
                {inventoryTypes.map((type) => (
                    <option key={type.id} value={type.name}>{type.name}</option>
                ))}
            </select>
            <input
                type="text"
                name="brand"
                placeholder="Brand"
                value={formData.brand}
                onChange={handleChange}
                required
                style={inputStyle}
            />
            <input
                type="text"
                name="model"
                placeholder="Model"
                value={formData.model}
                onChange={handleChange}
                required
                style={inputStyle}
            />
            <input
                type="text"
                name="serialNumber"
                placeholder="Serial Number"
                value={formData.serialNumber}
                onChange={handleChange}
                required
                style={inputStyle}
            />
            <DatePicker
                selected={formData.entryDate}
                onChange={handleDateChange}
                dateFormat="yyyy-MM-dd"
                customInput={<input style={inputStyle} />}
            />
            <div>
                <button type="submit" style={buttonStyle}>
                    {inventory ? 'Update' : 'Add'} Inventory
                </button>
                <button
                    type="button"
                    onClick={onCancel}
                    style={{...buttonStyle, backgroundColor: '#b392ac', marginLeft: '10px'}}
                >
                    Cancel
                </button>
            </div>
        </form>
    );
};

export default InventoryForm;