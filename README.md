# TaskFlow Front-end

Frontend do **TaskFlow**, uma aplicação de gerenciamento de tarefas e projetos focada em organização pessoal e produtividade.

O projeto foi desenvolvido utilizando HTML, CSS e JavaScript Vanilla, consumindo uma API externa para autenticação, gerenciamento de projetos e controle de tarefas.

---

## Funcionalidades

### Autenticação
- Login de usuário
- Cadastro de conta
- Persistência de sessão com token JWT
- Redirecionamento automático quando não autenticado

### Dashboard
- Resumo geral das tarefas
- Quantidade total de tarefas
- Tarefas em andamento
- Tarefas concluídas
- Organização visual por status e prioridade

### Projetos
- Criação de projetos
- Visualização detalhada em painel lateral
- Controle de status do projeto
- Sistema de importação de tarefas (importação via JSON, textarea ou arquivo .json).
- Associação de tarefas a projetos

### Tasks
- Criação e gerenciamento de tarefas
- Status:
  - Pendente
  - Em andamento
  - Concluída
- Prioridades:
  - Baixa
  - Média
  - Alta

### Interface
- Tema claro/escuro
- Layout responsivo
- Modais reutilizáveis
- Organização visual baseada em prioridade e status

---

## Tecnologias Utilizadas

- HTML5
- CSS3
- JavaScript Vanilla
- Bootstrap
- Fetch API

---

## Estrutura do Projeto

```bash
TaskFlow Front-end/
│
├── assets/            # Logos, ícones e arquivos visuais
├── scripts/           # Lógica da aplicação
├── style/             # Arquivos CSS
│
├── index.html         # Login
├── cadastro.html      # Cadastro
├── dashboard.html     # Dashboard principal
├── projetos.html      # Página de projetos
```

---

## Configuração da API

O frontend utiliza um arquivo de configuração localizado em:

```bash
scripts/config.js
```

Exemplo:

```js
const ambiente_dev = true;

let API_BASE_URL;

if (ambiente_dev) {
  API_BASE_URL = "http://127.0.0.1:8000";
} else {
  API_BASE_URL = "https://taskflow-nnno.onrender.com";
}
```

Para ambiente local:
- mantenha `ambiente_dev = true`

Para produção:
- altere para `false`

---

## Como Executar

### 1. Clone o repositório

```bash
git clone <repo>
```

### 2. Abra o projeto

Você pode utilizar:
- VS Code
- Live Server
- Qualquer servidor estático

### 3. Configure a API

Edite:

```bash
scripts/config.js
```

### 4. Execute

Abra:

```bash
index.html
```

---

## Melhorias Futuras

- Migração para Vue ou React
- Integração em tempo real
- Drag and drop de tarefas
- Calendário integrado
- Sistema de notificações
- Filtros avançados
- PWA/Desktop com Tauri

---

## Arquitetura

O projeto segue uma estrutura simples e direta:

- Frontend desacoplado da API
- Comunicação via REST
- Token JWT armazenado no LocalStorage
- Renderização dinâmica via JavaScript Vanilla

A escolha por JS puro reduz dependências e ajuda no entendimento completo do fluxo da aplicação.  
É uma abordagem interessante para consolidar fundamentos antes de migrar para frameworks maiores.

---

## Observações

O frontend depende da API do TaskFlow para funcionar corretamente.

Sem a API ativa:
- login não funciona
- projetos não carregam
- tarefas não são exibidas

---

## Autor

Desenvolvido por Kauã.
