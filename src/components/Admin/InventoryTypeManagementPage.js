import React, { useState, useEffect } from 'react';
import axios from 'axios';

const InventoryTypesManager = () => {
    const [inventoryTypes, setInventoryTypes] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedType, setSelectedType] = useState(null);
    const [formData, setFormData] = useState({ name: '' });

    useEffect(() => {
        fetchInventoryTypes();
    }, []);

    const fetchInventoryTypes = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/inventory-types');
            setInventoryTypes(response.data);
        } catch (error) {
            console.error('Error fetching inventory types:', error);
        }
    };

    const handleAddType = () => {
        setSelectedType(null);
        setFormData({ name: '' });
        setIsModalOpen(true);
    };

    const handleUpdateType = (type) => {
        setSelectedType(type);
        setFormData({ name: type.name });
        setIsModalOpen(true);
    };

    const handleDeleteType = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/api/inventory-types/${id}`);
            fetchInventoryTypes();
        } catch (error) {
            console.error('Error deleting inventory type:', error);
            alert('Inventory type is being used');
        }
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            if (selectedType) {
                await axios.put(`http://localhost:8080/api/inventory-types/${selectedType.id}`, formData);
            } else {
                await axios.post('http://localhost:8080/api/inventory-types', formData);
            }
            setIsModalOpen(false);
            fetchInventoryTypes();
        } catch (error) {
            console.error('Error submitting inventory type:', error);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const styles = {
        container: {
            minHeight: '100vh',
            background: 'linear-gradient(to bottom right, #f3e8fd, #e0c3fc)',
            padding: '2rem',
            fontFamily: 'Arial, sans-serif',
            animation: 'fadeIn 0.5s ease-out',
        },
        content: {
            maxWidth: '1000px',
            margin: '0 auto',
            backgroundColor: '#ffffff',
            borderRadius: '0.5rem',
            boxShadow: '0 4px 15px rgba(157, 78, 221, 0.1)',
            padding: '2rem',
            animation: 'slideDown 0.5s ease-out',
        },
        title: {
            fontSize: '2.5rem',
            fontWeight: 'bold',
            color: '#9d4edd',
            marginBottom: '2rem',
            textAlign: 'center',
            animation: 'fadeIn 1s ease-out',
        },
        buttonContainer: {
            display: 'flex',
            justifyContent: 'center',
            gap: '1rem',
            marginTop: '1rem',
        },
        actionButtonContainer: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.5rem',
        },
        button: {
            backgroundColor: '#9d4edd',
            color: 'white',
            border: 'none',
            padding: '0.5rem 1rem',
            borderRadius: '9999px',
            fontWeight: 'bold',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            outline: 'none',
            width: '30%',
            fontSize: '1rem'
        },
        table: {
            width: '100%',
            borderCollapse: 'separate',
            borderSpacing: '0 0.5rem',
            marginTop: '2rem',
        },
        th: {
            backgroundColor: '#9d4edd',
            color: 'white',
            textAlign: 'center',
            padding: '1rem 2.5rem',  // Increased horizontal padding
            transition: 'background-color 0.3s ease',
            fontWeight: 'bold',
            letterSpacing: '0.05em'
        },
        td: {
            padding: '1rem',
            borderBottom: '1px solid #e0c3fc',
            transition: 'background-color 0.3s ease',
            textAlign: 'center'
        },
        modal: {
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(157, 78, 221, 0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            animation: 'fadeIn 0.3s ease-out',
        },
        modalContent: {
            backgroundColor: 'white',
            padding: '2rem',
            borderRadius: '0.5rem',
            width: '400px',
            animation: 'scaleIn 0.3s ease-out',
            boxShadow: '0 4px 15px rgba(157, 78, 221, 0.2)',
        },
        input: {
            width: '100%',
            padding: '0.5rem',
            marginBottom: '1rem',
            border: '1px solid #9d4edd',
            borderRadius: '0.25rem',
            transition: 'border-color 0.3s ease',
        },
    };

    return (
        <div style={styles.container}>
            <style>
                {`
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes slideDown {
                    from { transform: translateY(-20px); opacity: 0; }
                    to { transform: translateY(0); opacity: 1; }
                }
                @keyframes scaleIn {
                    from { transform: scale(0.9); opacity: 0; }
                    to { transform: scale(1); opacity: 1; }
                }
                `}
            </style>
            <div style={styles.content}>
                <h1 style={styles.title}>Inventory Types Management</h1>

                <div style={styles.buttonContainer}>
                    <button
                        style={styles.button}
                        onClick={handleAddType}
                        onMouseOver={(e) => e.target.style.backgroundColor = '#b168e8'}
                        onMouseOut={(e) => e.target.style.backgroundColor = '#9d4edd'}
                    >
                        Add New Inventory Type
                    </button>
                </div>

                <table style={styles.table}>
                    <thead>
                    <tr>
                        <th style={styles.th}>ID</th>
                        <th style={styles.th}>Name</th>
                        <th style={styles.th}>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {inventoryTypes.map((type, index) => (
                        <tr key={type.id} style={{ animation: `fadeIn ${0.3 + index * 0.1}s ease-out` }}>
                            <td style={styles.td}>{type.id}</td>
                            <td style={styles.td}>{type.name}</td>
                            <td style={styles.td}>
                                <div style={styles.actionButtonContainer}>
                                    <button
                                        style={styles.button}
                                        onClick={() => handleUpdateType(type)}
                                        onMouseOver={(e) => e.target.style.backgroundColor = '#b168e8'}
                                        onMouseOut={(e) => e.target.style.backgroundColor = '#9d4edd'}
                                    >
                                        Update
                                    </button>
                                    <button
                                        style={{ ...styles.button, backgroundColor: '#7b2cbf' }}
                                        onClick={() => handleDeleteType(type.id)}
                                        onMouseOver={(e) => e.target.style.backgroundColor = '#6a0dad'}
                                        onMouseOut={(e) => e.target.style.backgroundColor = '#7b2cbf'}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>

                {isModalOpen && (
                    <div style={styles.modal}>
                        <div style={styles.modalContent}>
                            <h2 style={{ ...styles.title, fontSize: '1.5rem', marginBottom: '1rem' }}>
                                {selectedType ? 'Update' : 'Add'} Inventory Type
                            </h2>
                            <form onSubmit={handleFormSubmit}>
                                <input
                                    style={styles.input}
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Inventory Type Name"
                                    required
                                />
                                <div style={styles.buttonContainer}>
                                    <button
                                        type="submit"
                                        style={styles.button}
                                        onMouseOver={(e) => e.target.style.backgroundColor = '#b168e8'}
                                        onMouseOut={(e) => e.target.style.backgroundColor = '#9d4edd'}
                                    >
                                        {selectedType ? 'Update' : 'Add'} Type
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setIsModalOpen(false)}
                                        style={{ ...styles.button, backgroundColor: '#c39bd3' }}
                                        onMouseOver={(e) => e.target.style.backgroundColor = '#b19cd9'}
                                        onMouseOut={(e) => e.target.style.backgroundColor = '#c39bd3'}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default InventoryTypesManager;
