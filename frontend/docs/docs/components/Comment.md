# Comment

Componente para exibir comentários com avatar, nome, data/hora e texto.

## Propriedades

| Propriedade | Tipo | Padrão | Descrição |
|------------|------|--------|-----------|
| `text` | `string` | `"text"` | Texto do comentário |
| `name` | `string` | `"name"` | Nome do usuário |
| `data` | `string` | `"data"` | Data do comentário (formato: DD/MM/YYYY) |
| `hour` | `string` | `"hour"` | Hora do comentário (formato: HH:MM) |
| `avatar` | `string` | `undefined` | URL da imagem do avatar |
| `className` | `string` | `''` | Classes adicionais do Tailwind |

## Exemplo

```jsx
<Comment
  text="Este é um comentário de exemplo"
  name="João Silva"
  data="19/09/2025"
  hour="15:06"
  avatar="https://example.com/avatar.jpg"
/>
```

