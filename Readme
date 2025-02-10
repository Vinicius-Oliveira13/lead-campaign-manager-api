# 🚀 Lead Campaign Manager API

API RESTful para controle de **leads**, **campanhas** e **grupos**, desenvolvida com **Node.js**, **Express** e **Prisma**, utilizando **TypeScript** para maior robustez e segurança de tipos. A aplicação segue uma arquitetura limpa, separando responsabilidades em controllers, services, repositórios e middlewares.

## 📊 **Tecnologias Utilizadas**
- **Node.js** + **Express**: Framework para construção da API.
- **TypeScript**: Tipagem estática para maior confiabilidade.
- **Prisma ORM**: Abstração para acesso ao banco de dados.
- **Zod**: Validação de dados de entrada de forma declarativa.
- **TSX**: Execução de TypeScript sem necessidade de compilação prévia (ambiente de desenvolvimento).

---

## 📁 **Estrutura do Projeto**

```
src/
├── controllers/   # Lida com as requisições HTTP
├── services/      # Lógica de negócios
├── repositories/  # Comunicação com o banco de dados via Prisma
├── middlewares/   # Tratamento de erros e validação de dados
├── schemas/       # Esquemas de validação com Zod
└── server.ts      # Ponto de entrada da aplicação
```

---

## 🚀 **Como Executar o Projeto**

### 1️⃣ Pré-requisitos
- **Node.js** (versão 18+ recomendada)
- **PostgreSQL** (ou outro banco de dados compatível com Prisma)
- **Yarn** ou **npm**

### 2️⃣ Instalação
```bash
# Clone o repositório
git clone https://github.com/Vinicius-Oliveira13/lead-campaign-manager-api.git

# Acesse o diretório do projeto
cd lead-campaign-manager-api

# Instale as dependências
npm install
```

### 3️⃣ Configuração do Prisma
```bash
# Crie o arquivo de configuração do banco de dados
cp .env.example .env

# Gere o cliente Prisma
npx prisma generate

# Execute as migrations
npx prisma migrate dev
```

### 4️⃣ Scripts Disponíveis

- **Modo Desenvolvimento:**  
  ```bash
  npm run dev
  ```
  Executa o servidor com **hot reload** usando TSX.

- **Build de Produção:**  
  ```bash
  npm run build
  ```
  Compila o código TypeScript para JavaScript.

- **Start em Produção:**  
  ```bash
  npm start
  ```
  Executa o servidor usando o código compilado.

---

## 📬 **Rotas da API**

#### 🔗 **Leads**  
- `GET /leads` → Listar todos os leads  
- `POST /leads` → Criar um novo lead  
- `GET /leads/:id` → Obter detalhes de um lead específico  
- `PUT /leads/:id` → Atualizar um lead existente  
- `DELETE /leads/:id` → Deletar um lead  

#### 👥 **Groups**  
- `GET /groups` → Listar todos os grupos  
- `POST /groups` → Criar um novo grupo  
- `GET /groups/:id` → Obter detalhes de um grupo específico  
- `PUT /groups/:id` → Atualizar um grupo existente  
- `DELETE /groups/:id` → Excluir um grupo  

##### 📌 **Gerenciamento de Leads em Grupos**  
- `GET /groups/:groupId/leads` → Listar leads associados a um grupo  
- `POST /groups/:groupId/leads` → Adicionar um lead a um grupo  
- `DELETE /groups/:groupId/leads/:leadId` → Remover um lead de um grupo  

#### 📢 **Campaigns**  
- `GET /campaigns` → Listar todas as campanhas  
- `POST /campaigns` → Criar uma nova campanha  
- `GET /campaigns/:id` → Obter detalhes de uma campanha específica  
- `PUT /campaigns/:id` → Atualizar uma campanha existente  
- `DELETE /campaigns/:id` → Excluir uma campanha  

##### 🎯 **Gerenciamento de Leads em Campanhas**  
- `GET /campaigns/:campaignId/leads` → Listar leads associados a uma campanha  
- `POST /campaigns/:campaignId/leads` → Adicionar um lead a uma campanha  
- `PUT /campaigns/:campaignId/leads/:leadId` → Atualizar o status de um lead em uma campanha  
- `DELETE /campaigns/:campaignId/leads/:leadId` → Remover um lead de uma campanha  

#### 🧪 **Rota de Teste**  
- `GET /test` → Retorna uma mensagem de teste `{ message: "Hello World" }`  

---

## 🛡️ **Validação de Dados**
Utilizamos o **Zod** para garantir que todas as entradas estejam no formato correto antes de serem processadas. Os esquemas de validação estão localizados em `src/schemas/`.

---

## 🐛 **Tratamento de Erros**
Erros são tratados de forma centralizada por middlewares, garantindo respostas consistentes e claras para o cliente da API.

---

## 🤝 **Contribuição**
1. Fork o projeto.
2. Crie sua branch: `git checkout -b feature/minha-feature`
3. Commit suas alterações: `git commit -m 'feat: adiciona nova funcionalidade'`
4. Push para sua branch: `git push origin feature/minha-feature`
5. Abra um Pull Request. 🚀

---

## 📜 **Licença**
Este projeto está licenciado sob a [MIT License](LICENSE).

---

💡 Feito com ❤️ por [Vinicius](https://github.com/Vinicius-Oliveira13)

