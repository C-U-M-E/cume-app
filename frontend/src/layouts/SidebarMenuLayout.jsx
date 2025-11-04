import { useState } from 'react';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import SidebarMenu from '../components/SidebarMenu';

/**
 * Layout principal com SidebarMenu
 * 
 * @param {Object} props
 * @param {"admin" | "member" | "user"} props.userRole - Role do usuário (padrão: "user")
 * @param {Object} props.user - Objeto com informações do usuário { name, avatar }
 */
function SidebarMenuLayout({ userRole = "user", user = { name: "Usuário", avatar: null } }) {
  const [menuOpen, setMenuOpen] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  // Mapeia o caminho atual para o item ativo
  const getActiveItem = () => {
    const path = location.pathname;
    if (path === '/climb') return 'Escalar';
    if (path === '/documents') return 'Documentos';
    if (path === '/manage') return 'Gerenciar fila';
    if (path === '/database') return 'Base de dados';
    if (path === '/settings') return 'Configurações';
    return 'Página inicial';
  };

  // Mapeia o nome do item para a rota
  const handleMenuItemClick = (itemName) => {
    switch (itemName) {
      case 'Escalar':
        navigate('/climb');
        break;
      case 'Documentos':
        navigate('/documents');
        break;
      case 'Gerenciar fila':
        navigate('/manage');
        break;
      case 'Base de dados':
        navigate('/database');
        break;
      case 'Página inicial':
        navigate('/');
        break;
      default:
        break;
    }
  };

  const sidebarWidth = menuOpen ? '320px' : '92px';

  return (
    <div className="min-h-screen bg-white">
      {/* Sidebar Menu - Fixo */}
      <div 
        className="fixed top-0 left-0 h-screen z-10"
        style={{ width: sidebarWidth }}
      >
        <SidebarMenu
          type={menuOpen ? "open" : "close"}
          role={userRole}
          activeItem={getActiveItem()}
          user={user}
          onToggle={() => setMenuOpen(!menuOpen)}
          onSettings={() => navigate('/settings')}
          onLogout={() => console.log('Fazer logout')}
          onMenuItemClick={handleMenuItemClick}
        />
      </div>

      {/* Main Content - Com margin para compensar o menu fixo */}
      <div 
        className="min-h-screen bg-white"
        style={{ marginLeft: sidebarWidth }}
      >
        <Outlet />
      </div>
    </div>
  );
}

export default SidebarMenuLayout;

