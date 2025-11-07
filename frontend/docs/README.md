# Documentação CUME App

Esta é a documentação do projeto CUME App, gerada com Docusaurus.

## Desenvolvimento

Para iniciar o servidor de desenvolvimento:

```bash
npm run docs:dev
```

A documentação estará disponível em `http://localhost:3000`.

## Gerar/Atualizar Documentação dos Componentes

Para gerar ou atualizar automaticamente a documentação dos componentes baseada nos comentários JSDoc:

```bash
npm run docs:generate
```

Este comando:
- Lê todos os componentes em `../src/components/`
- Extrai informações dos comentários JSDoc
- Gera/atualiza arquivos `.md` em `docs/components/`
- Atualiza automaticamente o `sidebars.js`

### Como usar

1. **Adicione comentários JSDoc aos seus componentes:**

```jsx
/**
 * Componente MeuComponente - Descrição do componente
 * 
 * @param {Object} props
 * @param {string} props.titulo - Título do componente
 * @param {boolean} props.ativo - Se o componente está ativo
 * @param {Function} props.onClick - Callback ao clicar
 */
const MeuComponente = ({ titulo, ativo, onClick }) => {
  // ...
};
```

2. **Execute o script de geração:**

```bash
npm run docs:generate
```

3. **Revise e customize os arquivos gerados** em `docs/components/` se necessário.

### Notas

- O script preserva arquivos MD existentes que já foram customizados
- Componentes sem JSDoc serão ignorados
- O `sidebars.js` é atualizado automaticamente

## Build

Para gerar a versão de produção:

```bash
npm run docs:build
```

## Servir versão de produção

Para servir a versão de produção localmente:

```bash
npm run docs:serve
```
