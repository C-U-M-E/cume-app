# SidebarMenu

Menu lateral com opções de navegação.

## Propriedades

| Propriedade | Tipo | Padrão | Descrição |
|------------|------|--------|-----------|
| `type` | `"open" \| "close"` | `"open"` | Tipo do menu: open ou close |
| `role` | `"admin" \| "member" \| "user"` | `"user"` | Role do usuário |
| `menuItems` | `Array` | `undefined` | Array customizado de itens do menu (opcional, se não fornecido usa os padrões baseados no role) |
| `activeItem` | `string` | `"Página inicial"` | Nome do item ativo |
| `user` | `Object` | `{ name: "Usuário", avatar: null }` | Objeto com informações do usuário { name, avatar } |
| `onToggle` | `Function` | `undefined` | Função callback ao clicar no botão de toggle |
| `onSettings` | `Function` | `undefined` | Função callback ao clicar em configurações |
| `onLogout` | `Function` | `undefined` | Função callback ao clicar em logout |
| `onMenuItemClick` | `Function` | `undefined` | Função callback ao clicar em um item do menu (recebe o nome do item) |
| `isMobile` | `boolean` | `false` | Se está no mobile (para mostrar X ao invés de chevron) |
| `className` | `string` | `''` | Classes adicionais do Tailwind |

## Roles

- **user**: Menu com Página inicial, Escalar e Documentos
- **admin/member**: Menu com Página inicial, Gerenciar fila, Base de dados e Documentos

## Exemplo

```jsx
<SidebarMenu
  type="open"
  role="user"
  activeItem="Documentos"
  user={{ name: "João Silva", avatar: "https://example.com/avatar.jpg" }}
  onToggle={() => console.log('Toggle')}
  onMenuItemClick={(item) => console.log(item)}
/>
```

