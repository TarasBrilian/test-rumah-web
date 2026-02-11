<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

# User management api

A NestJS-based backend for managing user authentication, and profile management.

## Prerequisites

Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v18+)
- [pnpm](https://pnpm.io/) or [npm](https://www.npmjs.com/)
- [PostgreSQL](https://www.postgresql.org/)

## Installation

1. Clone the repository.
2. Install dependencies:

```bash
pnpm install
# or
npm install
```

## Configuration

Create a `.env` file in the root directory and configure your database connection:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/rumah-web"
```

## Database Setup

Initialize the database schema and add seed data:

```bash
# Run migrations
pnpm run migrate

# Run seed data (optional)
pnpm run seed
```

## Running the Project

```bash
# development mode
pnpm run start:dev

# production mode
pnpm run start:prod
```

## Core Features

- **Authentication**: Register and Login with JWT support.
- **User Management**: CRUD operations for users with secure password hashing.
- **Validation**: Strict request validation using `class-validator`.

## API Endpoints (Quick Reference)

- `POST /auth/register`: Register a new account.
- `POST /auth/login`: Login and receive access token.
- `GET /users`: List all users (paginated).
- `PUT /users/:id`: Update user information.


## License

This project is [UNLICENSED](https://github.com/nestjs/nest/blob/master/LICENSE).