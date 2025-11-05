# Button

Componente de botão com variantes primary e secondary.

## Propriedades

| Propriedade | Tipo | Padrão | Descrição |
|------------|------|--------|-----------|
| `textButton` | `string` | `"Text"` | Texto do botão |
| `showIconRight` | `boolean` | `undefined` | Mostra ícone de seta à direita (padrão: true para primary, false para secondary) |
| `showIconLeft` | `boolean` | `true` | Mostra ícone à esquerda usando Icons |
| `state` | `"default" \| "hover"` | `"default"` | Estado do botão |
| `variant` | `"primary" \| "secondary"` | `"primary"` | Variante do botão |
| `style` | `"amber" \| "brown"` | `"brown"` | Estilo do botão (apenas para primary) |
| `iconType` | `"img" \| "specific-icon" \| "icon"` | `"specific-icon"` | Tipo de ícone para Icons quando showIconLeft=true |
| `specificIcon` | `string` | `"carteira"` | Nome do ícone SVG quando iconType="specific-icon" |
| `icon` | `string` | `undefined` | Classe do FontAwesome quando iconType="icon" |
| `img` | `string` | `undefined` | URL da imagem quando iconType="img" |
| `iconColor` | `string` | `undefined` | Cor do ícone FontAwesome quando iconType="icon" |
| `iconSize` | `string` | `undefined` | Tamanho do ícone FontAwesome quando iconType="icon" |
| `className` | `string` | `''` | Classes adicionais do Tailwind |
| `onClick` | `Function` | `undefined` | Função de callback ao clicar |

## Variantes

### Primary

Botão principal com fundo colorido (amber ou brown) e texto branco ou marrom escuro.

### Secondary

Botão secundário com fundo claro (amber-50) e texto marrom.

## Exemplo

```jsx
<Button
  textButton="Escalar"
  variant="primary"
  style="amber"
  showIconLeft={true}
  iconType="specific-icon"
  specificIcon="escalar"
  onClick={() => console.log('Clicado')}
/>
```

