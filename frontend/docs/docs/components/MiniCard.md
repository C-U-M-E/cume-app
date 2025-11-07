# MiniCard

Componente de card de carteirinha com diferentes estados e tamanhos.

## Propriedades

| Propriedade | Tipo | Padrão | Descrição |
|------------|------|--------|-----------|
| `type` | `"nao-emitida" \| "vencida" \| "active"` | `"active"` | Tipo/estado da carteirinha |
| `size` | `"small" \| "large"` | `"small"` | Tamanho do card |
| `name` | `string` | `"Gabriel Filho"` | Nome do usuário |
| `avatar` | `string` | `undefined` | URL do avatar/foto do usuário |
| `birthDate` | `string` | `"05/01/2003"` | Data de nascimento (formato: DD/MM/YYYY) |
| `rg` | `string` | `"23******23"` | RG do usuário (será mascarado) |
| `cpf` | `string` | `"440******12"` | CPF do usuário (será mascarado) |
| `issueDate` | `string` | `undefined` | Data de emissão (formato: DD/MM/YYYY) |
| `expiryDate` | `string` | `undefined` | Data de validade (formato: DD/MM/YYYY) |
| `onButtonClick` | `Function` | `undefined` | Callback ao clicar no botão |
| `className` | `string` | `''` | Classes adicionais do Tailwind |

## Tipos

- **nao-emitida**: Carteirinha não emitida (fundo brown-50)
- **vencida**: Carteirinha vencida (fundo amber-700)
- **active**: Carteirinha ativa (fundo amber-600)

## Tamanhos

- **small**: Versão compacta com status e botão
- **large**: Versão completa com foto, dados pessoais e informações da carteirinha

## Exemplo

```jsx
<MiniCard
  type="active"
  size="large"
  name="João Silva"
  avatar="https://example.com/avatar.jpg"
  birthDate="01/01/2000"
  rg="123456789"
  cpf="12345678900"
  issueDate="01/01/2024"
  expiryDate="01/01/2025"
  onButtonClick={() => console.log('Acessar carteirinha')}
/>
```

