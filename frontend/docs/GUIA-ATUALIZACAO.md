# Guia de Atualização da Documentação

## Atualizar Documentação dos Componentes

### Processo Automático

1. **Adicione ou atualize um componente** em `src/components/` com comentários JSDoc:

```jsx
/**
 * Componente NovoComponente - Descrição do que o componente faz
 * 
 * @param {Object} props
 * @param {string} props.texto - Texto a ser exibido
 * @param {"primary" | "secondary"} props.variant - Variante do componente
 * @param {Function} props.onClick - Callback ao clicar
 */
const NovoComponente = ({ texto, variant = "primary", onClick }) => {
  // ...
};
```

2. **Execute o script de geração:**

```bash
# A partir da raiz do frontend
npm run docs:generate

# Ou a partir do diretório docs
cd docs
npm run docs:generate
```

3. **O script irá:**
   - Ler todos os componentes em `src/components/`
   - Extrair informações dos JSDoc
   - Gerar/atualizar arquivos `.md` em `docs/docs/components/`
   - Atualizar automaticamente o `sidebars.js`

### Atualização Manual

Se preferir ou precisar customizar a documentação:

1. **Crie ou edite** o arquivo em `docs/docs/components/NomeDoComponente.md`
2. **Adicione o componente ao sidebars.js:**

```javascript
// frontend/docs/sidebars.js
const sidebars = {
  tutorialSidebar: [
    // ...
    {
      type: 'category',
      label: 'Componentes',
      items: [
        // ... outros componentes
        'components/NomeDoComponente',  // Adicione aqui
      ],
    },
  ],
};
```

## Adicionar Nova Página de Documentação

1. **Crie o arquivo MD** em `docs/docs/pages/` ou outra pasta apropriada
2. **Adicione ao sidebars.js:**

```javascript
{
  type: 'category',
  label: 'Páginas',
  items: [
    'pages/overview',
    'pages/nova-pagina',  // Adicione aqui
  ],
},
```

## Formato JSDoc Recomendado

Para melhor extração automática, use este formato:

```jsx
/**
 * Componente NomeDoComponente - Descrição curta do componente
 * 
 * @param {Object} props
 * @param {string} props.prop1 - Descrição da propriedade 1
 * @param {number} props.prop2 - Descrição da propriedade 2 (padrão: 10)
 * @param {"opcao1" | "opcao2"} props.variant - Variante do componente
 * @param {Function} props.onClick - Callback ao clicar
 * @param {string} props.className - Classes adicionais do Tailwind
 */
```

## Comandos Úteis

```bash
# Gerar documentação dos componentes
npm run docs:generate

# Iniciar servidor de desenvolvimento
npm run docs:dev

# Build de produção
npm run docs:build

# Servir build de produção
npm run docs:serve
```

