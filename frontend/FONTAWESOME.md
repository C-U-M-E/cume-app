# Guia de Uso - FontAwesome

FontAwesome Free (versão gratuita) está instalado e configurado no projeto.

## Como Usar

### Ícones Solid (Preenchidos)
```jsx
<i className="fas fa-home"></i>
<i className="fas fa-user"></i>
<i className="fas fa-heart"></i>
```

### Ícones Regular (Contorno)
```jsx
<i className="far fa-heart"></i>
<i className="far fa-user"></i>
```

### Ícones Brand (Marcas)
```jsx
<i className="fab fa-github"></i>
<i className="fab fa-twitter"></i>
<i className="fab fa-facebook"></i>
```

## Tamanhos

FontAwesome usa classes de tamanho do próprio FontAwesome:

```jsx
<i className="fas fa-home fa-xs"></i>    {/* Extra pequeno */}
<i className="fas fa-home fa-sm"></i>    {/* Pequeno */}
<i className="fas fa-home fa-lg"></i>    {/* Grande */}
<i className="fas fa-home fa-2x"></i>     {/* 2x */}
<i className="fas fa-home fa-3x"></i>     {/* 3x */}
```

Ou use classes do Tailwind para tamanho:

```jsx
<i className="fas fa-home text-2xl"></i>  {/* Usando Tailwind */}
<i className="fas fa-home text-4xl"></i>  {/* Usando Tailwind */}
```

## Cores

Use classes do Tailwind para colorir os ícones:

```jsx
<i className="fas fa-star text-amber-500"></i>
<i className="fas fa-heart text-danger"></i>
<i className="fas fa-home text-brown-700"></i>
```

## Rotação e Animação

```jsx
<i className="fas fa-spinner fa-spin"></i>           {/* Rotação contínua */}
<i className="fas fa-sync fa-spin"></i>              {/* Rotação contínua */}
<i className="fas fa-arrow-right fa-rotate-90"></i>   {/* Rotação 90° */}
```

## Exemplos Práticos

### Botão com Ícone
```jsx
<button className="bg-amber-500 text-white px-4 py-2 rounded flex items-center gap-2">
  <i className="fas fa-save"></i>
  Salvar
</button>
```

### Link com Ícone
```jsx
<a href="#" className="text-amber-500 hover:text-amber-600">
  <i className="fas fa-external-link-alt mr-2"></i>
  Link externo
</a>
```

### Card com Ícone
```jsx
<div className="p-4 border rounded">
  <i className="fas fa-check-circle text-green-500 text-2xl mb-2"></i>
  <h3>Título</h3>
</div>
```

## Buscar Ícones

Acesse o site oficial do FontAwesome para buscar ícones:
- **Site**: https://fontawesome.com/icons
- **Filtro**: Use o filtro "Free" para ver apenas ícones gratuitos

## Ícones Populares (Free)

Alguns ícones úteis que você pode usar:

```jsx
{/* Interface */}
<i className="fas fa-home"></i>          {/* Casa */}
<i className="fas fa-user"></i>          {/* Usuário */}
<i className="fas fa-search"></i>        {/* Busca */}
<i className="fas fa-bars"></i>          {/* Menu */}
<i className="fas fa-times"></i>         {/* Fechar */}
<i className="fas fa-check"></i>         {/* Check */}
<i className="fas fa-edit"></i>          {/* Editar */}
<i className="fas fa-trash"></i>          {/* Lixeira */}

{/* Ações */}
<i className="fas fa-save"></i>           {/* Salvar */}
<i className="fas fa-download"></i>       {/* Download */}
<i className="fas fa-upload"></i>         {/* Upload */}
<i className="fas fa-share"></i>          {/* Compartilhar */}

{/* Social */}
<i className="fab fa-github"></i>         {/* GitHub */}
<i className="fab fa-linkedin"></i>       {/* LinkedIn */}
<i className="fab fa-twitter"></i>        {/* Twitter */}
```

## Nota Importante

⚠️ **Apenas ícones marcados como "Free" estão disponíveis**. Ícones Pro requerem licença paga.

