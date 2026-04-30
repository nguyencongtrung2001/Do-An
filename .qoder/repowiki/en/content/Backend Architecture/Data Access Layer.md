# Data Access Layer

<cite>
**Referenced Files in This Document**
- [prisma.ts](file://backend/src/config/prisma.ts)
- [schema.prisma](file://backend/prisma/schema.prisma)
- [user.repository.ts](file://backend/src/repositories/user.repository.ts)
- [booking.repository.ts](file://backend/src/repositories/booking.repository.ts)
- [court.repository.ts](file://backend/src/repositories/court.repository.ts)
- [location.repository.ts](file://backend/src/repositories/location.repository.ts)
- [user.service.ts](file://backend/src/services/user.service.ts)
- [admin.service.ts](file://backend/src/services/admin.service.ts)
- [errorHandler.ts](file://backend/src/middlewares/errorHandler.ts)
- [ApiError.ts](file://backend/src/utils/ApiError.ts)
- [jwt.ts](file://backend/src/utils/jwt.ts)
- [user.controller.ts](file://backend/src/controllers/user.controller.ts)
- [admin.controller.ts](file://backend/src/controllers/admin.controller.ts)
- [user.routes.ts](file://backend/src/routers/user.routes.ts)
- [admin.routes.ts](file://backend/src/routers/admin.routes.ts)
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
This document explains the data access layer of the backend, focusing on the repository pattern and database interaction strategies implemented with Prisma ORM. It covers CRUD operations, query optimization, data mapping, the abstraction layer between services and Prisma, transaction handling and connection management, query building, pagination, filtering, error handling, retry mechanisms, and performance monitoring. It also provides examples for extending repositories and implementing complex queries.

## Project Structure
The data access layer is organized around:
- Prisma configuration and schema
- Repositories (one per domain entity)
- Services that orchestrate use cases and delegate persistence to repositories
- Controllers and routes that expose endpoints
- Middleware for global error handling and custom error types

```mermaid
graph TB
subgraph "Config"
PRISMA["prisma.ts"]
SCHEMA["schema.prisma"]
end
subgraph "Repositories"
URepo["user.repository.ts"]
BRepo["booking.repository.ts"]
CRepo["court.repository.ts"]
LRepo["location.repository.ts"]
end
subgraph "Services"
USvc["user.service.ts"]
ASvc["admin.service.ts"]
end
subgraph "Controllers & Routes"
UCtrl["user.controller.ts"]
ACtrl["admin.controller.ts"]
URoutes["user.routes.ts"]
ARoutes["admin.routes.ts"]
end
subgraph "Middleware & Utils"
Err["errorHandler.ts"]
AErr["ApiError.ts"]
JWT["jwt.ts"]
end
SCHEMA --> PRISMA
PRISMA --> URepo
PRISMA --> BRepo
PRISMA --> CRepo
PRISMA --> LRepo
USvc --> URepo
ASvc --> URepo
UCtrl --> USvc
ACtrl --> ASvc
URoutes --> UCtrl
ARoutes --> ACtrl
Err --> UCtrl
Err --> ACtrl
AErr --> Err
JWT --> USvc
```

**Diagram sources**
- [prisma.ts:1-10](file://backend/src/config/prisma.ts#L1-L10)
- [schema.prisma:1-126](file://backend/prisma/schema.prisma#L1-L126)
- [user.repository.ts:1-53](file://backend/src/repositories/user.repository.ts#L1-L53)
- [booking.repository.ts:1-49](file://backend/src/repositories/booking.repository.ts#L1-L49)
- [court.repository.ts:1-83](file://backend/src/repositories/court.repository.ts#L1-L83)
- [location.repository.ts:1-51](file://backend/src/repositories/location.repository.ts#L1-L51)
- [user.service.ts:1-69](file://backend/src/services/user.service.ts#L1-L69)
- [admin.service.ts:1-57](file://backend/src/services/admin.service.ts#L1-L57)
- [user.controller.ts:1-14](file://backend/src/controllers/user.controller.ts#L1-L14)
- [admin.controller.ts:1-13](file://backend/src/controllers/admin.controller.ts#L1-L13)
- [user.routes.ts:1-10](file://backend/src/routers/user.routes.ts#L1-L10)
- [admin.routes.ts:1-6](file://backend/src/routers/admin.routes.ts#L1-L6)
- [errorHandler.ts:1-38](file://backend/src/middlewares/errorHandler.ts#L1-L38)
- [ApiError.ts:1-13](file://backend/src/utils/ApiError.ts#L1-L13)
- [jwt.ts:1-13](file://backend/src/utils/jwt.ts#L1-L13)

**Section sources**
- [prisma.ts:1-10](file://backend/src/config/prisma.ts#L1-L10)
- [schema.prisma:1-126](file://backend/prisma/schema.prisma#L1-L126)
- [user.repository.ts:1-53](file://backend/src/repositories/user.repository.ts#L1-L53)
- [booking.repository.ts:1-49](file://backend/src/repositories/booking.repository.ts#L1-L49)
- [court.repository.ts:1-83](file://backend/src/repositories/court.repository.ts#L1-L83)
- [location.repository.ts:1-51](file://backend/src/repositories/location.repository.ts#L1-L51)
- [user.service.ts:1-69](file://backend/src/services/user.service.ts#L1-L69)
- [admin.service.ts:1-57](file://backend/src/services/admin.service.ts#L1-L57)
- [user.controller.ts:1-14](file://backend/src/controllers/user.controller.ts#L1-L14)
- [admin.controller.ts:1-13](file://backend/src/controllers/admin.controller.ts#L1-L13)
- [user.routes.ts:1-10](file://backend/src/routers/user.routes.ts#L1-L10)
- [admin.routes.ts:1-6](file://backend/src/routers/admin.routes.ts#L1-L6)
- [errorHandler.ts:1-38](file://backend/src/middlewares/errorHandler.ts#L1-L38)
- [ApiError.ts:1-13](file://backend/src/utils/ApiError.ts#L1-L13)
- [jwt.ts:1-13](file://backend/src/utils/jwt.ts#L1-L13)

## Core Components
- Prisma client configured with a PostgreSQL adapter and connection pooling
- Domain-specific repositories encapsulating CRUD and query logic
- Services orchestrating business logic and delegating persistence to repositories
- Controllers exposing endpoints and routes
- Global error handling middleware and custom error type
- JWT utilities for authentication tokens

Key responsibilities:
- Prisma configuration: connection pooling, adapter selection, client initialization
- Repositories: encapsulate model-specific queries, data mapping, and ID generation helpers
- Services: coordinate use cases, validation, hashing, and token generation
- Controllers and routes: HTTP entry points
- Error handling: translate domain and Prisma errors into consistent JSON responses
- JWT: sign and verify tokens for authenticated sessions

**Section sources**
- [prisma.ts:1-10](file://backend/src/config/prisma.ts#L1-L10)
- [schema.prisma:1-126](file://backend/prisma/schema.prisma#L1-L126)
- [user.repository.ts:1-53](file://backend/src/repositories/user.repository.ts#L1-L53)
- [booking.repository.ts:1-49](file://backend/src/repositories/booking.repository.ts#L1-L49)
- [court.repository.ts:1-83](file://backend/src/repositories/court.repository.ts#L1-L83)
- [location.repository.ts:1-51](file://backend/src/repositories/location.repository.ts#L1-L51)
- [user.service.ts:1-69](file://backend/src/services/user.service.ts#L1-L69)
- [admin.service.ts:1-57](file://backend/src/services/admin.service.ts#L1-L57)
- [user.controller.ts:1-14](file://backend/src/controllers/user.controller.ts#L1-L14)
- [admin.controller.ts:1-13](file://backend/src/controllers/admin.controller.ts#L1-L13)
- [user.routes.ts:1-10](file://backend/src/routers/user.routes.ts#L1-L10)
- [admin.routes.ts:1-6](file://backend/src/routers/admin.routes.ts#L1-L6)
- [errorHandler.ts:1-38](file://backend/src/middlewares/errorHandler.ts#L1-L38)
- [ApiError.ts:1-13](file://backend/src/utils/ApiError.ts#L1-L13)
- [jwt.ts:1-13](file://backend/src/utils/jwt.ts#L1-L13)

## Architecture Overview
The data access layer follows a layered architecture:
- Presentation: Express routes and controllers
- Application: Services implementing use cases
- Domain/Data: Repositories encapsulating Prisma operations
- Infrastructure: Prisma client with PostgreSQL adapter and connection pooling

```mermaid
sequenceDiagram
participant Client as "Client"
participant Router as "user.routes.ts"
participant Ctrl as "user.controller.ts"
participant Svc as "user.service.ts"
participant Repo as "user.repository.ts"
participant DB as "Prisma Client"
Client->>Router : "POST /register"
Router->>Ctrl : "postUserClient()"
Ctrl->>Svc : "createUser(userData)"
Svc->>Repo : "findByEmailOrPhone(email, phone)"
Repo->>DB : "nguoidung.findFirst(where)"
DB-->>Repo : "User | null"
Repo-->>Svc : "Existing user or null"
Svc->>Repo : "generateNextUserId()"
Svc->>Repo : "create({ id, ... })"
Repo->>DB : "nguoidung.create(data)"
DB-->>Repo : "User"
Repo-->>Svc : "User"
Svc->>Svc : "hash password, generate token"
Svc-->>Ctrl : "{ user, token }"
Ctrl-->>Client : "201 JSON"
```

**Diagram sources**
- [user.routes.ts:1-10](file://backend/src/routers/user.routes.ts#L1-L10)
- [user.controller.ts:1-14](file://backend/src/controllers/user.controller.ts#L1-L14)
- [user.service.ts:1-69](file://backend/src/services/user.service.ts#L1-L69)
- [user.repository.ts:1-53](file://backend/src/repositories/user.repository.ts#L1-L53)
- [prisma.ts:1-10](file://backend/src/config/prisma.ts#L1-L10)

**Section sources**
- [user.routes.ts:1-10](file://backend/src/routers/user.routes.ts#L1-L10)
- [user.controller.ts:1-14](file://backend/src/controllers/user.controller.ts#L1-L14)
- [user.service.ts:1-69](file://backend/src/services/user.service.ts#L1-L69)
- [user.repository.ts:1-53](file://backend/src/repositories/user.repository.ts#L1-L53)
- [prisma.ts:1-10](file://backend/src/config/prisma.ts#L1-L10)

## Detailed Component Analysis

### Prisma Configuration and Connection Management
- Uses the Prisma PostgreSQL adapter with a connection pool initialized from DATABASE_URL
- Creates a single PrismaClient instance injected into repositories
- Provides a clean separation between infrastructure concerns and domain logic

```mermaid
flowchart TD
Start(["Load Environment"]) --> Pool["Create PG Pool from DATABASE_URL"]
Pool --> Adapter["Create PrismaPg Adapter"]
Adapter --> Client["Instantiate PrismaClient(adapter)"]
Client --> Export["Export prisma client"]
```

**Diagram sources**
- [prisma.ts:1-10](file://backend/src/config/prisma.ts#L1-L10)

**Section sources**
- [prisma.ts:1-10](file://backend/src/config/prisma.ts#L1-L10)

### Schema Overview and Data Mapping
- Models represent domain entities with explicit primary keys, relations, and constraints
- Relations are defined with foreign keys and optional onDelete/onUpdate actions
- Data types align with Prisma’s PostgreSQL provider (e.g., Decimal, DateTime, Date)

```mermaid
erDiagram
NGUOIDUNG {
string ma_nguoi_dung PK
string ho_ten
string email UK
string so_dien_thoai UK
string mat_khau
string ma_google UK
string anh_dai_dien
string anh_cloudinary
string vai_tro
decimal so_vi_du
string anh_cccd_truoc
string anh_cccd_sau
boolean trang_thai
timestamp ngay_tao
}
DIADIEM {
string ma_dia_diem PK
string ma_nguoi_dung FK
string ten_dia_diem
string dia_chi
string mo_ta
decimal kinh_do
decimal vi_do
boolean trang_thai_duyet
timestamp ngay_tao
}
SAN {
string ma_san PK
string ma_dia_diem FK
string ten_san
string loai_the_thao
decimal gia_thue_30p
string trang_thai_san
timestamp ngay_tao
}
DATSAN {
string ma_dat_san PK
string ma_nguoi_dung FK
decimal tong_tien
string phuong_thuc_thanh_toan
timestamp ngay_tao
}
DATSANCHITIET {
string ma_dat_san_chi_tiet PK
string ma_dat_san FK
string ma_san FK
date ngay_dat
time gio_bat_dau
time gio_ket_thuc
decimal tien_coc
decimal tien_con_lai
string trang_thai_dat
}
GIAODICH {
string ma_giao_dich PK
string ma_dat_san FK
string ma_nguoi_dung FK
string duong_dan_thanh_toan
decimal so_tien_tt
string ma_tham_chieu
string ma_gd_vnpay UK
string ma_phan_hoi
string ma_ngan_hang
string thoi_gian_tt_vnpay
string trang_thai_giao_dich
string noi_dung_thanh_toan
timestamp ngay_tao
}
ANHSAN {
string ma_anh_san PK
string ma_san FK
string duong_dan_anh
string ma_cloudinary
timestamp ngay_tao
}
DANHGIA {
string ma_danh_gia PK
string ma_nguoi_dung FK
string ma_dat_san_chi_tiet FK
int so_sao
timestamp ngay_danh_gia
}
NGUOIDUNG ||--o{ DIADIEM : "owns"
DIADIEM ||--o{ SAN : "contains"
NGUOIDUNG ||--o{ DATSAN : "creates"
DATSAN ||--o{ DATSANCHITIET : "has details"
SAN ||--o{ DATSANCHITIET : "booked in"
NGUOIDUNG ||--o{ GIAODICH : "participates"
DATSAN ||--o{ GIAODICH : "generates"
SAN ||--o{ ANHSAN : "has images"
NGUOIDUNG ||--o{ DANHGIA : "writes"
DATSANCHITIET ||--o{ DANHGIA : "rated"
```

**Diagram sources**
- [schema.prisma:1-126](file://backend/prisma/schema.prisma#L1-L126)

**Section sources**
- [schema.prisma:1-126](file://backend/prisma/schema.prisma#L1-L126)

### Repository Pattern Implementation

#### User Repository
- CRUD operations: findById, findByEmailOrPhone, findAll, create
- Utility: generateNextUserId for deterministic ID generation
- Data mapping: returns Prisma model types directly

```mermaid
classDiagram
class UserRepository {
+findById(id) Promise<User>
+findByEmailOrPhone(email, phone) Promise<User|null>
+findAll() Promise<User[]>
+create(data) Promise<User>
+generateNextUserId() Promise<string>
}
class PrismaClient {
+nguoidung
}
UserRepository --> PrismaClient : "uses"
```

**Diagram sources**
- [user.repository.ts:1-53](file://backend/src/repositories/user.repository.ts#L1-L53)
- [prisma.ts:1-10](file://backend/src/config/prisma.ts#L1-L10)

**Section sources**
- [user.repository.ts:1-53](file://backend/src/repositories/user.repository.ts#L1-L53)

#### Booking Repository
- Query: findByOwnerId with nested include for related entities
- Query: findByIdAndOwnerId with owner verification
- Mutation: updateStatus for booking detail status

```mermaid
flowchart TD
A["findByOwnerId(userId)"] --> B["datsanchitiet.findMany()"]
B --> C["include: san, datsan.nguoidung"]
C --> D["orderBy: ngay_dat desc"]
E["findByIdAndOwnerId(id, userId)"] --> F["findFirst(where: id AND owner)"]
G["updateStatus(id, status)"] --> H["datsanchitiet.update()"]
```

**Diagram sources**
- [booking.repository.ts:1-49](file://backend/src/repositories/booking.repository.ts#L1-L49)

**Section sources**
- [booking.repository.ts:1-49](file://backend/src/repositories/booking.repository.ts#L1-L49)

#### Court Repository
- Query: findByLocationId
- Query: findByIdAndOwnerId with owner verification
- CRUD: findById, create, update
- Bulk: createCourtImages
- Query: findAllWithDetails with nested includes
- Utility: generateNextCourtId

```mermaid
flowchart TD
A["findByLocationId(locId)"] --> B["san.findMany(where: ma_dia_diem)"]
C["findByIdAndOwnerId(courtId, userId)"] --> D["findFirst(where: ma_san AND owner)"]
E["create(data)"] --> F["san.create(data)"]
G["update(courtId, data)"] --> H["san.update(where: ma_san)"]
I["createCourtImages(images)"] --> J["anhsan.createMany(data[])"]
K["findAllWithDetails()"] --> L["san.findMany(include: anhsan, diadiem, datsanchitiet.danhgia])"]
```

**Diagram sources**
- [court.repository.ts:1-83](file://backend/src/repositories/court.repository.ts#L1-L83)

**Section sources**
- [court.repository.ts:1-83](file://backend/src/repositories/court.repository.ts#L1-L83)

#### Location Repository
- Query: findByOwnerId with nested includes for courts and images
- Query: findFirstByOwnerId
- CRUD: create
- Utility: generateNextLocationId

```mermaid
flowchart TD
A["findByOwnerId(userId)"] --> B["diadiem.findMany(where: ma_nguoi_dung)"]
B --> C["include: san.anhsan"]
D["findFirstByOwnerId(userId)"] --> E["diadiem.findFirst(where: ma_nguoi_dung)"]
F["create(data)"] --> G["diadiem.create(data)"]
```

**Diagram sources**
- [location.repository.ts:1-51](file://backend/src/repositories/location.repository.ts#L1-L51)

**Section sources**
- [location.repository.ts:1-51](file://backend/src/repositories/location.repository.ts#L1-L51)

### Abstraction Between Services and Prisma ORM
- Services depend on repository interfaces, not on Prisma directly
- Repositories encapsulate Prisma client usage and expose domain-focused methods
- This design allows swapping adapters or changing ORM without affecting services

```mermaid
graph LR
Svc["Services"] --> Repo["Repositories"]
Repo --> Prisma["Prisma Client"]
```

**Diagram sources**
- [user.service.ts:1-69](file://backend/src/services/user.service.ts#L1-L69)
- [admin.service.ts:1-57](file://backend/src/services/admin.service.ts#L1-L57)
- [user.repository.ts:1-53](file://backend/src/repositories/user.repository.ts#L1-L53)
- [booking.repository.ts:1-49](file://backend/src/repositories/booking.repository.ts#L1-L49)
- [court.repository.ts:1-83](file://backend/src/repositories/court.repository.ts#L1-L83)
- [location.repository.ts:1-51](file://backend/src/repositories/location.repository.ts#L1-L51)
- [prisma.ts:1-10](file://backend/src/config/prisma.ts#L1-L10)

**Section sources**
- [user.service.ts:1-69](file://backend/src/services/user.service.ts#L1-L69)
- [admin.service.ts:1-57](file://backend/src/services/admin.service.ts#L1-L57)
- [user.repository.ts:1-53](file://backend/src/repositories/user.repository.ts#L1-L53)
- [booking.repository.ts:1-49](file://backend/src/repositories/booking.repository.ts#L1-L49)
- [court.repository.ts:1-83](file://backend/src/repositories/court.repository.ts#L1-L83)
- [location.repository.ts:1-51](file://backend/src/repositories/location.repository.ts#L1-L51)
- [prisma.ts:1-10](file://backend/src/config/prisma.ts#L1-L10)

### Transaction Handling and Connection Management
- Single PrismaClient instance is exported and reused across repositories
- Connection pooling is managed by the PostgreSQL adapter and underlying pool
- No explicit transaction boundaries are defined in the current repositories; use transactions when multiple writes must succeed or fail together

Recommendations:
- Wrap multi-step writes in a transaction using Prisma’s transaction API
- Keep transactions short-lived and avoid long-running operations inside them

**Section sources**
- [prisma.ts:1-10](file://backend/src/config/prisma.ts#L1-L10)

### Query Building, Pagination, and Filtering Strategies
Current repositories implement:
- Basic filtering via where conditions
- Includes for related entities
- Ordering via orderBy
- No explicit pagination (skip/take) or advanced filters

Recommended enhancements:
- Add pagination parameters (skip, take) to findMany methods
- Support dynamic filters (status, date range, location)
- Use select projections to limit returned fields for read-heavy endpoints

Examples to implement:
- Paginated listings: extend findMany with skip/take
- Advanced filters: add filter objects to repository methods
- Sorting: support multiple sort fields and directions

**Section sources**
- [booking.repository.ts:1-49](file://backend/src/repositories/booking.repository.ts#L1-L49)
- [court.repository.ts:1-83](file://backend/src/repositories/court.repository.ts#L1-L83)
- [location.repository.ts:1-51](file://backend/src/repositories/location.repository.ts#L1-L51)
- [user.repository.ts:1-53](file://backend/src/repositories/user.repository.ts#L1-L53)

### Data Mapping
- Repositories return Prisma model instances directly
- Services transform domain data (e.g., hashed passwords, tokens) before responding
- Consider mapping to DTOs for controllers to reduce exposure of internal models

**Section sources**
- [user.repository.ts:1-53](file://backend/src/repositories/user.repository.ts#L1-L53)
- [user.service.ts:1-69](file://backend/src/services/user.service.ts#L1-L69)

### Extending Repositories and Complex Queries
Examples of extending repositories:
- Add a method to fetch booking details with complex joins and filters
- Implement bulk operations (e.g., createMany for images)
- Add computed aggregations (e.g., average rating) via raw queries or include-based counts

Implementation tips:
- Keep repository methods focused on a single responsibility
- Use include to fetch related data efficiently
- Prefer composition over deeply nested queries

**Section sources**
- [booking.repository.ts:1-49](file://backend/src/repositories/booking.repository.ts#L1-L49)
- [court.repository.ts:1-83](file://backend/src/repositories/court.repository.ts#L1-L83)
- [location.repository.ts:1-51](file://backend/src/repositories/location.repository.ts#L1-L51)

## Dependency Analysis
Repositories depend on the Prisma client; services depend on repositories; controllers depend on services; routes depend on controllers; error handling middleware depends on controllers and services.

```mermaid
graph TB
PRISMA["prisma.ts"] --> URepo["user.repository.ts"]
PRISMA --> BRepo["booking.repository.ts"]
PRISMA --> CRepo["court.repository.ts"]
PRISMA --> LRepo["location.repository.ts"]
URepo --> USvc["user.service.ts"]
URepo --> ASvc["admin.service.ts"]
USvc --> UCtrl["user.controller.ts"]
ASvc --> ACtrl["admin.controller.ts"]
UCtrl --> URoutes["user.routes.ts"]
ACtrl --> ARoutes["admin.routes.ts"]
UCtrl --> Err["errorHandler.ts"]
ACtrl --> Err
Err --> AErr["ApiError.ts"]
```

**Diagram sources**
- [prisma.ts:1-10](file://backend/src/config/prisma.ts#L1-L10)
- [user.repository.ts:1-53](file://backend/src/repositories/user.repository.ts#L1-L53)
- [booking.repository.ts:1-49](file://backend/src/repositories/booking.repository.ts#L1-L49)
- [court.repository.ts:1-83](file://backend/src/repositories/court.repository.ts#L1-L83)
- [location.repository.ts:1-51](file://backend/src/repositories/location.repository.ts#L1-L51)
- [user.service.ts:1-69](file://backend/src/services/user.service.ts#L1-L69)
- [admin.service.ts:1-57](file://backend/src/services/admin.service.ts#L1-L57)
- [user.controller.ts:1-14](file://backend/src/controllers/user.controller.ts#L1-L14)
- [admin.controller.ts:1-13](file://backend/src/controllers/admin.controller.ts#L1-L13)
- [user.routes.ts:1-10](file://backend/src/routers/user.routes.ts#L1-L10)
- [admin.routes.ts:1-6](file://backend/src/routers/admin.routes.ts#L1-L6)
- [errorHandler.ts:1-38](file://backend/src/middlewares/errorHandler.ts#L1-L38)
- [ApiError.ts:1-13](file://backend/src/utils/ApiError.ts#L1-L13)

**Section sources**
- [prisma.ts:1-10](file://backend/src/config/prisma.ts#L1-L10)
- [user.repository.ts:1-53](file://backend/src/repositories/user.repository.ts#L1-L53)
- [booking.repository.ts:1-49](file://backend/src/repositories/booking.repository.ts#L1-L49)
- [court.repository.ts:1-83](file://backend/src/repositories/court.repository.ts#L1-L83)
- [location.repository.ts:1-51](file://backend/src/repositories/location.repository.ts#L1-L51)
- [user.service.ts:1-69](file://backend/src/services/user.service.ts#L1-L69)
- [admin.service.ts:1-57](file://backend/src/services/admin.service.ts#L1-L57)
- [user.controller.ts:1-14](file://backend/src/controllers/user.controller.ts#L1-L14)
- [admin.controller.ts:1-13](file://backend/src/controllers/admin.controller.ts#L1-L13)
- [user.routes.ts:1-10](file://backend/src/routers/user.routes.ts#L1-L10)
- [admin.routes.ts:1-6](file://backend/src/routers/admin.routes.ts#L1-L6)
- [errorHandler.ts:1-38](file://backend/src/middlewares/errorHandler.ts#L1-L38)
- [ApiError.ts:1-13](file://backend/src/utils/ApiError.ts#L1-L13)

## Performance Considerations
- Connection pooling: leverage the existing PostgreSQL adapter and pool
- Selectivity: use where conditions and includes judiciously; avoid N+1 queries
- Projections: use select to limit fields for read-heavy endpoints
- Pagination: implement skip/take to avoid large result sets
- Indexes: ensure frequently filtered columns (IDs, emails, phones) are indexed
- Transactions: wrap multi-step writes to minimize partial updates
- Caching: cache read-mostly data (e.g., static lists) with invalidation strategies

[No sources needed since this section provides general guidance]

## Troubleshooting Guide
Common issues and resolutions:
- Duplicate key errors: handled by the global error handler translating Prisma errors into user-friendly messages
- Validation errors: thrown as ApiError with appropriate status codes
- Authentication failures: password comparison errors raise ApiError
- Unexpected errors: logged and responded with generic error payload

```mermaid
sequenceDiagram
participant Client as "Client"
participant Ctrl as "user.controller.ts"
participant Svc as "user.service.ts"
participant Repo as "user.repository.ts"
participant Err as "errorHandler.ts"
participant AErr as "ApiError.ts"
Client->>Ctrl : "POST /login"
Ctrl->>Svc : "loginUser(credentials)"
Svc->>Repo : "findByEmailOrPhone(email, phone)"
Repo-->>Svc : "User | null"
Svc->>Svc : "compare password"
alt "not found or wrong password"
Svc-->>Ctrl : "throws ApiError"
end
Ctrl->>Err : "next(error)"
Err-->>Client : "{ status : 'error', statusCode, message }"
```

**Diagram sources**
- [user.controller.ts:1-14](file://backend/src/controllers/user.controller.ts#L1-L14)
- [user.service.ts:1-69](file://backend/src/services/user.service.ts#L1-L69)
- [user.repository.ts:1-53](file://backend/src/repositories/user.repository.ts#L1-L53)
- [errorHandler.ts:1-38](file://backend/src/middlewares/errorHandler.ts#L1-L38)
- [ApiError.ts:1-13](file://backend/src/utils/ApiError.ts#L1-L13)

**Section sources**
- [errorHandler.ts:1-38](file://backend/src/middlewares/errorHandler.ts#L1-L38)
- [ApiError.ts:1-13](file://backend/src/utils/ApiError.ts#L1-L13)
- [user.service.ts:1-69](file://backend/src/services/user.service.ts#L1-L69)
- [user.controller.ts:1-14](file://backend/src/controllers/user.controller.ts#L1-L14)

## Conclusion
The data access layer cleanly separates concerns using the repository pattern with Prisma ORM. Repositories encapsulate persistence logic, services orchestrate use cases, and middleware ensures consistent error handling. Current implementations focus on essential CRUD and relation fetching; future enhancements should emphasize pagination, advanced filtering, and transactional safety for complex workflows.

[No sources needed since this section summarizes without analyzing specific files]

## Appendices

### Example: Extending a Repository with Pagination
- Add parameters to findMany methods (skip, take)
- Apply orderBy consistently
- Return paginated results alongside total count

**Section sources**
- [court.repository.ts:1-83](file://backend/src/repositories/court.repository.ts#L1-L83)
- [location.repository.ts:1-51](file://backend/src/repositories/location.repository.ts#L1-L51)

### Example: Implementing a Complex Query with Includes
- Use nested include to fetch related entities
- Apply where conditions to filter by owner or status
- Order results by date or relevance

**Section sources**
- [booking.repository.ts:1-49](file://backend/src/repositories/booking.repository.ts#L1-L49)
- [court.repository.ts:1-83](file://backend/src/repositories/court.repository.ts#L1-L83)
- [location.repository.ts:1-51](file://backend/src/repositories/location.repository.ts#L1-L51)