# Guia de Estilos - Resumo

Este guia apresenta de forma simplificada e objetiva os padrões de design utilizados no projeto CUME App.

## Cores

### Amber (Amarelo)
Paleta completa de 50 a 900. Use `bg-amber-{50-900}` ou `text-amber-{50-900}`.

**Cores principais:**
- `bg-amber-50` - Fundo claro
- `bg-amber-500` - Cor principal
- `bg-amber-600` - Cor de destaque
- `bg-amber-700` - Cor mais escura

### Brown (Marrom)
Paleta completa de 50 a 900. Use `bg-brown-{50-900}` ou `text-brown-{50-900}`.

**Cores principais:**
- `bg-brown-50` - Fundo claro
- `bg-brown-500` - Cor principal
- `bg-brown-800` - Cor escura
- `bg-brown-900` - Cor mais escura

### Gray (Cinza)
Apenas tons 600 e 700 disponíveis: `bg-gray-600`, `bg-gray-700`, `text-gray-600`, `text-gray-700`.

### Cores Especiais
- `bg-white` - Branco customizado (rgba(255, 253, 245, 1))
- `bg-danger` - Cor de perigo/erro

## Tipografia

### Body Styles (Corpo de Texto)

- `text-body-sm-regular` - 12px, Poppins, weight 400
- `text-body-sm-medium` - 12px, Poppins, weight 500
- `text-body-md-regular` - 14px, Poppins, weight 400
- `text-body-md-medium` - 14px, Poppins, weight 500
- `text-body-lg-regular` - 16px, Poppins, weight 400
- `text-body-lg-medium` - 16px, Poppins, weight 500

### Title Styles (Títulos)

- `text-title-h1` - 32px, Poppins, weight 600
- `text-title-h2` - 24px, Poppins, weight 600
- `text-title-h3` - 20px, Poppins, weight 600

**Todas as fontes usam Poppins e line-height de 140% (títulos) ou 150% (body).**

## Espaçamentos

Escala baseada em pixels: **2, 4, 8, 12, 16, 24, 32, 40, 48, 56, 64, 72, 80, 96px**

### Valores Comuns

| Classe | Valor | Uso |
|--------|-------|-----|
| `p-2`, `m-2`, `gap-2` | 2px | Espaçamentos mínimos |
| `p-4`, `m-4`, `gap-4` | 4px | Espaçamentos pequenos |
| `p-8`, `m-8`, `gap-8` | 8px | Espaçamentos médios |
| `p-12`, `m-12`, `gap-12` | 12px | Espaçamentos médios-altos |
| `p-16`, `m-16`, `gap-16` | 16px | Espaçamentos grandes |
| `p-24`, `m-24`, `gap-24` | 24px | Espaçamentos muito grandes |
| `p-32`, `m-32`, `gap-32` | 32px | Espaçamentos extra grandes |
| `p-40`, `m-40`, `gap-40` | 40px | Espaçamentos seções |
| `p-48`, `m-48`, `gap-48` | 48px | Espaçamentos grandes seções |

### Uso

```jsx
// Padding
<div className="p-4">Padding de 4px em todos os lados</div>
<div className="px-8 py-4">Padding horizontal 8px, vertical 4px</div>

// Margin
<div className="m-4">Margin de 4px em todos os lados</div>
<div className="mx-8 my-4">Margin horizontal 8px, vertical 4px</div>

// Gap (Flexbox/Grid)
<div className="flex gap-4">
  <div>Item 1</div>
  <div>Item 2</div>
</div>
```

## Regras de Uso

1. **Sempre use as classes de estilo de texto** (`text-body-*`, `text-title-*`) ao invés de classes genéricas
2. **Sempre use os espaçamentos da escala** (2, 4, 8, 12, 16, 24, 32, 40, 48)
3. **Use as cores do design system** (amber, brown, gray, white, danger)
4. **Mantenha consistência** - use os mesmos padrões em todo o projeto

## Exemplo Prático

```jsx
<div className="bg-white p-16 rounded-lg">
  <h2 className="text-title-h2 text-brown-800 mb-12">
    Título do Card
  </h2>
  <p className="text-body-md-regular text-gray-700 mb-8">
    Descrição do conteúdo do card.
  </p>
  <button className="bg-amber-500 hover:bg-amber-600 text-white text-body-md-medium px-24 py-8 rounded-lg">
    Botão de Ação
  </button>
</div>
```

