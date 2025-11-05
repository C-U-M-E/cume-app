# Icons

Componente que renderiza ícones, ícones FontAwesome ou imagens.

## Propriedades

| Propriedade | Tipo | Padrão | Descrição |
|------------|------|--------|-----------|
| `type` | `"specific-icon" \| "icon" \| "img"` | `"icon"` | Tipo de ícone |
| `specificIcon` | `string` | `"carteira"` | Nome do ícone SVG quando type="specific-icon" (home, carteira, carteirinha-black, carteirinha-white, escalar) |
| `icon` | `string` | `"fas fa-home"` | Classe do FontAwesome quando type="icon" |
| `img` | `string` | `undefined` | URL ou caminho da imagem quando type="img" |
| `className` | `string` | `''` | Classes adicionais do Tailwind |
| `size` | `string` | `undefined` | Tamanho do container do ícone (padrão: 40px para icon/specific-icon, 48px para img) |
| `iconSize` | `string` | `undefined` | Tamanho do ícone FontAwesome quando type="icon" (padrão: 20px) |
| `iconColor` | `string` | `undefined` | Cor do ícone FontAwesome quando type="icon" (pode usar classes Tailwind) |

## Tipos de Ícone

- **specific-icon**: Ícones SVG locais (home, carteira, carteirinha-black, carteirinha-white, escalar)
- **icon**: Ícones FontAwesome
- **img**: Imagens customizadas

## Exemplo

```jsx
<Icons
  type="specific-icon"
  specificIcon="home"
/>

<Icons
  type="icon"
  icon="fas fa-user"
  iconColor="text-brown-900"
  iconSize="24px"
/>

<Icons
  type="img"
  img="https://example.com/image.jpg"
/>
```

