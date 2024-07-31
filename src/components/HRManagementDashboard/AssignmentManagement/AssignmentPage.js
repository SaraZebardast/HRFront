import React, {useState, useEffect} from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Modal from '../PersonnelManagement/Modal';
import axiosInstance from '../../../api';

const AssignmentOperations = () => {
    const [personnel, setPersonnel] = useState([]);
    const [filteredPersonnel, setFilteredPersonnel] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedPerson, setSelectedPerson] = useState(null);
    const [assignments, setAssignments] = useState([]);
    const [isAssignmentModalOpen, setIsAssignmentModalOpen] = useState(false);
    const [isNewAssignmentModalOpen, setIsNewAssignmentModalOpen] = useState(false);
    const [availableInventory, setAvailableInventory] = useState([]);
    const [newAssignment, setNewAssignment] = useState({
        inventoryId: '',
        assignmentDate: new Date()
    });
    const [returnAssignment, setReturnAssignment] = useState({
        assignmentId: null,
        returnDate: new Date()
    });

    useEffect(() => {
        fetchPersonnel();
    }, []);

    useEffect(() => {
        const filtered = personnel.filter(
            person =>
                person.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                person.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                person.id.toString().includes(searchTerm)
        );
        setFilteredPersonnel(filtered);
    }, [searchTerm, personnel]);

    const fetchPersonnel = async () => {
        try {
            const response = await axiosInstance.get('/api/personnel');
            setPersonnel(response.data.filter(person => person.active));
        } catch (error) {
            console.error('Error fetching personnel:', error);
        }
    };

    const fetchAssignments = async (personnelId) => {
        try {
            const response = await axiosInstance.get(`/api/assignments/personnel/${personnelId}`);
            setAssignments(response.data);
        } catch (error) {
            console.error('Error fetching assignments:', error);
        }
    };

    const fetchAvailableInventory = async () => {
        try {
            const response = await axiosInstance.get('/api/inventory/search', {
                params: {assignmentType: 'Unassigned'}
            });
            setAvailableInventory(response.data);
        } catch (error) {
            console.error('Error fetching available inventory:', error);
        }
    };

    const handleAssignmentClick = (person) => {
        setSelectedPerson(person);
        fetchAssignments(person.id);
        setIsAssignmentModalOpen(true);
    };

    const handleNewAssignmentClick = () => {
        fetchAvailableInventory();
        setIsNewAssignmentModalOpen(true);
    };

    const handleCreateAssignment = async () => {
        try {
            await axiosInstance.post('/api/assignments', null, {
                params: {
                    personnelId: selectedPerson.id,
                    inventoryId: newAssignment.inventoryId,
                    assignedById: selectedPerson.id,
                    assignmentDate: newAssignment.assignmentDate
                }
            });
            await axiosInstance.patch(`/api/inventory/${newAssignment.inventoryId}/assignment-type?assignmentType=Assigned`);

            fetchAssignments(selectedPerson.id);
            setIsNewAssignmentModalOpen(false);

            setNewAssignment({
                inventoryId: '',
                assignmentDate: new Date()
            });

            fetchAvailableInventory();
        } catch (error) {
            console.error('Error creating assignment or updating inventory:', error);
        }
    };

    const handleReturnAssignment = async () => {
        try {
            await axiosInstance.put(`/api/assignments/${returnAssignment.assignmentId}/return`, null, {
                params: {
                    returnedToId: selectedPerson.id,
                    returnDate: returnAssignment.returnDate
                }
            });
            fetchAssignments(selectedPerson.id);
            setReturnAssignment({assignmentId: null, returnDate: new Date()});

            const assignment = assignments.find(a => a.id === returnAssignment.assignmentId);
            if (assignment) {
                await axiosInstance.patch(`/api/inventory/${assignment.inventory.id}/assignment-type?assignmentType=Unassigned`);
            }

            fetchAvailableInventory();
        } catch (error) {
            console.error('Error returning assignment or updating inventory:', error);
        }
    };

    const pageStyle = {
        backgroundColor: '#e6f7e6',
        minHeight: '100vh',
        padding: '20px',
        fontFamily: 'Arial, sans-serif',
    };

    const searchBoxStyle = {
        display: 'flex',
        justifyContent: 'center',
        margin: '20px 0',
    };

    const inputStyle = {
        width: '50%',
        padding: '10px',
        fontSize: '16px',
        border: '2px solid #4caf50',
        borderRadius: '5px',
    };

    const mainTableStyle = {
        width: '80%',
        margin: '0 auto',
        borderCollapse: 'separate',
        borderSpacing: '0 10px',
        backgroundColor: '#ffffff',
        boxShadow: '0 0 10px rgba(0,0,0,0.1)',
    };

    const modalTableStyle = {
        width: '100%',
        borderCollapse: 'separate',
        borderSpacing: '0 10px',
        backgroundColor: '#ffffff',
        boxShadow: '0 0 10px rgba(0,0,0,0.1)',
    };

    const thStyle = {
        backgroundColor: '#4caf50',
        color: 'white',
        padding: '15px',
        textAlign: 'left',
    };

    const tdStyle = {
        padding: '15px',
        borderBottom: '1px solid #e0e0e0',
    };

    const buttonStyle = {
        backgroundColor: '#4caf50',
        color: 'white',
        border: 'none',
        padding: '10px 15px',
        borderRadius: '5px',
        cursor: 'pointer',
    };

    const modalStyle = {
        backgroundColor: '#f1f8e9',
        padding: '20px',
        borderRadius: '10px',
        maxWidth: '80%',
        margin: '0 auto',
    };

    const modalHeaderStyle = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '20px',
        borderBottom: '1px solid #4caf50',
        paddingBottom: '10px',
    };

    const modalTitleStyle = {
        color: '#2e7d32',
        margin: 0,
        fontSize: '1.5rem',
        flex: 1,
        textAlign: 'center',
    };

    const closeButtonStyle = {
        backgroundColor: 'transparent',
        border: 'none',
        cursor: 'pointer',
        fontSize: '1.5rem',
        fontWeight: 'bold',
        color: '#e53935',
        padding: '0',
        lineHeight: '1',
    };

    const modalContentStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    };

    const tableContainerStyle = {
        width: '100%',
        overflowX: 'auto',
    };

    return (
        <div style={pageStyle}>
            <div style={searchBoxStyle}>
                <input
                    type="text"
                    placeholder="Search by name or ID"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={inputStyle}
                />
            </div>
            <table style={mainTableStyle}>
                <thead>
                <tr>
                    <th style={thStyle}>ID</th>
                    <th style={thStyle}>First Name</th>
                    <th style={thStyle}>Last Name</th>
                    <th style={thStyle}>Department</th>
                    <th style={thStyle}>Actions</th>
                </tr>
                </thead>
                <tbody>
                {filteredPersonnel.map((person) => (
                    <tr key={person.id}>
                        <td style={tdStyle}>{person.id}</td>
                        <td style={tdStyle}>{person.firstName}</td>
                        <td style={tdStyle}>{person.lastName}</td>
                        <td style={tdStyle}>{person.department}</td>
                        <td style={tdStyle}>
                            <button onClick={() => handleAssignmentClick(person)} style={buttonStyle}>
                                Assignments
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            <Modal isOpen={isAssignmentModalOpen} onClose={() => setIsAssignmentModalOpen(false)}>
                <div style={modalStyle}>
                    <div style={modalHeaderStyle}>
                        <h2 style={modalTitleStyle}>Assignments for {selectedPerson?.firstName} {selectedPerson?.lastName}</h2>
                    </div>
                    <div style={modalContentStyle}>
                        <div style={{display: 'flex', justifyContent: 'space-between', width: '100%', marginBottom: '20px'}}>
                            <button onClick={handleNewAssignmentClick} style={buttonStyle}>New Assignment</button>
                            <button onClick={() => setIsAssignmentModalOpen(false)} style={{...buttonStyle, backgroundColor: '#e53935'}}>
                                Cancel
                            </button>
                        </div>
                        <div style={tableContainerStyle}>
                            <table style={modalTableStyle}>
                                <thead>
                                <tr>
                                    <th style={thStyle}>Type</th>
                                    <th style={thStyle}>Brand</th>
                                    <th style={thStyle}>Model</th>
                                    <th style={thStyle}>Assignment Date</th>
                                    <th style={thStyle}>Actions</th>
                                </tr>
                                </thead>
                                <tbody>
                                {assignments.map((assignment) => (
                                    <tr key={assignment.id}>
                                        <td style={tdStyle}>{assignment.inventory.type.name}</td>
                                        <td style={tdStyle}>{assignment.inventory.brand}</td>
                                        <td style={tdStyle}>{assignment.inventory.model}</td>
                                        <td style={tdStyle}>{new Date(assignment.assignmentDate).toLocaleDateString()}</td>
                                        <td style={tdStyle}>
                                            <button onClick={() => setReturnAssignment({
                                                ...returnAssignment,
                                                assignmentId: assignment.id
                                            })} style={buttonStyle}>
                                                Return
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                        {returnAssignment.assignmentId && (
                            <div style={{marginTop: '20px', width: '100%', textAlign: 'center'}}>
                                <h3 style={{color: '#2e7d32'}}>Return Assignment</h3>
                                <DatePicker
                                    selected={returnAssignment.returnDate}
                                    onChange={(date) => setReturnAssignment({...returnAssignment, returnDate: date})}
                                    style={{...inputStyle, marginRight: '10px', marginBottom: '10px'}}
                                />
                                <div>
                                    <button onClick={handleReturnAssignment}
                                            style={{...buttonStyle, marginRight: '10px'}}>Confirm Return
                                    </button>
                                    <button onClick={() => setReturnAssignment({
                                        assignmentId: null,
                                        returnDate: new Date()
                                    })} style={{...buttonStyle, backgroundColor: '#e53935'}}>
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </Modal>

            <Modal isOpen={isNewAssignmentModalOpen} onClose={() => setIsNewAssignmentModalOpen(false)}>
                <div style={modalStyle}>
                    <div style={modalHeaderStyle}>
                        <h2 style={modalTitleStyle}>New Assignment</h2>
                    </div>
                    <div style={modalContentStyle}>
                        <select
                            value={newAssignment.inventoryId}
                            onChange={(e) => setNewAssignment({...newAssignment, inventoryId: e.target.value})}
                            style={{...inputStyle, marginBottom: '10px', width: '100%'}}
                        >
                            <option value="">Select Inventory</option>
                            {availableInventory.map((item) => (
                                <option key={item.id} value={item.id}>
                                    {item.type.name} - {item.brand} {item.model}
                                </option>
                            ))}
                        </select>
                        <DatePicker
                            selected={newAssignment.assignmentDate}
                            onChange={(date) => setNewAssignment({...newAssignment, assignmentDate: date})}
                            style={{...inputStyle, marginBottom: '10px', width: '100%'}}
                        />
                        <div>
                            <button onClick={handleCreateAssignment}
                                    style={{...buttonStyle, marginRight: '10px'}}>Create Assignment
                            </button>
                            <button onClick={() => setIsNewAssignmentModalOpen(false)}
                                    style={{...buttonStyle, backgroundColor: '#e53935'}}>Cancel
                            </button>
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default AssignmentOperations;