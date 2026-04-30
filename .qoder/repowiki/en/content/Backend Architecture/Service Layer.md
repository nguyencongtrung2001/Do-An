# Service Layer

<cite>
**Referenced Files in This Document**
- [user.service.ts](file://backend/src/services/user.service.ts)
- [admin.service.ts](file://backend/src/services/admin.service.ts)
- [field.service.ts](file://backend/src/services/field.service.ts)
- [owner.service.ts](file://backend/src/services/owner.service.ts)
- [user.repository.ts](file://backend/src/repositories/user.repository.ts)
- [court.repository.ts](file://backend/src/repositories/court.repository.ts)
- [location.repository.ts](file://backend/src/repositories/location.repository.ts)
- [booking.repository.ts](file://backend/src/repositories/booking.repository.ts)
- [user.controller.ts](file://backend/src/controllers/user.controller.ts)
- [admin.controller.ts](file://backend/src/controllers/admin.controller.ts)
- [field.controller.ts](file://backend/src/controllers/field.controller.ts)
- [owner.controller.ts](file://backend/src/controllers/owner.controller.ts)
- [errorHandler.ts](file://backend/src/middlewares/errorHandler.ts)
- [ApiError.ts](file://backend/src/utils/ApiError.ts)
- [prisma.ts](file://backend/src/config/prisma.ts)
- [jwt.ts](file://backend/src/utils/jwt.ts)
- [auth.middleware.ts](file://backend/src/middlewares/auth.middleware.ts)
</cite>

## Table of Contents
1. [Introduction](#introduction)
2. [Project Structure](#project-structure)
3. [Core Components](#core-components)
4. [Architecture Overview](#architecture-overview)
5. [Detailed Component Analysis](#detailed-component-analysis)
6. [Dependency Analysis](#dependency-analysis)
7. [Performance Considerations](#performance-considerations)
8. [Troubleshooting Guide](#troubleshooting-guide)
9. [Conclusion](#conclusion)
10. [Appendices](#appendices)

## Introduction
This document provides comprehensive service layer documentation for the backend. It explains how business logic is encapsulated in services, how repositories handle persistence, and how controllers orchestrate requests. It covers dependency injection patterns, transaction management, business rule enforcement, data validation, cross-service coordination, error handling, logging, and performance optimization. It also outlines responsibilities for user management, admin operations, field/court discovery, and owner operations, and provides guidance on extending services while maintaining business logic consistency.

## Project Structure
The service layer follows a layered architecture:
- Controllers: HTTP entry points that parse requests, delegate to services, and return responses.
- Services: Business logic orchestrators that coordinate repositories, enforce rules, and manage transactions.
- Repositories: Data access objects that encapsulate Prisma queries and ID generation.
- Utilities and Middleware: Shared error handling, JWT utilities, and authentication middleware.
- Configuration: Prisma client configured with a PostgreSQL adapter.

```mermaid
graph TB
subgraph "Presentation"
UC["user.controller.ts"]
AC["admin.controller.ts"]
FC["field.controller.ts"]
OC["owner.controller.ts"]
end
subgraph "Services"
US["user.service.ts"]
AS["admin.service.ts"]
FS["field.service.ts"]
OS["owner.service.ts"]
end
subgraph "Repositories"
UR["user.repository.ts"]
CR["court.repository.ts"]
LR["location.repository.ts"]
BR["booking.repository.ts"]
end
subgraph "Persistence"
PRISMA["prisma.ts"]
end
subgraph "Shared"
ERR["ApiError.ts"]
EH["errorHandler.ts"]
JWT["jwt.ts"]
AUTH["auth.middleware.ts"]
end
UC --> US
AC --> AS
FC --> FS
OC --> OS
US --> UR
AS --> UR
OS --> UR
OS --> LR
OS --> CR
OS --> BR
UR --> PRISMA
CR --> PRISMA
LR --> PRISMA
BR --> PRISMA
UC -.uses.-> JWT
OC -.uses.-> AUTH
AC -.uses.-> AUTH
UC -.throws.-> ERR
AC -.throws.-> ERR
FC -.throws.-> ERR
OC -.throws.-> ERR
EH -.global.-> UC
EH -.global.-> AC
EH -.global.-> FC
EH -.global.-> OC
```

**Diagram sources**
- [user.controller.ts:1-14](file://backend/src/controllers/user.controller.ts#L1-L14)
- [admin.controller.ts:1-13](file://backend/src/controllers/admin.controller.ts#L1-L13)
- [field.controller.ts:1-11](file://backend/src/controllers/field.controller.ts#L1-L11)
- [owner.controller.ts:1-110](file://backend/src/controllers/owner.controller.ts#L1-L110)
- [user.service.ts:1-69](file://backend/src/services/user.service.ts#L1-L69)
- [admin.service.ts:1-57](file://backend/src/services/admin.service.ts#L1-L57)
- [field.service.ts:1-42](file://backend/src/services/field.service.ts#L1-L42)
- [owner.service.ts:1-148](file://backend/src/services/owner.service.ts#L1-L148)
- [user.repository.ts:1-53](file://backend/src/repositories/user.repository.ts#L1-L53)
- [court.repository.ts:1-83](file://backend/src/repositories/court.repository.ts#L1-L83)
- [location.repository.ts:1-51](file://backend/src/repositories/location.repository.ts#L1-L51)
- [booking.repository.ts:1-49](file://backend/src/repositories/booking.repository.ts#L1-L49)
- [prisma.ts:1-10](file://backend/src/config/prisma.ts#L1-L10)
- [ApiError.ts:1-13](file://backend/src/utils/ApiError.ts#L1-L13)
- [errorHandler.ts:1-38](file://backend/src/middlewares/errorHandler.ts#L1-L38)
- [jwt.ts](file://backend/src/utils/jwt.ts)
- [auth.middleware.ts](file://backend/src/middlewares/auth.middleware.ts)

**Section sources**
- [user.controller.ts:1-14](file://backend/src/controllers/user.controller.ts#L1-L14)
- [admin.controller.ts:1-13](file://backend/src/controllers/admin.controller.ts#L1-L13)
- [field.controller.ts:1-11](file://backend/src/controllers/field.controller.ts#L1-L11)
- [owner.controller.ts:1-110](file://backend/src/controllers/owner.controller.ts#L1-L110)
- [user.service.ts:1-69](file://backend/src/services/user.service.ts#L1-L69)
- [admin.service.ts:1-57](file://backend/src/services/admin.service.ts#L1-L57)
- [field.service.ts:1-42](file://backend/src/services/field.service.ts#L1-L42)
- [owner.service.ts:1-148](file://backend/src/services/owner.service.ts#L1-L148)
- [user.repository.ts:1-53](file://backend/src/repositories/user.repository.ts#L1-L53)
- [court.repository.ts:1-83](file://backend/src/repositories/court.repository.ts#L1-L83)
- [location.repository.ts:1-51](file://backend/src/repositories/location.repository.ts#L1-L51)
- [booking.repository.ts:1-49](file://backend/src/repositories/booking.repository.ts#L1-L49)
- [prisma.ts:1-10](file://backend/src/config/prisma.ts#L1-L10)
- [ApiError.ts:1-13](file://backend/src/utils/ApiError.ts#L1-L13)
- [errorHandler.ts:1-38](file://backend/src/middlewares/errorHandler.ts#L1-L38)
- [jwt.ts](file://backend/src/utils/jwt.ts)
- [auth.middleware.ts](file://backend/src/middlewares/auth.middleware.ts)

## Core Components
- User Service: Handles user registration and login, enforces uniqueness of email/phone, hashes passwords, and generates tokens.
- Admin Service: Provides user listing and owner creation flows with duplicate checks and password hashing.
- Field Service: Aggregates courts with ratings and associated location details for discovery.
- Owner Service: Coordinates owner registration (user + location), creates courts with images, retrieves owner’s courts/bookings, and updates booking statuses within ownership boundaries; uses Prisma transactions for atomicity.

Key implementation patterns:
- Dependency Injection: Services depend on repositories via constructor parameters or module-scoped instances; repositories depend on the Prisma client.
- Transaction Management: Owner operations use Prisma transactions to ensure atomicity across user and location creation, and across court creation and image insertion.
- Cross-service Coordination: Owner service coordinates multiple repositories (user, location, court, booking) and uses Prisma relations to enforce ownership constraints.
- Error Handling: Centralized via ApiError and a global error handler middleware; Prisma-specific errors are normalized.

**Section sources**
- [user.service.ts:1-69](file://backend/src/services/user.service.ts#L1-L69)
- [admin.service.ts:1-57](file://backend/src/services/admin.service.ts#L1-L57)
- [field.service.ts:1-42](file://backend/src/services/field.service.ts#L1-L42)
- [owner.service.ts:1-148](file://backend/src/services/owner.service.ts#L1-L148)
- [user.repository.ts:1-53](file://backend/src/repositories/user.repository.ts#L1-L53)
- [court.repository.ts:1-83](file://backend/src/repositories/court.repository.ts#L1-L83)
- [location.repository.ts:1-51](file://backend/src/repositories/location.repository.ts#L1-L51)
- [booking.repository.ts:1-49](file://backend/src/repositories/booking.repository.ts#L1-L49)
- [errorHandler.ts:1-38](file://backend/src/middlewares/errorHandler.ts#L1-L38)
- [ApiError.ts:1-13](file://backend/src/utils/ApiError.ts#L1-L13)
- [prisma.ts:1-10](file://backend/src/config/prisma.ts#L1-L10)

## Architecture Overview
The service layer adheres to clean architecture principles:
- Controllers are thin and delegate to services.
- Services encapsulate business rules and orchestrate repositories.
- Repositories abstract persistence and ID generation.
- Transactions are used where atomicity is required.
- Global error handling ensures consistent error responses.

```mermaid
sequenceDiagram
participant C as "Controller"
participant S as "Service"
participant R as "Repository"
participant P as "Prisma"
C->>S : "Call business method"
S->>R : "Query/Create/Update"
R->>P : "Execute Prisma operation"
P-->>R : "Result"
R-->>S : "Domain result"
S-->>C : "Business result"
Note over S,P : "Use transactions for atomic operations"
```

**Diagram sources**
- [user.controller.ts:1-14](file://backend/src/controllers/user.controller.ts#L1-L14)
- [user.service.ts:1-69](file://backend/src/services/user.service.ts#L1-L69)
- [user.repository.ts:1-53](file://backend/src/repositories/user.repository.ts#L1-L53)
- [prisma.ts:1-10](file://backend/src/config/prisma.ts#L1-L10)

## Detailed Component Analysis

### User Service
Responsibilities:
- Validate uniqueness of email/phone during registration.
- Generate next user ID.
- Hash password before persisting.
- Authenticate users by verifying credentials and generating tokens.

Processing logic highlights:
- Duplicate check against email/phone.
- Sequential steps: existence check → next ID → hash → persist → token generation.

```mermaid
flowchart TD
Start(["createUser Entry"]) --> CheckDup["Check existing user by email/phone"]
CheckDup --> Exists{"Already exists?"}
Exists --> |Yes| ThrowDup["Throw ApiError duplicate"]
Exists --> |No| GenId["Generate next user ID"]
GenId --> HashPwd["Hash password"]
HashPwd --> Persist["Persist user via repository"]
Persist --> Token["Generate JWT token"]
Token --> Done(["Return user + token"])
ThrowDup --> Done
```

**Diagram sources**
- [user.service.ts:8-42](file://backend/src/services/user.service.ts#L8-L42)
- [user.repository.ts:10-49](file://backend/src/repositories/user.repository.ts#L10-L49)

**Section sources**
- [user.service.ts:1-69](file://backend/src/services/user.service.ts#L1-L69)
- [user.repository.ts:1-53](file://backend/src/repositories/user.repository.ts#L1-L53)
- [jwt.ts](file://backend/src/utils/jwt.ts)

### Admin Service
Responsibilities:
- List all users.
- Retrieve a user by ID with 404 handling.
- Create owners with duplicate checks, password hashing, and persisted documents.

Processing logic highlights:
- Reuses user repository for duplicate checks and persistence.
- Returns owner record after creation.

```mermaid
sequenceDiagram
participant C as "Admin Controller"
participant S as "Admin Service"
participant R as "User Repository"
C->>S : "getAllUsers()"
S->>R : "findAll()"
R-->>S : "users"
S-->>C : "users"
C->>S : "getUserById(id)"
S->>R : "findById(id)"
R-->>S : "user or null"
S-->>C : "user or throws ApiError"
```

**Diagram sources**
- [admin.controller.ts:1-13](file://backend/src/controllers/admin.controller.ts#L1-L13)
- [admin.service.ts:7-19](file://backend/src/services/admin.service.ts#L7-L19)
- [user.repository.ts:4-8](file://backend/src/repositories/user.repository.ts#L4-L8)

**Section sources**
- [admin.service.ts:1-57](file://backend/src/services/admin.service.ts#L1-L57)
- [admin.controller.ts:1-13](file://backend/src/controllers/admin.controller.ts#L1-L13)
- [user.repository.ts:1-53](file://backend/src/repositories/user.repository.ts#L1-L53)

### Field Service
Responsibilities:
- Aggregate courts with details, compute average rating from reviews, select a representative image, and expose essential fields for discovery.

Processing logic highlights:
- Fetches courts with nested includes for images, location, and bookings/reviews.
- Computes average stars per court and selects a default image if none exist.

```mermaid
flowchart TD
StartF(["getFields Entry"]) --> Fetch["Fetch courts with details"]
Fetch --> Map["Map each court to summary"]
Map --> Reviews["Aggregate stars and counts"]
Reviews --> Avg["Compute average rating"]
Avg --> ImageSel["Select first image or default"]
ImageSel --> Build["Build summary object"]
Build --> DoneF(["Return fields list"])
```

**Diagram sources**
- [field.service.ts:4-38](file://backend/src/services/field.service.ts#L4-L38)
- [court.repository.ts:52-64](file://backend/src/repositories/court.repository.ts#L52-L64)

**Section sources**
- [field.service.ts:1-42](file://backend/src/services/field.service.ts#L1-L42)
- [court.repository.ts:1-83](file://backend/src/repositories/court.repository.ts#L1-L83)

### Owner Service
Responsibilities:
- Owner registration: create user and location in a single transaction; set initial role/status; generate token.
- Manage courts: list, add, and update with ownership verification.
- Manage bookings: list and update status with ownership verification.
- Enforce business rules: ownership checks, validation of required inputs, and transactional integrity.

Processing logic highlights:
- Registration transaction: user + location creation.
- Add court transaction: court + images creation.
- Ownership checks via repository queries that traverse relations.

```mermaid
sequenceDiagram
participant C as "Owner Controller"
participant S as "Owner Service"
participant U as "User Repository"
participant L as "Location Repository"
participant T as "Prisma Transaction"
participant B as "Booking Repository"
C->>S : "registerOwner(data)"
S->>U : "findByEmailOrPhone"
U-->>S : "existing user?"
S->>T : "$transaction(create user + location)"
T-->>S : "{user, location}"
S-->>C : "{user, location, token}"
C->>S : "addCourt(userId, data, images)"
S->>L : "findFirstByOwnerId(userId)"
L-->>S : "location or null"
S->>T : "$transaction(create court + images)"
T-->>S : "court"
S-->>C : "court"
C->>S : "getMyBookings(userId)"
S->>B : "findByOwnerId(userId)"
B-->>S : "bookings"
S-->>C : "bookings"
C->>S : "updateBookingStatus(userId, id, status)"
S->>B : "findByIdAndOwnerId(id, userId)"
B-->>S : "booking or null"
S->>B : "updateStatus(id, status)"
B-->>S : "updated booking"
S-->>C : "updated booking"
```

**Diagram sources**
- [owner.controller.ts:6-109](file://backend/src/controllers/owner.controller.ts#L6-L109)
- [owner.service.ts:12-144](file://backend/src/services/owner.service.ts#L12-L144)
- [user.repository.ts:10-16](file://backend/src/repositories/user.repository.ts#L10-L16)
- [location.repository.ts:17-21](file://backend/src/repositories/location.repository.ts#L17-L21)
- [booking.repository.ts:4-45](file://backend/src/repositories/booking.repository.ts#L4-L45)
- [prisma.ts:1-10](file://backend/src/config/prisma.ts#L1-L10)

**Section sources**
- [owner.service.ts:1-148](file://backend/src/services/owner.service.ts#L1-L148)
- [owner.controller.ts:1-110](file://backend/src/controllers/owner.controller.ts#L1-L110)
- [user.repository.ts:1-53](file://backend/src/repositories/user.repository.ts#L1-L53)
- [location.repository.ts:1-51](file://backend/src/repositories/location.repository.ts#L1-L51)
- [court.repository.ts:1-83](file://backend/src/repositories/court.repository.ts#L1-L83)
- [booking.repository.ts:1-49](file://backend/src/repositories/booking.repository.ts#L1-L49)
- [prisma.ts:1-10](file://backend/src/config/prisma.ts#L1-L10)

## Dependency Analysis
- Controllers depend on services.
- Services depend on repositories.
- Repositories depend on Prisma client.
- Services may depend on utilities (e.g., JWT) and may initiate transactions.
- Global error handling depends on ApiError.

```mermaid
graph LR
UC["user.controller.ts"] --> US["user.service.ts"]
AC["admin.controller.ts"] --> AS["admin.service.ts"]
FC["field.controller.ts"] --> FS["field.service.ts"]
OC["owner.controller.ts"] --> OS["owner.service.ts"]
US --> UR["user.repository.ts"]
AS --> UR
OS --> UR
OS --> LR["location.repository.ts"]
OS --> CR["court.repository.ts"]
OS --> BR["booking.repository.ts"]
UR --> PRISMA["prisma.ts"]
CR --> PRISMA
LR --> PRISMA
BR --> PRISMA
US -.uses.-> JWT["jwt.ts"]
OS -.uses.-> JWT
OC -.uses.-> AUTH["auth.middleware.ts"]
UC -.throws.-> ERR["ApiError.ts"]
AC -.throws.-> ERR
FC -.throws.-> ERR
OC -.throws.-> ERR
EH["errorHandler.ts"] -.global.-> UC
EH -.global.-> AC
EH -.global.-> FC
EH -.global.-> OC
```

**Diagram sources**
- [user.controller.ts:1-14](file://backend/src/controllers/user.controller.ts#L1-L14)
- [admin.controller.ts:1-13](file://backend/src/controllers/admin.controller.ts#L1-L13)
- [field.controller.ts:1-11](file://backend/src/controllers/field.controller.ts#L1-L11)
- [owner.controller.ts:1-110](file://backend/src/controllers/owner.controller.ts#L1-L110)
- [user.service.ts:1-69](file://backend/src/services/user.service.ts#L1-L69)
- [admin.service.ts:1-57](file://backend/src/services/admin.service.ts#L1-L57)
- [field.service.ts:1-42](file://backend/src/services/field.service.ts#L1-L42)
- [owner.service.ts:1-148](file://backend/src/services/owner.service.ts#L1-L148)
- [user.repository.ts:1-53](file://backend/src/repositories/user.repository.ts#L1-L53)
- [court.repository.ts:1-83](file://backend/src/repositories/court.repository.ts#L1-L83)
- [location.repository.ts:1-51](file://backend/src/repositories/location.repository.ts#L1-L51)
- [booking.repository.ts:1-49](file://backend/src/repositories/booking.repository.ts#L1-L49)
- [prisma.ts:1-10](file://backend/src/config/prisma.ts#L1-L10)
- [ApiError.ts:1-13](file://backend/src/utils/ApiError.ts#L1-L13)
- [errorHandler.ts:1-38](file://backend/src/middlewares/errorHandler.ts#L1-L38)
- [jwt.ts](file://backend/src/utils/jwt.ts)
- [auth.middleware.ts](file://backend/src/middlewares/auth.middleware.ts)

**Section sources**
- [user.controller.ts:1-14](file://backend/src/controllers/user.controller.ts#L1-L14)
- [admin.controller.ts:1-13](file://backend/src/controllers/admin.controller.ts#L1-L13)
- [field.controller.ts:1-11](file://backend/src/controllers/field.controller.ts#L1-L11)
- [owner.controller.ts:1-110](file://backend/src/controllers/owner.controller.ts#L1-L110)
- [user.service.ts:1-69](file://backend/src/services/user.service.ts#L1-L69)
- [admin.service.ts:1-57](file://backend/src/services/admin.service.ts#L1-L57)
- [field.service.ts:1-42](file://backend/src/services/field.service.ts#L1-L42)
- [owner.service.ts:1-148](file://backend/src/services/owner.service.ts#L1-L148)
- [user.repository.ts:1-53](file://backend/src/repositories/user.repository.ts#L1-L53)
- [court.repository.ts:1-83](file://backend/src/repositories/court.repository.ts#L1-L83)
- [location.repository.ts:1-51](file://backend/src/repositories/location.repository.ts#L1-L51)
- [booking.repository.ts:1-49](file://backend/src/repositories/booking.repository.ts#L1-L49)
- [prisma.ts:1-10](file://backend/src/config/prisma.ts#L1-L10)
- [ApiError.ts:1-13](file://backend/src/utils/ApiError.ts#L1-L13)
- [errorHandler.ts:1-38](file://backend/src/middlewares/errorHandler.ts#L1-L38)
- [jwt.ts](file://backend/src/utils/jwt.ts)
- [auth.middleware.ts](file://backend/src/middlewares/auth.middleware.ts)

## Performance Considerations
- Minimize N+1 queries: Use repository includes judiciously (as seen in field and booking repositories) to reduce round-trips.
- Batch operations: Image creation for courts uses batch insert to avoid multiple writes.
- ID generation: Repositories precompute next identifiers to avoid race conditions and reduce retries.
- Transactions: Group related writes to reduce partial states and improve consistency.
- Caching: Not implemented; consider caching aggregated metrics (e.g., average ratings) at the service level if needed.
- Logging: Centralized error logging in the global error handler; consider structured logs for production observability.

[No sources needed since this section provides general guidance]

## Troubleshooting Guide
Common issues and resolutions:
- Duplicate key errors: Normalized by the global error handler; inspect Prisma error code and meta target for duplicates.
- Authentication failures: Ensure correct credentials and that accounts have passwords set.
- Ownership violations: Owner endpoints validate ownership; ensure the authenticated user ID matches the resource owner.
- Missing required fields: Owner registration requires identity images; ensure uploads are present.

Error handling flow:
```mermaid
flowchart TD
E["Exception thrown"] --> IsApi{"Is ApiError?"}
IsApi --> |Yes| UseCode["Use provided status code"]
IsApi --> |No| IsPrisma{"Is Prisma Known Request Error?"}
IsPrisma --> |Yes| Normalize["Normalize Prisma error"]
IsPrisma --> |No| Default["Default to 500"]
UseCode --> Respond["Return JSON error response"]
Normalize --> Respond
Default --> Respond
```

**Diagram sources**
- [errorHandler.ts:5-37](file://backend/src/middlewares/errorHandler.ts#L5-L37)
- [ApiError.ts:1-13](file://backend/src/utils/ApiError.ts#L1-L13)

**Section sources**
- [errorHandler.ts:1-38](file://backend/src/middlewares/errorHandler.ts#L1-L38)
- [ApiError.ts:1-13](file://backend/src/utils/ApiError.ts#L1-L13)
- [owner.controller.ts:15-17](file://backend/src/controllers/owner.controller.ts#L15-L17)
- [owner.controller.ts:73-75](file://backend/src/controllers/owner.controller.ts#L73-L75)
- [owner.controller.ts:100-102](file://backend/src/controllers/owner.controller.ts#L100-L102)

## Conclusion
The service layer cleanly separates business logic from presentation and persistence. Services enforce business rules, coordinate repositories, and manage transactions where required. Controllers remain thin, delegating to services. A centralized error handling strategy and consistent validation ensure predictable behavior. Extending services should preserve these patterns: keep business logic in services, repositories for persistence, and controllers for orchestration.

[No sources needed since this section summarizes without analyzing specific files]

## Appendices

### Extending Services: Best Practices
- Keep business logic in services; avoid duplicating validations across controllers.
- Use repositories for all persistence; centralize ID generation and includes.
- Wrap cross-entity writes in transactions to maintain consistency.
- Throw ApiError for controlled failures; rely on the global error handler for responses.
- Add logging in services or middleware for operational visibility.

[No sources needed since this section provides general guidance]