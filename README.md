# E-Commerce Backend API

A RESTful API for an e-commerce order management system built with NestJS, TypeScript, and PostgreSQL.

## 📋 Project Overview

This backend application provides APIs for:
- User authentication (register/login with JWT)
- Product catalog management
- Order creation and management
- User-specific order access control

## 🏗️ Architecture

This project uses **NestJS** framework. See [ARCHITECTURE.md](./ARCHITECTURE.md) for detailed architectural decisions and reasoning.

## 🛠️ Tech Stack

- **Framework**: NestJS (Node.js)
- **Language**: TypeScript
- **Database**: PostgreSQL
- **ORM**: (To be decided - Prisma/TypeORM/Sequelize)
- **Authentication**: JWT (JSON Web Tokens)
- **Containerization**: Docker & Docker Compose

## 📁 Project Structure

```
ecommerce-backend/
├── src/
│   ├── main.ts              # Application entry point
│   ├── app.module.ts        # Root module
│   ├── app.controller.ts    # Root controller
│   └── app.service.ts       # Root service
├── test/                    # E2E tests
├── .env                     # Environment variables (not committed)
├── docker-compose.yml       # Docker services configuration
├── Dockerfile               # Application container
└── README.md                # This file
```

## 🚀 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v18 or higher)
- **npm** (v9 or higher)
- **Docker** and **Docker Compose**
- **Git**

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd ecommerce-backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

## 🏃 Running the Application

### Development Mode (Local)

```bash
# Start in watch mode (auto-reload on file changes)
npm run start:dev
```

The server will start at `http://localhost:3000`

### Development Mode (Docker)

```bash
# Start all services (app + database)
docker-compose up

# Run in detached mode
docker-compose up -d

# Stop services
docker-compose down
```

### Production Mode

```bash
# Build the application
npm run build

# Start production server
npm run start:prod
```

## 🧪 Testing

```bash
# Run unit tests
npm run test

# Run unit tests in watch mode
npm run test:watch

# Run e2e tests
npm run test:e2e

# Generate test coverage report
npm run test:cov
```

## 📚 API Documentation

### Health Check
- **GET** `/health` - Check if the service is running

### Authentication (Coming in Session 2)
- **POST** `/auth/register` - Register a new user
- **POST** `/auth/login` - Login and receive JWT token

### Products (Coming in Session 3)
- **GET** `/products` - List all products

### Orders (Coming in Session 3)
- **POST** `/orders` - Create a new order (requires authentication)
- **GET** `/orders` - Get user's orders (requires authentication)
- **GET** `/orders/:id` - Get specific order (requires authentication)
- **PATCH** `/orders/:id` - Update order (requires authentication)
- **DELETE** `/orders/:id` - Cancel order (requires authentication)

## 🔧 Development Scripts

```bash
# Format code with Prettier
npm run format

# Lint code with ESLint
npm run lint

# Build for production
npm run build
```

## 🐳 Docker Commands

```bash
# Build Docker image
docker build -t ecommerce-backend .

# Run container
docker run -p 3000:3000 ecommerce-backend

# View logs
docker-compose logs -f

# Rebuild services
docker-compose up --build
```

## 🗄️ Database

### Migrations
```bash
# Run migrations (to be implemented)
npm run migration:run

# Revert migration
npm run migration:revert

# Generate migration
npm run migration:generate
```

### Seed Data
```bash
# Seed database with sample data (to be implemented)
npm run seed
```

## 🔐 Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Application
NODE_ENV=development
PORT=3000

# Database
DATABASE_URL=postgresql://user:password@localhost:5432/ecommerce_db

# JWT
JWT_SECRET=your-secret-key-here
JWT_EXPIRATION=1d
```

## 📝 Assignment Progress

- [x] Session 1: Framework Setup
  - [x] Framework selection (NestJS)
  - [x] Project initialization
  - [x] Environment configuration
  - [x] Folder structure
  - [x] Docker setup
  - [x] HTTP server
  - [x] Health check endpoint

- [ ] Session 2: Database & Authentication
- [ ] Session 3: Products & Orders APIs
- [ ] Session 4: Validation, Testing & Documentation

## 🤝 Contributing

This is a learning project. Follow best practices:
1. Create feature branches
2. Write meaningful commit messages
3. Add tests for new features
4. Update documentation

## 📄 License

This project is for educational purposes.

## 👤 Author

Vinay - Backend Development Assignment

---

**Last Updated**: February 9, 2026
