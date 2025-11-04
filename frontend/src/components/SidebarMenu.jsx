import React from 'react';
import ButtonMenu from './ButtonMenu';
import Icons from './Icons';
import cumeLogo from '../assets/images/cume-text-logo.svg';

/**
 * Componente SidebarMenu - Menu lateral com opções de navegação
 * 
 * @param {Object} props
 * @param {"open" | "close"} props.type - Tipo do menu: open ou close (padrão: "open")
 * @param {"admin" | "member" | "user"} props.role - Role do usuário (padrão: "user")
 * @param {Array} props.menuItems - Array customizado de itens do menu (opcional, se não fornecido usa os padrões baseados no role)
 * @param {string} props.activeItem - Nome do item ativo (padrão: "Página inicial")
 * @param {Object} props.user - Objeto com informações do usuário { name, avatar }
 * @param {Function} props.onToggle - Função callback ao clicar no botão de toggle
 * @param {Function} props.onSettings - Função callback ao clicar em configurações
 * @param {Function} props.onLogout - Função callback ao clicar em logout
 * @param {Function} props.onMenuItemClick - Função callback ao clicar em um item do menu (recebe o nome do item)
 * @param {boolean} props.isMobile - Se está no mobile (para mostrar X ao invés de chevron)
 * @param {string} props.className - Classes adicionais do Tailwind
 */
const SidebarMenu = ({ 
  type = "open",
  role = "user",
  menuItems: customMenuItems,
  activeItem = "Página inicial",
  user = { name: "Usuário", avatar: null },
  onToggle,
  onSettings,
  onLogout,
  onMenuItemClick,
  isMobile = false,
  className = ''
}) => {
  const isOpen = type === 'open';
  const width = isOpen ? 'w-[320px]' : 'w-[92px]';

  // Gera menu items baseado no role se não foram fornecidos customizados
  const getDefaultMenuItems = () => {
    if (role === 'user') {
      return [
        {
          buttonText: "Página inicial",
          iconType: "specific-icon",
          specificIcon: "home",
          onClick: () => onMenuItemClick?.("Página inicial")
        },
        {
          buttonText: "Escalar",
          iconType: "specific-icon",
          specificIcon: "escalar",
          onClick: () => onMenuItemClick?.("Escalar")
        },
        {
          buttonText: "Documentos",
          iconType: "specific-icon",
          specificIcon: "carteira",
          onClick: () => onMenuItemClick?.("Documentos")
        }
      ];
    } else {
      // admin ou member
      return [
        {
          buttonText: "Página inicial",
          iconType: "specific-icon",
          specificIcon: "home",
          onClick: () => onMenuItemClick?.("Página inicial")
        },
        {
          buttonText: "Gerenciar fila",
          iconType: "icon",
          icon: "fas fa-list-ul",
          onClick: () => onMenuItemClick?.("Gerenciar fila")
        },
        {
          buttonText: "Base de dados",
          iconType: "icon",
          icon: "fas fa-database",
          onClick: () => onMenuItemClick?.("Base de dados")
        },
        {
          buttonText: "Documentos",
          iconType: "specific-icon",
          specificIcon: "carteira",
          onClick: () => onMenuItemClick?.("Documentos")
        }
      ];
    }
  };

  // Usa menuItems customizados ou gera baseado no role
  const menuItems = customMenuItems || getDefaultMenuItems();

  // Aplica o estado ativo baseado no activeItem
  const menuItemsWithState = menuItems.map(item => ({
    ...item,
    state: item.buttonText === activeItem ? 'active' : 'default'
  }));

  // Se fechado, renderiza versão compacta
  if (!isOpen) {
    return (
      <div className={`bg-white border-r-2 border-brown-100 flex flex-col gap-48 h-screen items-start overflow-y-auto ${width} ${className}`}>
        {/* Header */}
        <div className="flex gap-8 items-center justify-center pb-12 pt-48 px-16 w-full">
          <button
            onClick={onToggle}
            className="flex items-center justify-center rounded-8 shrink-0 size-40 hover:bg-amber-50 transition-colors"
          >
            {isMobile ? (
              <i className="fas fa-times text-brown-900 text-[20px]" />
            ) : (
              <i className="fas fa-chevron-right text-brown-900 text-[16px]" />
            )}
          </button>
        </div>

        {/* Menu Items - apenas ícones */}
        <div className="flex flex-col gap-8 grow items-start px-16 py-0 w-full">
          {menuItemsWithState.map((item, index) => {
            const bgClass = item.state === 'active' 
              ? 'bg-amber-100 hover:bg-amber-100' 
              : 'hover:bg-amber-50';
            
            return (
              <button
                key={index}
                onClick={item.onClick}
                className={`${bgClass} flex items-center justify-center h-64 rounded-16 shrink-0 w-full transition-colors`}
              >
                <Icons
                  type={item.iconType || 'specific-icon'}
                  specificIcon={item.specificIcon}
                  icon={item.icon}
                  img={item.img}
                  className="shrink-0"
                />
              </button>
            );
          })}
        </div>

        {/* Footer - apenas avatar */}
        <div className="bg-white border-t border-brown-100 flex flex-col gap-8 items-center px-16 py-24 w-full">
          {user.avatar && (
            <img 
              src={user.avatar} 
              alt={user.name}
              className="rounded-full shrink-0 size-48"
            />
          )}
        </div>
      </div>
    );
  }

  // Versão aberta
  return (
    <div className={`bg-white border-r-2 border-brown-100 flex flex-col gap-48 h-screen items-start overflow-y-auto ${width} ${className}`}>
      {/* Header */}
      <div className="flex gap-8 items-center pb-12 pt-48 px-32 w-full">
        <div className="flex gap-8 grow items-start">
          <button
            onClick={() => onMenuItemClick?.('Página inicial')}
            className="cursor-pointer hover:opacity-80 transition-opacity"
          >
            <img 
              src={cumeLogo} 
              alt="CUME Logo"
              className="h-24 shrink-0"
            />
          </button>
        </div>
        <button
          onClick={onToggle}
          className="flex items-center justify-center rounded-8 shrink-0 size-40 hover:bg-amber-50 transition-colors"
        >
          {isMobile ? (
            <i className="fas fa-times text-brown-900 text-[20px]" />
          ) : (
            <i className="fas fa-chevron-left text-brown-900 text-[16px]" />
          )}
        </button>
      </div>

      {/* Menu Items */}
      <div className="flex flex-col gap-8 grow items-start px-16 py-0 w-full">
        {menuItemsWithState.map((item, index) => (
          <ButtonMenu
            key={index}
            buttonText={item.buttonText}
            state={item.state}
            iconType={item.iconType}
            specificIcon={item.specificIcon}
            icon={item.icon}
            img={item.img}
            onClick={item.onClick}
            className="w-full"
          />
        ))}
      </div>

      {/* Footer - User Info */}
      <div className="bg-white border-t border-brown-100 flex flex-col gap-8 items-start px-16 py-24 w-full">
        <div className="flex items-center w-full">
          <div className="flex gap-8 grow items-center">
            {user.avatar && (
              <img 
                src={user.avatar} 
                alt={user.name}
                className="rounded-full shrink-0 size-48"
              />
            )}
            <div className="flex flex-col gap-4 grow items-start">
              <p className="text-body-md-medium text-brown-900 w-full">
                {user.name}
              </p>
            </div>
          </div>
          <div className="flex gap-4 items-center">
            <button
              onClick={onSettings}
              className={`flex items-center justify-center rounded-8 shrink-0 size-40 transition-colors ${
                activeItem === 'Configurações' 
                  ? 'bg-amber-100 hover:bg-amber-100' 
                  : 'hover:bg-amber-50'
              }`}
            >
              <i className="fas fa-gear text-brown-900 text-[16px]" />
            </button>
            <button
              onClick={onLogout}
              className="flex items-center justify-center rounded-8 shrink-0 size-40 hover:bg-amber-50 transition-colors"
            >
              <i className="fas fa-sign-out-alt text-red-600 text-[16px]" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SidebarMenu;

