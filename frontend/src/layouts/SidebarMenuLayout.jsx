import { useState } from 'react';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import SidebarMenu from '../components/SidebarMenu';
import Header from '../components/Header';
import useMediaQuery from '../hooks/useMediaQuery';

/**
 * Layout principal com SidebarMenu
 * 
 * @param {Object} props
 * @param {"admin" | "member" | "user"} props.userRole - Role do usuário (padrão: "user")
 * @param {Object} props.user - Objeto com informações do usuário { name, avatar }
 */
function SidebarMenuLayout({ userRole = "user", user = { name: "Usuário", avatar: null } }) {
  const isDesktop = useMediaQuery(1024);
  const [menuOpen, setMenuOpen] = useState(isDesktop); // Desktop: menu aberto por padrão, Mobile: fechado
  const navigate = useNavigate();
  const location = useLocation();

  // Mapeia o caminho atual para o item ativo
  const getActiveItem = () => {
    const path = location.pathname;
    if (path === '/climb' || path.startsWith('/climb/')) return 'Escalar';
    if (path === '/documents' || path.startsWith('/documents/')) return 'Documentos';
    if (path === '/manage') return 'Gerenciar fila';
    if (path === '/database') return 'Base de dados';
    if (path === '/settings') return 'Configurações';
    return 'Página inicial';
  };

  // Mapeia o caminho para título e ícone da página
  const getPageInfo = () => {
    const path = location.pathname;
    
    // Extrai o tipo de via da URL se estiver na página de fila
    if (path === '/climb/queue') {
      const searchParams = new URLSearchParams(location.search);
      const viaType = searchParams.get('via') || 'normal';
      
      // Mapeia o tipo de via para o título
      const viaTitles = {
        'normal': 'Via Normal',
        'abaolada': 'Via Abaolada',
        'resumo': 'Via Resumo',
        'reglete': 'Via Reglete'
      };
      
      return { 
        title: viaTitles[viaType] || 'Via Normal', 
        icon: 'escalar' 
      };
    }
    
    const pageMap = {
      '/climb': { title: 'Escalar', icon: 'escalar' },
      '/documents': { title: 'Documentos', icon: 'carteira' },
      '/documents/minicardpage': { title: 'Carteirinha', icon: 'carteira' },
      '/documents/disclaimer': { title: 'Termo de responsabilidade', icon: 'carteira' },
      '/documents/photo-documents': { title: 'Documento com fotos', icon: 'carteira' },
      '/documents/member-forms': { title: 'Formulário de associado', icon: 'carteira' },
      '/manage': { title: 'Gerenciar fila', icon: 'home' },
      '/database': { title: 'Base de dados', icon: 'home' },
      '/settings': { title: 'Configurações', icon: 'home' },
    };
    return pageMap[path] || { title: 'Página', icon: 'home' };
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
    
    // Fecha o menu no mobile após navegar
    if (!isDesktop) {
      setMenuOpen(false);
    }
  };

  // Handler para o botão de configurações
  const handleSettingsClick = () => {
    navigate('/settings');
    
    // Fecha o menu no mobile após navegar
    if (!isDesktop) {
      setMenuOpen(false);
    }
  };

  // No mobile, sempre usa 320px. No desktop, muda entre 320px e 92px
  const sidebarWidth = isDesktop ? (menuOpen ? '320px' : '92px') : '320px';
  const isHomepage = location.pathname === '/';
  const isMiniCardPage = location.pathname === '/documents/minicardpage';
  const isDisclaimerPage = location.pathname === '/documents/disclaimer';
  const isPhotoDocumentsPage = location.pathname === '/documents/photo-documents';
  const isMemberFormsPage = location.pathname === '/documents/member-forms';
  const isQueueClimbPage = location.pathname === '/climb/queue';
  const pageInfo = getPageInfo();
  
  // Determina o estilo do header (forPages2 para subpáginas com botão de voltar)
  const headerStyle = isHomepage ? 'forHomepage' : ((isMiniCardPage || isDisclaimerPage || isPhotoDocumentsPage || isMemberFormsPage || isQueueClimbPage) ? 'forPages2' : 'forPages');

  return (
    <div className="min-h-screen bg-white">
      {/* Sidebar Menu - Fixo no desktop, overlay no mobile */}
      <div 
        className={`fixed top-0 left-0 h-screen z-10 transition-all duration-300 ease-in-out ${
          isDesktop ? '' : menuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        style={{ width: sidebarWidth }}
      >
        <SidebarMenu
          type={isDesktop ? (menuOpen ? "open" : "close") : "open"}
          role={userRole}
          activeItem={getActiveItem()}
          user={user}
          isMobile={!isDesktop}
          onToggle={() => setMenuOpen(!menuOpen)}
          onSettings={handleSettingsClick}
          onLogout={() => console.log('Fazer logout')}
          onMenuItemClick={handleMenuItemClick}
        />
      </div>

      {/* Overlay no mobile quando menu está aberto */}
      {!isDesktop && (
        <div
          className={`fixed inset-0 bg-black z-[9] transition-opacity duration-300 ${
            menuOpen ? 'opacity-50' : 'opacity-0 pointer-events-none'
          }`}
          onClick={() => setMenuOpen(false)}
        />
      )}

      {/* Main Content - Com margin para compensar o menu fixo no desktop */}
      <div 
        className="h-screen bg-white flex flex-col transition-all duration-300 ease-in-out overflow-hidden"
        style={{ marginLeft: isDesktop ? sidebarWidth : '0' }}
      >
        {/* Header */}
        <Header
          style={headerStyle}
          pageTitle={pageInfo.title}
          pageIcon={pageInfo.icon}
          onHamburgerClick={() => setMenuOpen(!menuOpen)}
          onBackClick={
            (isMiniCardPage || isDisclaimerPage || isPhotoDocumentsPage || isMemberFormsPage) 
              ? () => navigate('/documents') 
              : isQueueClimbPage 
                ? () => navigate('/climb') 
                : undefined
          }
          onAccessibilityClick={() => console.log('Acessibilidade')}
        />
        <div className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default SidebarMenuLayout;

