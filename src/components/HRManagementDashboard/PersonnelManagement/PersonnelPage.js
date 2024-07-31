import React, { useState, useEffect } from 'react';
import PersonnelFilter from './PersonnelFilter';
import PersonnelTable from './PersonnelTable';
import PersonnelForm from './PersonnelForm';
import Modal from './Modal';
import axiosInstance from '../../../api';

const PersonnelManagement = () => {
    const [personnel, setPersonnel] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isTerminationModalOpen, setIsTerminationModalOpen] = useState(false);
    const [selectedPersonnel, setSelectedPersonnel] = useState(null);
    const [terminationData, setTerminationData] = useState({
        terminationDate: new Date().toISOString().split('T')[0],
        terminationReason: ''
    });
    const departments = [
        { id: 1, name: "Research and Development" },
        { id: 2, name: "IT" },
        { id: 3, name: "Marketing" }
    ];

    useEffect(() => {
        fetchPersonnel();
    }, []);

    const fetchPersonnel = async (filters = {}) => {
        try {
            const response = await axiosInstance.get('/api/personnel/search', { params: filters });
            setPersonnel(response.data);
        } catch (error) {
            console.error('Error fetching personnel:', error);
        }
    };

    const handleFilter = (filters) => {
        fetchPersonnel(filters);
    };

    const handleAddPersonnel = () => {
        setSelectedPersonnel(null);
        setIsModalOpen(true);
    };

    const handleUpdatePersonnel = (personnel) => {
        setSelectedPersonnel(personnel);
        setIsModalOpen(true);
    };

    const handleTerminatePersonnel = (id) => {
        setSelectedPersonnel(personnel.find(p => p.id === id));
        setIsTerminationModalOpen(true);
    };

    const handleTerminationSubmit = async (e) => {
        e.preventDefault();
        try {
            await axiosInstance.patch(`/api/personnel/${selectedPersonnel.id}/terminate`, terminationData);
            setIsTerminationModalOpen(false);
            fetchPersonnel();
        } catch (error) {
            console.error('Error terminating personnel:', error);
            alert('An error occurred while terminating the personnel. Personnel is either a user or has an active assignment');
        }
    };

    const checkTcknUniqueness = async (tckn, id = null) => {
        try {
            const response = await axiosInstance.get(`/api/personnel/check-tckn/${tckn}`, { params: { id } });
            return response.data.isUnique;
        } catch (error) {
            console.error('Error checking TCKN uniqueness:', error);
            return false;
        }
    };

    const handleFormSubmit = async (personnelData) => {
        try {
            if (selectedPersonnel) {
                await axiosInstance.put(`/api/personnel/${selectedPersonnel.id}`, personnelData);
            } else {
                await axiosInstance.post('/api/personnel', personnelData);
            }
            setIsModalOpen(false);
            fetchPersonnel();
        } catch (error) {
            console.error('Error submitting personnel data:', error);
            alert('An error occurred while submitting the form. Please try again.');
        }
    };

    const pageStyle = {
        backgroundColor: '#e3f2fd',
        minHeight: '100vh',
        padding: '20px',
        fontFamily: 'Arial, sans-serif',
    };

    const buttonStyle = {
        backgroundColor: '#1565c0',
        color: 'white',
        border: 'none',
        padding: '10px 15px',
        borderRadius: '5px',
        cursor: 'pointer',
        marginBottom: '20px',
        width:'10%'
    };

    const modalStyle = {
        backgroundColor: '#f1f8e9',
        padding: '20px',
        borderRadius: '10px',
        maxWidth: '80%',
        margin: '0 auto',
    };

    return (
        <div style={pageStyle}>
            <PersonnelFilter departments={departments} onFilter={handleFilter}/>
            <div style={{display: 'flex', justifyContent: 'center', marginBottom: '0px'}}>
                <button style={buttonStyle} onClick={handleAddPersonnel}>New Personnel</button>
            </div>
            <PersonnelTable
                personnel={personnel}
                onUpdate={handleUpdatePersonnel}
                onTerminate={handleTerminatePersonnel}
            />

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <div style={modalStyle}>
                    <PersonnelForm
                        departments={departments}
                        personnel={selectedPersonnel}
                        onSubmit={handleFormSubmit}
                        onCancel={() => setIsModalOpen(false)}
                        checkTcknUniqueness={checkTcknUniqueness}
                    />
                </div>
            </Modal>

            <Modal isOpen={isTerminationModalOpen} onClose={() => setIsTerminationModalOpen(false)}>
                <div style={modalStyle}>
                    <h2>Terminate Personnel</h2>
                    <p>Terminating: {selectedPersonnel?.firstName} {selectedPersonnel?.lastName}</p>
                    <form onSubmit={handleTerminationSubmit}>
                        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                            <label style={{width: '100%', maxWidth: '500px', marginBottom: '10px'}}>
                                Termination Date:
                                <input
                                    type="date"
                                    value={terminationData.terminationDate}
                                    onChange={(e) => setTerminationData({
                                        ...terminationData,
                                        terminationDate: e.target.value
                                    })}
                                    required
                                    style={{width: '100%'}}
                                />
                            </label>
                            <label style={{width: '100%', maxWidth: '500px'}}>
                                Termination Reason:
                                <textarea
                                    value={terminationData.terminationReason}
                                    onChange={(e) => setTerminationData({
                                        ...terminationData,
                                        terminationReason: e.target.value
                                    })}
                                    required
                                    style={{width: '100%'}}
                                />
                            </label>
                        </div>


                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <button type="submit" style={{...buttonStyle, marginBottom: '10px', width: '30%'}}>Confirm
                                Termination
                            </button>
                            <button type="button" style={{...buttonStyle, backgroundColor: '#f44336', width: '30%'}}
                                    onClick={() => setIsTerminationModalOpen(false)}>Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </Modal>
        </div>
    );
};

export default PersonnelManagement;