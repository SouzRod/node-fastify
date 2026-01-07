# Node.js + Fastify API

Um projeto de estudo construído com **Node.js** e **Fastify**, integrando MongoDB para persistência e Redis para cache.

## 📋 Sobre o Projeto

Este é um servidor REST API moderno desenvolvido com:
- **Node.js**: Runtime JavaScript robusto e confiável
- **Fastify**: Framework web de alta performance
- **MongoDB**: Banco de dados NoSQL para armazenamento de dados
- **Redis**: Cache em memória para otimização de performance
- **TypeScript**: Tipagem estática completa

A arquitetura segue princípios de **Clean Architecture**, separando a aplicação em camadas bem definidas.

## 🏗️ Estrutura do Projeto

```
├── src/
│   ├── application/          # Casos de uso e lógica de negócio
│   │   ├── config/           # Configurações da aplicação
│   │   └── useCase/          # Casos de uso (CRUD de usuários, etc)
│   ├── domain/               # Entidades, interfaces e erros
│   │   ├── enum/             # Enumerações (HTTP status, etc)
│   │   ├── errors/           # Definições de erros customizados
│   │   └── interfaces/       # Contratos e interfaces da aplicação
│   ├── infrastructure/       # Integrações externas
│   │   ├── external/         # Serviços externos (MongoDB, Redis)
│   │   └── repository/       # Repositórios de dados
│   └── presentation/         # Camada de apresentação
│       └── router/           # Definição de rotas HTTP
├── index.ts                  # Entry point da aplicação
├── Dockerfile                # Configuração Docker para produção
├── docker-compose.yml        # Orquestração de serviços (app, mongo, redis)
├── package.json              # Dependências e scripts
├── jest.config.js            # Configuração Jest para testes
└── tsconfig.json             # Configuração TypeScript
```

## 🚀 Quick Start

### Pré-requisitos

- **Node.js** v24.11.0 ou superior ([instalar](https://nodejs.org))
- **npm** v11.6.1 ou superior
- **Docker** e **Docker Compose** (para ambiente containerizado)

### Desenvolvimento Local

1. **Instale as dependências:**
   ```bash
   npm install
   ```

2. **Execute em modo desenvolvimento:**
   ```bash
   npm start
   ```

A API estará disponível em `http://localhost:3000`

### Com Docker Compose

Para rodar a aplicação completa com MongoDB e Redis:

```bash
docker compose up --build
```

Isso iniciará:
- **App**: http://localhost:3000
- **MongoDB**: localhost:27017
- **Redis**: localhost:6379

## 📦 Dependências

### Produção
- **fastify** ^5.6.2 - Framework web de alta performance
- **@fastify/cors** ^11.2.0 - Middleware CORS para Fastify
- **@fastify/swagger** ^9.6.1 - Documentação Swagger/OpenAPI automática
- **@fastify/swagger-ui** ^5.2.3 - Interface web para documentação Swagger
- **mongodb** ^7.0.0 - Driver MongoDB oficial
- **ioredis** ^5.8.2 - Cliente Redis para Node.js
- **uuid** ^13.0.0 - Gerador de UUIDs
- **dotenv** ^17.2.3 - Carregador de variáveis de ambiente
- **tsc-alias** ^1.8.16 - Suporte a path aliases do TypeScript

### Desenvolvimento
- **typescript** ^5.9.3 - Linguagem TypeScript
- **tsx** ^4.21.0 - Executor TypeScript
- **jest** ^30.2.0 - Framework de testes
- **ts-jest** ^29.4.6 - Suporte TypeScript em Jest
- **@types/node** ^25.0.3 - Tipos TypeScript para Node.js
- **@types/jest** ^30.0.0 - Tipos TypeScript para Jest
- **@types/redis** ^4.0.10 - Tipos TypeScript para Redis

## 🔧 Variáveis de Ambiente

Configure as seguintes variáveis no arquivo `.env`:

```bash
# Aplicação
PORT=3000                               # Porta da API
NODE_ENV=development                    # Ambiente (development, production)

# Redis
REDIS_ENABLED=true                      # Habilitar cache Redis
REDIS_URI=redis://localhost:6379        # URI de conexão Redis
REDIS_DEFAULT_EXPIRE=5                  # Tempo de expiração em segundos

# MongoDB
MONGODB_URI=mongodb://localhost:27017/node_fastify   # URI de conexão MongoDB
```

## Rotas Disponíveis

As rotas estão organizadas em `src/presentation/router/` e incluem operações CRUD para usuários:

- `GET /users` - Listar todos os usuários
- `GET /users/:id` - Obter usuário por ID
- `POST /users` - Criar novo usuário
- `PUT /users/:id` - Atualizar usuário
- `DELETE /users/:id` - Deletar usuário

## 🧪 Testes

Para executar os testes automatizados:

```bash
npm test
```

Os testes estão localizados em `test/` e cobrem os casos de uso da aplicação.

## 🐳 Compilação para Produção

O projeto usa TypeScript com compilação para JavaScript:

```bash
npm run build
```

Gera os arquivos compilados em `dist/` que podem ser executados com Node.js:

```bash
npm run start:prod
```

## 📝 Scripts Disponíveis

```bash
# Desenvolvimento
npm start

# Build TypeScript
npm run build

# Produção (executável compilado)
npm run start:prod

# Testes
npm test
```

## 📚 Recursos

- [Documentação Fastify](https://www.fastify.io)
- [Documentação Node.js](https://nodejs.org/docs)
- [Driver MongoDB](https://www.mongodb.com/docs/drivers/node)
- [Cliente Redis ioredis](https://github.com/luin/ioredis)

