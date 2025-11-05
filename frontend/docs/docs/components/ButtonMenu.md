# ButtonMenu

Botão de menu com estados default, hover e active.

## Propriedades

| Propriedade | Tipo | Padrão | Descrição |
|------------|------|--------|-----------|
| `buttonText` | `string` | `"Text"` | Texto do botão |
| `state` | `"default" \| "hover" \| "active"` | `"default"` | Estado do botão |
| `iconType` | `"img" \| "specific-icon" \| "icon"` | `"specific-icon"` | Tipo de ícone para Icons |
| `specificIcon` | `string` | `"carteira"` | Nome do ícone SVG quando iconType="specific-icon" |
| `icon` | `string` | `undefined` | Classe do FontAwesome quando iconType="icon" |
| `img` | `string` | `undefined` | URL da imagem quando iconType="img" |
| `iconColor` | `string` | `undefined` | Cor do ícone FontAwesome quando iconType="icon" |
| `iconSize` | `string` | `undefined` | Tamanho do ícone FontAwesome quando iconType="icon" |
| `className` | `string` | `''` | Classes adicionais do Tailwind |
| `onClick` | `Function` | `undefined` | Função de callback ao clicar |

## Estados

- **default**: Sem background
- **hover**: Fundo amber-50
- **active**: Fundo amber-100

## Exemplo

```jsx
<ButtonMenu
  buttonText="Página inicial"
  state="active"
  iconType="specific-icon"
  specificIcon="home"
  onClick={() => console.log('Clicado')}
/>
```

