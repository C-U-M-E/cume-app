# Header

Componente de cabeçalho da aplicação com diferentes estados.

## Propriedades

| Propriedade | Tipo | Padrão | Descrição |
|------------|------|--------|-----------|
| `style` | `"forHomepage" \| "forPages" \| "forPages2"` | `undefined` | Estilo do header (determinado automaticamente pela rota se não fornecido) |
| `pageTitle` | `string` | `undefined` | Título da página (usado em forPages e forPages2) |
| `onHamburgerClick` | `Function` | `undefined` | Callback ao clicar no botão hambúrguer |
| `onBackClick` | `Function` | `undefined` | Callback ao clicar no botão de voltar (forPages2) |
| `onAccessibilityClick` | `Function` | `undefined` | Callback ao clicar no botão de acessibilidade |
| `className` | `string` | `''` | Classes adicionais do Tailwind |

## Estilos

- **forHomepage**: Página inicial
- **forPages**: Página com título e botões de menu/acessibilidade (mobile)
- **forPages2**: Subpágina com botão de voltar e título

## Exemplo

```jsx
<Header
  style="forPages"
  pageTitle="Documentos"
  onHamburgerClick={() => console.log('Menu')}
  onAccessibilityClick={() => console.log('Acessibilidade')}
/>
```

