import React from 'react'; 
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'; 
import SidebarMenuLayout from './layouts/SidebarMenuLayout';
import HomePage from './pages/HomePage';
import Climb from './pages/Climb';
import Documents from './pages/Documents';
import Manage from './pages/Manage';
import DataBase from './pages/DataBase';
import Settings from './pages/Settings';

//Subpages
import MiniCardPage from './pages/subpage/MiniCardPage';
import DisclaimerPage from './pages/subpage/DisclaimerPage';
import PhotoDocuments from './pages/subpage/PhotoDocuments';
import MemberForms from './pages/subpage/MemberForms';
import QueueClimb from './pages/subpage/QueueClimb';
import RegisterAttendance from './pages/subpage/RegisterAttendance';

function App() {
  // Mock user para demonstração sem API
  const mockUser = {
    name: "Usuário Demo",
    userType: "admin",
    avatar: null
  };

  return (
    <BrowserRouter basename="/cume-app">
      <Routes>
        {/* Todas as rotas agora são públicas */}
        <Route path="/" element={<SidebarMenuLayout userRole="admin" user={mockUser} />}>
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
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
