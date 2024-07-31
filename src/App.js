import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import InventoryPage from './components/InventoryManagement/InventoryPage';
import SignIn from "./components/SignIn/SignIn";
import ManagementDashboard from "./components/HRManagementDashboard/ManagementDashboard";
import ProtectedRoute from './components/ProtectedRoute';
import UnauthorizedPage from './components/UnauthorizedPage';
import AdminPage from "./components/Admin/AdminPage";
import useAuth from './hooks/useAuth';
import './App.css';
import PersonnelArchivePage from "./components/Admin/PersonnelArchivePage";
import AssignmentArchivePage from "./components/Admin/AssignmentArchivePage";
import UserManagementPage from "./components/Admin/UserManagementPage";
import InventoryTypeManagementPage from "./components/Admin/InventoryTypeManagementPage";

const App = () => {
    const { auth, login, logout } = useAuth();

    return (
        <Router>
            <div>
                <Routes>
                    <Route path="/" element={<SignIn login={login} />} />
                    <Route path="/unauthorized" element={<UnauthorizedPage />} />

                    <Route
                        element={<ProtectedRoute isAuthenticated={auth.isAuthenticated} allowedRoles={['HR', 'Admin']}
                                                 userRole={auth.userRole} />}>
                        <Route path="/hrpage" element={<ManagementDashboard logout={logout} />} />
                    </Route>

                    <Route
                        element={<ProtectedRoute isAuthenticated={auth.isAuthenticated} allowedRoles={['IM', 'Admin']}
                                                 userRole={auth.userRole} />}>
                        <Route path="/inventorypage" element={<InventoryPage logout={logout} />} />
                    </Route>

                    <Route
                        element={<ProtectedRoute isAuthenticated={auth.isAuthenticated} allowedRoles={['Admin']}
                                                 userRole={auth.userRole} />}>
                        <Route path="/adminpage" element={<AdminPage logout={logout} />} />
                        <Route path="/personnelarchivepage" element={<PersonnelArchivePage logout={logout} />} />
                        <Route path="/assignmentarchivepage" element={<AssignmentArchivePage logout={logout} />} />
                        <Route path="/userpage" element={<UserManagementPage logout={logout} />} />
                        <Route path="/typepage" element={<InventoryTypeManagementPage logout={logout} />} />
                    </Route>

                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;