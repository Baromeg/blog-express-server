# Blog API – GraphQL with Sequelize, Postgres, and Express

## Project Overview

This project is a **Node.js** application built with **Express**, **Apollo GraphQL**, **Sequelize ORM**, and **PostgreSQL**.  
It serves as a **learning exercise** to practise **authentication, authorisation**, **data loading optimisation**, and **secure API design**.

### Key Features

- **GraphQL API** with Apollo Server
- **Sequelize ORM** with PostgreSQL
- **Argon2id Password Hashing** for secure storage
- **JWT Authentication** with Role-Based Access Control
- **DataLoader Integration** to prevent N+1 query issues
- **Strong TypeScript Typing** across resolvers, services, and context
- **Containerised with Docker**
- **Makefile** for developer productivity
- **Unit and End-to-End (E2E) Testing** with Vitest and Supertest

## Getting Started

### Prerequisites

- Node.js 20+
- PNPM 8+
- Docker & Docker Compose

### Initial Setup

pnpm install

## Running the Services

### Start in Development Mode

make dev

- Runs API with hot-reloading (Node.js, ts-node)
- Runs Postgres database container
- Accessible at: http://localhost:3000/graphql

### Start in Production Mode

make start

- Runs API using the production build (dist)
- Runs Postgres database container

### Stop and Clean Up

make stop

- Stops and removes all containers and volumes

### Unit Tests

make test

Note: Ensure services are running before executing E2E tests.

## Makefile Commands

| Command    | Description                                |
| ---------- | ------------------------------------------ |
| make start | Build and start production services        |
| make dev   | Start dev services with hot-reloading      |
| make stop  | Stop and remove all containers and volumes |
| make seed  | Seed database with sample data             |
| make test  | Run unit tests (unit & e2e)                |

## Accessing the API

Once running, access the GraphQL Playground at:

http://localhost:3000/graphql

Use this to run queries, mutations, and manage your schema interactively.

## Current GraphQL Schema

### Queries

type Query {
users: [User!]!
user(id: ID!): User
posts: [Post!]!
post(id: ID!): Post
}

### Mutations

type Mutation {
register(input: RegisterInput!): User!
login(input: LoginInput!): String!
createPost(input: CreatePostInput!): Post!
deletePost(id: ID!): Boolean!
}

## Access Control

| Action         | Requirement             |
| -------------- | ----------------------- |
| View Posts     | Public                  |
| Create Post    | Logged-in user or admin |
| Delete Post    | Post owner or admin     |
| View Users     | Admin only              |
| Get User By ID | Logged-in user or admin |

## Environment Configuration

All environment variables are declared in .env at the project root.

Example:

PORT=3000
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=blog
DB_PORT=5432
POSTGRES_HOST=db
DATABASE_URL=postgresql://postgres:postgres@db:5432/blog?schema=public
JWT_SECRET=your-secure-jwt-secret

## Testing

### Unit Testing

Run unit tests with:

pnpm test:unit

### End-to-End Testing

Ensure your server and database are running, then run:

pnpm test:e2e

Or use:

make test # Runs unit tests  
make teste2e # Runs end-to-end tests

## Good Practices Followed

- Type safety in resolvers and services
- Role and ownership-based guards
- Dockerised local development
- Scalable schema and resolver structure
- Single source of truth .env for all services
- Testing setup for both unit and E2E scenarios
