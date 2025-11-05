import { BrowserRouter, Routes, Route } from 'react-router-dom';
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

function App() {
  // Mock do usuário - em produção viria de um contexto/auth
  const user = {
    name: "Gabriel Filho",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop"
  };

  // Mock do role - em produção viria de um contexto/auth
  const userRole = "user"; // "user", "member", "admin"

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SidebarMenuLayout userRole={userRole} user={user} />}>
          //pages
          <Route index element={<HomePage />} />
          <Route path="climb">
            <Route index element={<Climb />} />
            <Route path="queue" element={<QueueClimb />} />
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
      </Routes>
    </BrowserRouter>
  );
}

export default App
