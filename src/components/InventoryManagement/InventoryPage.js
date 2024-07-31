import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import InventoryFilter from './InventoryFilter';
import InventoryTable from './InventoryTable';
import InventoryForm from './InventoryForm';
import Modal from '../HRManagementDashboard/PersonnelManagement/Modal';
import axiosInstance from '../../api';
import { LogOut } from 'lucide-react';

const InventoryManagement = ({ logout }) => {
    const [inventory, setInventory] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedInventory, setSelectedInventory] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchInventory();
    }, []);

    const fetchInventory = async (filters = {}) => {
        try {
            const response = await axiosInstance.get('/api/inventory/search', {params: filters});
            setInventory(response.data);
        } catch (error) {
            console.error('Error fetching inventory:', error);
        }
    };

    const handleFilter = (filters) => {
        fetchInventory(filters);
    };

    const handleAddInventory = () => {
        setSelectedInventory(null);
        setIsModalOpen(true);
    };

    const handleUpdateInventory = (inventory) => {
        setSelectedInventory(inventory);
        setIsModalOpen(true);
    };

    const handleDeleteInventory = async (id) => {
        try {
            await axiosInstance.delete(`/api/inventory/${id}`);
            fetchInventory();
        } catch (error) {
            console.error('Error deleting inventory:', error);
        }
    };

    const handleFormSubmit = async (inventoryData, type) => {
        try {
            if (selectedInventory) {
                await axiosInstance.put(`/api/inventory/${selectedInventory.id}`, inventoryData,{
                    params: { typeId: type }
                });
            } else {
                await axiosInstance.post(`/api/inventory?typeId=${parseInt(type)}`, inventoryData);
            }
            setIsModalOpen(false);
            fetchInventory();
        } catch (error) {
            console.error('Error submitting inventory data:', error);
            alert('An error occurred while submitting the form. Please try again.');
        }
    };

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const pageStyle = {
        backgroundColor: '#f8f5f9', // Lighter background
        minHeight: '100vh',
        padding: '20px',
        fontFamily: 'Arial, sans-serif',
        position: 'relative',
    };

    const buttonStyle = {
        backgroundColor: '#735d78',
        color: 'white',
        border: 'none',
        padding: '10px 15px',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '16px',
        marginTop: '20px',
        width: '30%'
    };

    const logoutButtonStyle = {
        position: 'absolute',
        top: '20px',
        left: '20px',
        display: 'flex',
        alignItems: 'center',
        padding: '10px 15px',
        backgroundColor: '#735d78',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '16px',
        zIndex: 1000,
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

            <InventoryFilter onFilter={handleFilter}/>
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '20px'}}>
                <button style={buttonStyle} onClick={handleAddInventory}>Add New Inventory</button>
            </div>
            <InventoryTable
                inventory={inventory}
                onUpdate={handleUpdateInventory}
                onDelete={handleDeleteInventory}
            />

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <InventoryForm
                    inventory={selectedInventory}
                    onSubmit={handleFormSubmit}
                    onCancel={() => setIsModalOpen(false)}
                />
            </Modal>
        </div>
    );
};

export default InventoryManagement;