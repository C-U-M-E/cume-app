import React, { useContext } from 'react'; 
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'; 
import { AuthProvider, AuthContext } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import SidebarMenuLayout from './layouts/SidebarMenuLayout';
import HomePage from './pages/HomePage';
import Climb from './pages/Climb';
import Documents from './pages/Documents';
import Manage from './pages/Manage';
import DataBase from './pages/DataBase';
import Settings from './pages/Settings';
import Login from './pages/Login';
import Register from './pages/Register';

//Subpages
import MiniCardPage from './pages/subpage/MiniCardPage';
import DisclaimerPage from './pages/subpage/DisclaimerPage';
import PhotoDocuments from './pages/subpage/PhotoDocuments';
import MemberForms from './pages/subpage/MemberForms';
import QueueClimb from './pages/subpage/QueueClimb';
import RegisterAttendance from './pages/subpage/RegisterAttendance';


// Componente auxiliar para passar os dados do contexto para o Layout
const LayoutWithAuth = () => {
  const { user } = useContext(AuthContext);
  
  // Mapeia o userType do banco (standard/admin) para as roles do front
  // Se o backend enviar "admin", usa admin, senão usa "user"
  const userRole = user?.userType === 'admin' ? 'admin' : 'user';

  return <SidebarMenuLayout userRole={userRole} user={user} />;
};

function App() {

  return (
    <AuthProvider>
    <BrowserRouter basename="/cume-app">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

          {/* Rotas Protegidas (Exigem Login) */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <LayoutWithAuth />
              </ProtectedRoute>
            }
          >
          <Route index element={<HomePage />} />
          <Route path="climb">
            <Route index element={<Climb />} />
            <Route path="queue" element={<QueueClimb />} />
            <Route path="register-attendance" element={<RegisterAttendance />} />
          </Route>
          <Route path="documents">
            <Route index element={<Documents />} />
            <Route path="minicardpage" element={<MiniCardPage />} />
            <Route path="disclaimer" element={<DisclaimerPage />} />
            <Route path="photo-documents" element={<PhotoDocuments />} />
            <Route path="member-forms" element={<MemberForms />} />
          </Route>
          <Route path="manage" element={<Manage />} />
          <Route path="database" element={<DataBase />} />
          <Route path="settings" element={<Settings />} />
        </Route>
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
    </AuthProvider>
  );
}

export default App
