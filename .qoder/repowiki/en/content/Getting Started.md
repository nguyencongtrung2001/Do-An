# Getting Started

<cite>
**Referenced Files in This Document**
- [backend/package.json](file://backend/package.json)
- [backend/prisma/schema.prisma](file://backend/prisma/schema.prisma)
- [backend/prisma.config.ts](file://backend/prisma.config.ts)
- [backend/src/server.ts](file://backend/src/server.ts)
- [backend/src/app.ts](file://backend/src/app.ts)
- [backend/src/config/prisma.ts](file://backend/src/config/prisma.ts)
- [backend/src/config/cloudinary.config.ts](file://backend/src/config/cloudinary.config.ts)
- [backend/src/middlewares/errorHandler.ts](file://backend/src/middlewares/errorHandler.ts)
- [backend/src/middlewares/auth.middleware.ts](file://backend/src/middlewares/auth.middleware.ts)
- [backend/src/utils/ApiError.ts](file://backend/src/utils/ApiError.ts)
- [frontend/package.json](file://frontend/package.json)
- [frontend/next.config.ts](file://frontend/next.config.ts)
- [frontend/src/services/api.ts](file://frontend/src/services/api.ts)
- [frontend/README.md](file://frontend/README.md)
</cite>

## Table of Contents
1. [Introduction](#introduction)
2. [Project Structure](#project-structure)
3. [System Prerequisites](#system-prerequisites)
4. [Environment Setup](#environment-setup)
5. [Backend Installation and Setup](#backend-installation-and-setup)
6. [Frontend Installation and Setup](#frontend-installation-and-setup)
7. [Database Setup and Migration](#database-setup-and-migration)
8. [Initial Launch Procedures](#initial-launch-procedures)
9. [Development Workflow](#development-workflow)
10. [Verification Steps](#verification-steps)
11. [Troubleshooting Guide](#troubleshooting-guide)
12. [Conclusion](#conclusion)

## Introduction
This guide helps you set up and run the sports facility booking platform locally. It covers prerequisites, environment configuration, backend and frontend installation, database setup, and initial launch. You will also learn the development workflow, verification steps, and common troubleshooting tips.

## Project Structure
The project consists of two main parts:
- Backend: Express server with Prisma ORM, TypeScript, and PostgreSQL
- Frontend: Next.js application with TypeScript and React

```mermaid
graph TB
subgraph "Backend"
BE_PKG["backend/package.json"]
BE_SRV["backend/src/server.ts"]
BE_APP["backend/src/app.ts"]
BE_PRISMA_CFG["backend/src/config/prisma.ts"]
BE_SCHEMA["backend/prisma/schema.prisma"]
end
subgraph "Frontend"
FE_PKG["frontend/package.json"]
FE_NEXT["frontend/next.config.ts"]
FE_API["frontend/src/services/api.ts"]
end
BE_SRV --> BE_APP
BE_APP --> BE_PRISMA_CFG
BE_PRISMA_CFG --> BE_SCHEMA
FE_API --> BE_APP
```

**Diagram sources**
- [backend/src/server.ts:1-20](file://backend/src/server.ts#L1-L20)
- [backend/src/app.ts:1-21](file://backend/src/app.ts#L1-L21)
- [backend/src/config/prisma.ts:1-10](file://backend/src/config/prisma.ts#L1-L10)
- [backend/prisma/schema.prisma:1-126](file://backend/prisma/schema.prisma#L1-L126)
- [frontend/src/services/api.ts:1-83](file://frontend/src/services/api.ts#L1-L83)

**Section sources**
- [backend/src/server.ts:1-20](file://backend/src/server.ts#L1-L20)
- [backend/src/app.ts:1-21](file://backend/src/app.ts#L1-L21)
- [backend/src/config/prisma.ts:1-10](file://backend/src/config/prisma.ts#L1-L10)
- [backend/prisma/schema.prisma:1-126](file://backend/prisma/schema.prisma#L1-L126)
- [frontend/src/services/api.ts:1-83](file://frontend/src/services/api.ts#L1-L83)

## System Prerequisites
- Node.js: Required for both backend and frontend. The backend uses modern ES modules and TypeScript compilation during development. The frontend uses Next.js with React.
- PostgreSQL: Used as the primary database via Prisma and the pg adapter.
- Prisma: Used for schema definition, migrations, and client generation.

Key indicators in the repository:
- Backend dependencies include Prisma client, adapter, and PostgreSQL driver.
- Frontend uses Next.js and React.
- Prisma schema defines PostgreSQL as the provider.

**Section sources**
- [backend/package.json:14-28](file://backend/package.json#L14-L28)
- [backend/package.json:29-39](file://backend/package.json#L29-L39)
- [backend/prisma/schema.prisma:6-8](file://backend/prisma/schema.prisma#L6-L8)
- [frontend/package.json:11-25](file://frontend/package.json#L11-L25)

## Environment Setup
Create environment files for both backend and frontend. The backend loads environment variables via dotenv and expects:
- DATABASE_URL: PostgreSQL connection string
- CLOUDINARY_* variables: Cloudinary configuration for media uploads

The frontend reads NEXT_PUBLIC_API_URL for the backend base URL.

Recommended steps:
1. Create `.env` in the backend root with:
   - DATABASE_URL=postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public
   - CLOUDINARY_CLOUD_NAME=your_cloud_name
   - CLOUDINARY_API_KEY=your_api_key
   - CLOUDINARY_API_SECRET=your_api_secret
2. Create `.env.local` in the frontend root with:
   - NEXT_PUBLIC_API_URL=http://localhost:3000

Notes:
- The backend imports dotenv in configuration files and server entry point.
- The frontend reads NEXT_PUBLIC_API_URL from environment variables.

**Section sources**
- [backend/src/config/prisma.ts:1-10](file://backend/src/config/prisma.ts#L1-L10)
- [backend/src/config/cloudinary.config.ts:1-13](file://backend/src/config/cloudinary.config.ts#L1-L13)
- [backend/src/server.ts:1-20](file://backend/src/server.ts#L1-L20)
- [frontend/src/services/api.ts:1-2](file://frontend/src/services/api.ts#L1-L2)
- [frontend/README.md:1-37](file://frontend/README.md#L1-L37)

## Backend Installation and Setup
Follow these steps to prepare the backend:

1. Install dependencies
   - Navigate to the backend directory and run your package manager to install dependencies.

2. Verify scripts
   - Development script runs the server with hot reload using a TypeScript-compatible runner.
   - Tests placeholder exists but no tests configured yet.

3. Start the backend server
   - Run the development script to start the server with hot reload enabled.

What to expect:
- The server connects to PostgreSQL via Prisma and logs successful connection.
- The server listens on the port defined by the PORT environment variable (default 3000).

**Section sources**
- [backend/package.json:6-9](file://backend/package.json#L6-L9)
- [backend/src/server.ts:1-20](file://backend/src/server.ts#L1-L20)

## Frontend Installation and Setup
Follow these steps to prepare the frontend:

1. Install dependencies
   - Navigate to the frontend directory and install dependencies.

2. Configure Next.js
   - The project enables React Compiler in Next.js configuration.

3. Start the frontend
   - Run the development script to start the Next.js app on the default port.

Verification:
- Open http://localhost:3000 in your browser to confirm the frontend is running.

**Section sources**
- [frontend/package.json:5-10](file://frontend/package.json#L5-L10)
- [frontend/next.config.ts:1-9](file://frontend/next.config.ts#L1-L9)
- [frontend/README.md:5-17](file://frontend/README.md#L5-L17)

## Database Setup and Migration
Prisma manages the database schema and migrations:

1. Prisma configuration
   - The Prisma config file defines the schema path, migration folder, and datasource URL from environment variables.

2. Schema definition
   - The schema defines models for users, facilities, bookings, reviews, and related entities with appropriate relations and defaults.

3. Migration workflow
   - Generate a migration based on schema changes.
   - Apply the migration to the database using the Prisma CLI.

4. Client generation
   - Prisma generates TypeScript clients under the specified output path.

Notes:
- The schema indicates PostgreSQL as the provider and includes comments about check constraints requiring additional migration setup.
- The backend connects to the database using the Prisma client with the pg adapter.

**Section sources**
- [backend/prisma.config.ts:1-15](file://backend/prisma.config.ts#L1-L15)
- [backend/prisma/schema.prisma:1-126](file://backend/prisma/schema.prisma#L1-L126)
- [backend/src/config/prisma.ts:1-10](file://backend/src/config/prisma.ts#L1-L10)

## Initial Launch Procedures
Start both backend and frontend:

1. Backend
   - Ensure DATABASE_URL is set in the backend .env file.
   - Start the backend server using the development script.

2. Frontend
   - Ensure NEXT_PUBLIC_API_URL points to the backend server.
   - Start the frontend using the development script.

3. Access applications
   - Backend: http://localhost:3000
   - Frontend: http://localhost:3000

Expected behavior:
- Backend logs successful database connection and server start.
- Frontend serves the Next.js application.

**Section sources**
- [backend/src/server.ts:1-20](file://backend/src/server.ts#L1-L20)
- [frontend/src/services/api.ts:1-2](file://frontend/src/services/api.ts#L1-L2)
- [frontend/README.md:5-17](file://frontend/README.md#L5-L17)

## Development Workflow
Local development supports hot reloading and iterative development:

- Backend
  - Development script uses a TypeScript-compatible runner to watch and restart on changes.
  - Middleware and error handling are integrated into the Express app.

- Frontend
  - Next.js dev server provides hot reloading for React components and pages.
  - API service uses environment-based base URL for requests.

- Authentication and error handling
  - Authentication middleware validates bearer tokens.
  - Global error handler standardizes error responses and logs unexpected errors.

**Section sources**
- [backend/package.json:7-8](file://backend/package.json#L7-L8)
- [backend/src/app.ts:1-21](file://backend/src/app.ts#L1-L21)
- [backend/src/middlewares/auth.middleware.ts:1-28](file://backend/src/middlewares/auth.middleware.ts#L1-L28)
- [backend/src/middlewares/errorHandler.ts:1-38](file://backend/src/middlewares/errorHandler.ts#L1-L38)
- [frontend/package.json:5-10](file://frontend/package.json#L5-L10)

## Verification Steps
Confirm your installation and configuration:

1. Backend connectivity
   - Check that the backend logs show successful database connection and server start.
   - Verify the server responds on the configured port.

2. Frontend connectivity
   - Confirm the frontend loads without build errors.
   - Ensure API calls to the backend succeed using the configured base URL.

3. Database schema
   - Verify Prisma client generation succeeded and matches the schema.
   - Confirm migrations apply without errors.

4. Environment variables
   - Ensure DATABASE_URL is present and valid.
   - Confirm Cloudinary variables are set for media uploads.
   - Verify NEXT_PUBLIC_API_URL points to the backend.

**Section sources**
- [backend/src/server.ts:7-13](file://backend/src/server.ts#L7-L13)
- [frontend/src/services/api.ts:1-83](file://frontend/src/services/api.ts#L1-L83)
- [backend/prisma.schema.prisma:1-126](file://backend/prisma/schema.prisma#L1-L126)
- [backend/src/config/prisma.ts:6-8](file://backend/src/config/prisma.ts#L6-L8)

## Troubleshooting Guide
Common setup issues and resolutions:

- Database connection failures
  - Verify DATABASE_URL format and credentials.
  - Ensure PostgreSQL is running and accessible.
  - Check Prisma adapter configuration and client initialization.

- Port conflicts
  - Change the backend PORT environment variable if port 3000 is in use.
  - Adjust frontend port if needed.

- Missing environment variables
  - Ensure .env exists in backend and .env.local exists in frontend.
  - Confirm required variables are present (DATABASE_URL, Cloudinary keys, NEXT_PUBLIC_API_URL).

- Prisma client generation errors
  - Regenerate Prisma client after schema changes.
  - Check Prisma config for correct schema path and datasource URL.

- CORS and API communication
  - Confirm frontend NEXT_PUBLIC_API_URL matches backend address.
  - Verify backend routes are mounted and reachable.

- Authentication errors
  - Ensure Authorization headers include valid bearer tokens.
  - Check token verification logic and error middleware behavior.

**Section sources**
- [backend/src/config/prisma.ts:6-8](file://backend/src/config/prisma.ts#L6-L8)
- [backend/src/server.ts:14-17](file://backend/src/server.ts#L14-L17)
- [backend/src/middlewares/errorHandler.ts:17-30](file://backend/src/middlewares/errorHandler.ts#L17-L30)
- [backend/src/middlewares/auth.middleware.ts:12-19](file://backend/src/middlewares/auth.middleware.ts#L12-L19)
- [frontend/src/services/api.ts:24-32](file://frontend/src/services/api.ts#L24-L32)

## Conclusion
You now have the fundamentals to set up, configure, and run the sports facility booking platform locally. Follow the environment setup, backend/frontend installation, database migration, and initial launch procedures. Use the development workflow for iterative development and refer to the troubleshooting guide for common issues. Perform the verification steps to ensure everything is working as expected.