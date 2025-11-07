# ButtonOptions

Botão de opções com ícone, título e descrição.

## Propriedades

| Propriedade | Tipo | Padrão | Descrição |
|------------|------|--------|-----------|
| `title` | `string` | `"Title"` | Título do botão |
| `description` | `string` | `"description - date"` | Descrição do botão |
| `showDescription` | `boolean` | `true` | Se deve mostrar a descrição |
| `state` | `"hover" \| "default"` | `"default"` | Estado do botão |
| `img` | `string` | `undefined` | URL da imagem para o ícone (usado no componente Icons quando type="img") |
| `iconType` | `"img" \| "specific-icon" \| "icon"` | `undefined` | Tipo de ícone (padrão: "img" se img fornecida) |
| `specificIcon` | `string` | `undefined` | Nome do ícone SVG quando iconType="specific-icon" |
| `icon` | `string` | `undefined` | Classe do FontAwesome quando iconType="icon" |
| `iconColor` | `string` | `undefined` | Cor do ícone FontAwesome quando iconType="icon" |
| `iconSize` | `string` | `undefined` | Tamanho do ícone FontAwesome quando iconType="icon" |
| `className` | `string` | `''` | Classes adicionais do Tailwind |
| `onClick` | `Function` | `undefined` | Função de callback ao clicar |

## Exemplo

```jsx
<ButtonOptions
  title="Carteirinha"
  description="Emitida"
  iconType="specific-icon"
  specificIcon="carteira"
  onClick={() => console.log('Clicado')}
/>
```

