# Visão Geral das Páginas

Esta documentação descreve todas as páginas principais e subpáginas da aplicação CUME App.

## Páginas Principais

### HomePage (`/`)

Página inicial da aplicação. Exibe:
- MiniCard da carteirinha do usuário (tamanho small)
- Botões para "Escalar" e "Documentos"
- Seção de "Últimos avisos" com comentários

**Componentes utilizados:**
- `MiniCard`
- `Button`
- `Comment`
- `Wave`

### Documents (`/documents`)

Página de gerenciamento de documentos. Exibe:
- Seção "Sua carteirinha!" com lista de documentos:
  - Carteirinha
  - Termo de responsabilidade
  - Documento com fotos
- Seção "Quero me tornar membro" com:
  - Formulário de associado

**Componentes utilizados:**
- `ButtonOptions`
- Imagem vetorial de documentos

### Climb (`/climb`)

Página de escaladas. Exibe:
- Seção "Se desafie nas escaladas!" com lista de vias:
  - Via Normal
  - Via Abaolada
  - Via Resumo
  - Via Reglete
- Seção "Para escalar no reservatório" com:
  - Registrar presença

**Componentes utilizados:**
- `ButtonOptions`
- Imagem vetorial de escalada

### Manage (`/manage`)

Página de gerenciamento de fila (apenas para administradores/membros). Conteúdo em desenvolvimento.

### DataBase (`/database`)

Página de base de dados (apenas para administradores/membros). Conteúdo em desenvolvimento.

### Settings (`/settings`)

Página de configurações. Conteúdo em desenvolvimento.

## Subpáginas

### MiniCardPage (`/documents/minicardpage`)

Exibe a carteirinha do usuário em tamanho large com todas as informações:
- Foto do usuário
- Nome e data de nascimento
- Badge de status (Ativa, Vencida, Não emitida)
- RG e CPF (mascarados)
- Data de emissão e validade

**Componentes utilizados:**
- `MiniCard` (size="large")

### DisclaimerPage (`/documents/disclaimer`)

Página para assinar o termo de responsabilidade. Exibe:
- Ilustração de empty state
- Texto explicativo sobre o documento
- Botão para assinar o termo

**Componentes utilizados:**
- `Button`

### PhotoDocuments (`/documents/photo-documents`)

Página para enviar documentos com fotos. Exibe:
- Ilustração de empty state
- Texto explicativo sobre o envio de documentos
- Botão para enviar documento com fotos

**Componentes utilizados:**
- `Button`

### MemberForms (`/documents/member-forms`)

Página para assinar o formulário de associado. Exibe:
- Ilustração de empty state
- Texto explicativo sobre os benefícios de ser membro
- Botão para assinar o formulário

**Componentes utilizados:**
- `Button`

### QueueClimb (`/climb/queue`)

Página para entrar na fila de escalada. Exibe dois estados:

**Estado 1: Aguardando confirmação do QR Code**
- Título e descrição sobre mostrar o QR Code
- QR Code gerado
- Informação sobre pessoas na fila e tempo estimado

**Estado 2: Na fila (confirmado)**
- Ilustração de confirmação
- Mensagem de confirmação
- Informação sobre pessoas na fila e tempo estimado

**Componentes utilizados:**
- Imagens vetoriais (via-vector, confirmation-vector)

### RegisterAttendance (`/climb/register-attendance`)

Página para registrar presença no reservatório. Exibe dois estados:

**Estado 1: Aguardando confirmação do QR Code**
- Título e descrição sobre mostrar o QR Code
- QR Code gerado

**Estado 2: Presença confirmada**
- Ilustração de confirmação
- Mensagem de confirmação

**Componentes utilizados:**
- Imagens vetoriais (via-vector, confirmation-vector)

## Estrutura de Rotas

```
/ (HomePage)
├── /documents (Documents)
│   ├── /documents/minicardpage (MiniCardPage)
│   ├── /documents/disclaimer (DisclaimerPage)
│   ├── /documents/photo-documents (PhotoDocuments)
│   └── /documents/member-forms (MemberForms)
├── /climb (Climb)
│   ├── /climb/queue (QueueClimb)
│   └── /climb/register-attendance (RegisterAttendance)
├── /manage (Manage)
├── /database (DataBase)
└── /settings (Settings)
```

## Padrões de Design

Todas as páginas seguem padrões consistentes:
- Uso do componente `Header` para cabeçalho
- Espaçamentos padronizados (gap-40, gap-48, px-24, py-32, etc.)
- Cores do design system (amber, brown, gray)
- Tipografia consistente (text-title-h1, text-body-lg-regular, etc.)

