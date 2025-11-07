# CardVector

Componente que renderiza vetores decorativos dos cards com a cor correta.

## Propriedades

| Propriedade | Tipo | Padrão | Descrição |
|------------|------|--------|-----------|
| `position` | `"top-right" \| "bottom-left"` | `undefined` | Posição do vetor |
| `type` | `"active" \| "nao-emitida" \| "vencida"` | `undefined` | Tipo do card (define a cor) |

## Cores por Tipo

- **active**: Cor amber-700 (#FFA000)
- **vencida**: Cor amber-800 (#FF8F00)
- **nao-emitida**: Cor brown (#E5D9D5)

## Exemplo

```jsx
<CardVector position="top-right" type="active" />
```

