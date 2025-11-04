import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SidebarMenuLayout from './layouts/SidebarMenuLayout';
import HomePage from './pages/HomePage';
import Climb from './pages/Climb';
import Documents from './pages/Documents';
import Manage from './pages/Manage';
import DataBase from './pages/DataBase';
import Settings from './pages/Settings';

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
          <Route index element={<HomePage />} />
          <Route path="climb" element={<Climb />} />
          <Route path="documents" element={<Documents />} />
          <Route path="manage" element={<Manage />} />
          <Route path="database" element={<DataBase />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App
