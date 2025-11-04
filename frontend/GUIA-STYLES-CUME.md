# Guia de Estilos - CUME App

Este documento define o style guide completo do projeto CUME, incluindo cores, fontes, espaçamentos e estilos de texto. Use este guia como referência para manter consistência visual em todo o projeto.

---

## 🎨 Cores do Projeto

### Sistema de Cores Amber (Amarelo)
Paleta amber completa de 50 a 900:

```jsx
// Backgrounds
<div className="bg-amber-50">Amber 50 - Mais claro</div>
<div className="bg-amber-100">Amber 100</div>
<div className="bg-amber-200">Amber 200</div>
<div className="bg-amber-300">Amber 300</div>
<div className="bg-amber-400">Amber 400</div>
<div className="bg-amber-500">Amber 500 - Cor principal</div>
<div className="bg-amber-600">Amber 600</div>
<div className="bg-amber-700">Amber 700</div>
<div className="bg-amber-800">Amber 800</div>
<div className="bg-amber-900">Amber 900 - Mais escuro</div>

// Texto
<p className="text-amber-500">Texto em amber</p>
```

### Sistema de Cores Brown (Marrom)
Paleta brown completa de 50 a 900:

```jsx
// Backgrounds
<div className="bg-brown-50">Brown 50 - Mais claro</div>
<div className="bg-brown-100">Brown 100</div>
<div className="bg-brown-200">Brown 200</div>
<div className="bg-brown-300">Brown 300</div>
<div className="bg-brown-400">Brown 400</div>
<div className="bg-brown-500">Brown 500 - Cor principal</div>
<div className="bg-brown-600">Brown 600</div>
<div className="bg-brown-700">Brown 700</div>
<div className="bg-brown-800">Brown 800</div>
<div className="bg-brown-900">Brown 900 - Mais escuro</div>

// Texto
<p className="text-brown-500">Texto em brown</p>
```

### Cores Gray (Cinza)
Apenas os tons 600 e 700 disponíveis:

```jsx
<div className="bg-gray-600">Gray 600</div>
<div className="bg-gray-700">Gray 700</div>
<p className="text-gray-600">Texto em gray 600</p>
<p className="text-gray-700">Texto em gray 700</p>
```

### Cores Especiais

```jsx
// Branco customizado do projeto
<div className="bg-white">Fundo branco (rgba(255, 253, 245, 1))</div>

// Cor de perigo/erro
<div className="bg-danger">Fundo danger</div>
<p className="text-danger">Texto de perigo/erro</p>
```

---

## 📝 Estilos de Texto

### Body Styles (Corpo de Texto)

#### Body Small - Regular
```jsx
<p className="text-body-sm-regular">
  Texto pequeno regular: 12px, Poppins, weight 400, line-height 150%
</p>
```

#### Body Small - Medium
```jsx
<p className="text-body-sm-medium">
  Texto pequeno médio: 12px, Poppins, weight 500, line-height 150%
</p>
```

#### Body Medium - Regular
```jsx
<p className="text-body-md-regular">
  Texto médio regular: 14px, Poppins, weight 400, line-height 150%
</p>
```

#### Body Medium - Medium
```jsx
<p className="text-body-md-medium">
  Texto médio médio: 14px, Poppins, weight 500, line-height 150%
</p>
```

#### Body Large - Regular
```jsx
<p className="text-body-lg-regular">
  Texto grande regular: 16px, Poppins, weight 400, line-height 150%
</p>
```

#### Body Large - Medium
```jsx
<p className="text-body-lg-medium">
  Texto grande médio: 16px, Poppins, weight 500, line-height 150%
</p>
```

### Title Styles (Títulos)

#### Title H1
```jsx
<h1 className="text-title-h1">
  Título H1: 32px, Poppins, weight 600, line-height 140%
</h1>
```

#### Title H2
```jsx
<h2 className="text-title-h2">
  Título H2: 24px, Poppins, weight 600, line-height 140%
</h2>
```

#### Title H3
```jsx
<h3 className="text-title-h3">
  Título H3: 20px, Poppins, weight 600, line-height 140%
</h3>
```

---

## 📏 Espaçamentos

O projeto usa uma escala de espaçamento baseada em pixels: **2, 4, 8, 12, 16, 24, 32, 40, 48... px**

### Valores Disponíveis

| Classe Tailwind | Valor em Pixels | Uso Recomendado |
|----------------|-----------------|-----------------|
| `p-2`, `m-2`, `gap-2` | 2px | Espaçamentos mínimos |
| `p-4`, `m-4`, `gap-4` | 4px | Espaçamentos pequenos |
| `p-8`, `m-8`, `gap-8` | 8px | Espaçamentos médios |
| `p-12`, `m-12`, `gap-12` | 12px | Espaçamentos médios-altos |
| `p-16`, `m-16`, `gap-16` | 16px | Espaçamentos grandes |
| `p-24`, `m-24`, `gap-24` | 24px | Espaçamentos muito grandes |
| `p-32`, `m-32`, `gap-32` | 32px | Espaçamentos extra grandes |
| `p-40`, `m-40`, `gap-40` | 40px | Espaçamentos seções |
| `p-48`, `m-48`, `gap-48` | 48px | Espaçamentos grandes seções |

### Valores Adicionais (56px+)
- `p-56`, `m-56`, `gap-56` = 56px
- `p-64`, `m-64`, `gap-64` = 64px
- `p-72`, `m-72`, `gap-72` = 72px
- `p-80`, `m-80`, `gap-80` = 80px
- `p-96`, `m-96`, `gap-96` = 96px

### Como Usar Espaçamentos

#### Padding
```jsx
// Padding em todos os lados
<div className="p-4">Padding de 4px em todos os lados</div>

// Padding horizontal e vertical
<div className="px-8 py-4">Padding horizontal 8px, vertical 4px</div>

// Padding em lados específicos
<div className="pt-12 pb-8">Padding top 12px, bottom 8px</div>
<div className="pl-16 pr-4">Padding left 16px, right 4px</div>
```

#### Margin
```jsx
// Margin em todos os lados
<div className="m-4">Margin de 4px em todos os lados</div>

// Margin horizontal e vertical
<div className="mx-8 my-4">Margin horizontal 8px, vertical 4px</div>

// Margin em lados específicos
<div className="mt-12 mb-8">Margin top 12px, bottom 8px</div>
<div className="ml-16 mr-4">Margin left 16px, right 4px</div>
```

#### Gap (Flexbox/Grid)
```jsx
<div className="flex gap-4">
  <div>Item 1</div>
  <div>Item 2</div>
</div>

<div className="grid grid-cols-3 gap-8">
  <div>Coluna 1</div>
  <div>Coluna 2</div>
  <div>Coluna 3</div>
</div>
```

#### Width/Height
```jsx
<div className="w-48 h-32">Width 48px, Height 32px</div>
<div className="w-full h-16">Width 100%, Height 16px</div>
```

⚠️ **Importante**: Os valores padrão do Tailwind foram customizados. Se precisar de valores intermediários, use valores arbitrários: `p-[6px]` ou `m-[10px]`.

---

## 🎯 Exemplos Práticos de Uso Combinado

### Card com Estilos Completos
```jsx
<div className="bg-white p-16 rounded-lg shadow-xl">
  <h2 className="text-title-h2 text-brown-800 mb-12">
    Título do Card
  </h2>
  <p className="text-body-md-regular text-gray-700 mb-8">
    Descrição do conteúdo do card usando body medium regular.
  </p>
  <button className="bg-amber-500 hover:bg-amber-600 text-white text-body-md-medium px-24 py-8 rounded-lg transition">
    Botão de Ação
  </button>
</div>
```

### Seção com Título e Conteúdo
```jsx
<section className="p-32 bg-white">
  <h1 className="text-title-h1 text-amber-700 mb-16">
    Título Principal
  </h1>
  <p className="text-body-lg-regular text-brown-600 mb-12">
    Parágrafo principal usando body large regular.
  </p>
  <p className="text-body-md-regular text-gray-700">
    Texto secundário usando body medium regular.
  </p>
</section>
```

### Lista com Espaçamentos
```jsx
<div className="flex flex-col gap-8">
  <div className="text-body-md-medium text-brown-700">Item 1</div>
  <div className="text-body-md-medium text-brown-700">Item 2</div>
  <div className="text-body-md-medium text-brown-700">Item 3</div>
</div>
```

### Botões com Diferentes Estilos
```jsx
{/* Botão primário */}
<button className="bg-amber-500 hover:bg-amber-600 text-white text-body-md-medium px-24 py-8 rounded-lg">
  Botão Primário
</button>

{/* Botão secundário */}
<button className="bg-brown-500 hover:bg-brown-600 text-white text-body-md-medium px-24 py-8 rounded-lg">
  Botão Secundário
</button>

{/* Botão de perigo */}
<button className="bg-danger hover:opacity-90 text-white text-body-md-medium px-24 py-8 rounded-lg">
  Botão de Perigo
</button>
```

---

## 📋 Resumo Rápido para IAs

### Cores
- **Amber**: `bg-amber-{50-900}` ou `text-amber-{50-900}` - Paleta completa
- **Brown**: `bg-brown-{50-900}` ou `text-brown-{50-900}` - Paleta completa
- **Gray**: `bg-gray-{600,700}` ou `text-gray-{600,700}` - Apenas 2 tons
- **White**: `bg-white` - Branco customizado
- **Danger**: `bg-danger` ou `text-danger` - Cor de erro/perigo

### Fontes e Estilos de Texto
- **Body Small**: `text-body-sm-regular` ou `text-body-sm-medium` (12px)
- **Body Medium**: `text-body-md-regular` ou `text-body-md-medium` (14px)
- **Body Large**: `text-body-lg-regular` ou `text-body-lg-medium` (16px)
- **Títulos**: `text-title-h1` (32px), `text-title-h2` (24px), `text-title-h3` (20px)
- Todas usam **Poppins** como fonte

### Espaçamentos
- Use: `p-{2,4,8,12,16,24,32,40,48}` para padding
- Use: `m-{2,4,8,12,16,24,32,40,48}` para margin
- Use: `gap-{2,4,8,12,16,24,32,40,48}` para gap
- Valores representam pixels exatos (ex: `p-4` = 4px)

### Regras de Uso
1. **Sempre use as classes de estilo de texto** (`text-body-*`, `text-title-*`) ao invés de classes genéricas
2. **Sempre use os espaçamentos da escala** (2, 4, 8, 12, 16, 24, 32, 40, 48)
3. **Use as cores do design system** (amber, brown, gray, white, danger)
4. **Mantenha consistência** - use os mesmos padrões em todo o projeto

---

## 📁 Arquivos de Configuração

- **Cores e Espaçamentos**: `tailwind.config.js`
- **Estilos de Texto**: `src/index.css` (seção `@layer components`)
- **Fonte Poppins**: Importada automaticamente em `src/index.css`

