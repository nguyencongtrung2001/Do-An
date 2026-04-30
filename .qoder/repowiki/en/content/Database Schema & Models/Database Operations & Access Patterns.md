# Database Operations & Access Patterns

<cite>
**Referenced Files in This Document**
- [schema.prisma](file://backend/prisma/schema.prisma)
- [prisma.ts](file://backend/src/config/prisma.ts)
- [user.repository.ts](file://backend/src/repositories/user.repository.ts)
- [location.repository.ts](file://backend/src/repositories/location.repository.ts)
- [court.repository.ts](file://backend/src/repositories/court.repository.ts)
- [booking.repository.ts](file://backend/src/repositories/booking.repository.ts)
- [admin.service.ts](file://backend/src/services/admin.service.ts)
- [field.service.ts](file://backend/src/services/field.service.ts)
- [owner.service.ts](file://backend/src/services/owner.service.ts)
- [user.service.ts](file://backend/src/services/user.service.ts)
- [errorHandler.ts](file://backend/src/middlewares/errorHandler.ts)
- [ApiError.ts](file://backend/src/utils/ApiError.ts)
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
This document explains database operations and access patterns in the sports facility booking platform. It covers the repository pattern, Prisma-based CRUD and complex queries, joins and aggregations, transaction handling, connection pooling, error handling, and practical query patterns for availability checks, user management, facility searches, and reporting. It also outlines migration and seeding strategies and maintenance operations.

## Project Structure
The backend uses Prisma with a PostgreSQL adapter and a dedicated connection pool. Repositories encapsulate data access, services orchestrate business logic, and controllers expose endpoints. Transactions are used for atomic operations across related entities.

```mermaid
graph TB
subgraph "Config"
PRISMA["prisma.ts<br/>Pool + Adapter + PrismaClient"]
end
subgraph "Repositories"
R_USER["user.repository.ts"]
R_LOC["location.repository.ts"]
R_COURT["court.repository.ts"]
R_BOOK["booking.repository.ts"]
end
subgraph "Services"
S_ADMIN["admin.service.ts"]
S_FIELD["field.service.ts"]
S_OWNER["owner.service.ts"]
S_USER["user.service.ts"]
end
subgraph "Models (Prisma)"
M_NGUOIDUNG["nguoidung"]
M_DIADIEM["diadiem"]
M_SAN["san"]
M_DATSAN["datsan"]
M_DATCHITIET["datsanchitiet"]
M_GIAODICH["giaodich"]
M_DANHGIA["danhgia"]
M_ANHSAN["anhsan"]
end
PRISMA --> R_USER
PRISMA --> R_LOC
PRISMA --> R_COURT
PRISMA --> R_BOOK
R_USER --> S_ADMIN
R_USER --> S_USER
R_USER --> S_OWNER
R_LOC --> S_OWNER
R_COURT --> S_OWNER
R_BOOK --> S_OWNER
R_COURT --> S_FIELD
S_ADMIN --> M_NGUOIDUNG
S_USER --> M_NGUOIDUNG
S_OWNER --> M_NGUOIDUNG
S_OWNER --> M_DIADIEM
S_OWNER --> M_SAN
S_OWNER --> M_DATSAN
S_OWNER --> M_DATCHITIET
S_OWNER --> M_GIAODICH
S_OWNER --> M_DANHGIA
S_OWNER --> M_ANHSAN
S_FIELD --> M_SAN
S_FIELD --> M_DATCHITIET
S_FIELD --> M_DANHGIA
```

**Diagram sources**
- [prisma.ts:1-10](file://backend/src/config/prisma.ts#L1-L10)
- [user.repository.ts:1-53](file://backend/src/repositories/user.repository.ts#L1-L53)
- [location.repository.ts:1-51](file://backend/src/repositories/location.repository.ts#L1-L51)
- [court.repository.ts:1-83](file://backend/src/repositories/court.repository.ts#L1-L83)
- [booking.repository.ts:1-49](file://backend/src/repositories/booking.repository.ts#L1-L49)
- [admin.service.ts:1-57](file://backend/src/services/admin.service.ts#L1-L57)
- [field.service.ts:1-42](file://backend/src/services/field.service.ts#L1-L42)
- [owner.service.ts:1-148](file://backend/src/services/owner.service.ts#L1-L148)
- [user.service.ts:1-69](file://backend/src/services/user.service.ts#L1-L69)
- [schema.prisma:1-126](file://backend/prisma/schema.prisma#L1-L126)

**Section sources**
- [prisma.ts:1-10](file://backend/src/config/prisma.ts#L1-L10)
- [schema.prisma:1-126](file://backend/prisma/schema.prisma#L1-L126)

## Core Components
- Prisma configuration with PostgreSQL adapter and connection pool
- Repository classes per domain entity with CRUD and specialized queries
- Service classes orchestrating transactions and business logic
- Centralized error handling for API and Prisma-specific errors

Key responsibilities:
- Connection pooling and adapter wiring: [prisma.ts:1-10](file://backend/src/config/prisma.ts#L1-L10)
- User management: [user.repository.ts:1-53](file://backend/src/repositories/user.repository.ts#L1-L53), [user.service.ts:1-69](file://backend/src/services/user.service.ts#L1-L69)
- Facility and location management: [location.repository.ts:1-51](file://backend/src/repositories/location.repository.ts#L1-L51), [court.repository.ts:1-83](file://backend/src/repositories/court.repository.ts#L1-L83), [field.service.ts:1-42](file://backend/src/services/field.service.ts#L1-L42)
- Owner operations and transactions: [owner.service.ts:1-148](file://backend/src/services/owner.service.ts#L1-L148)
- Admin operations: [admin.service.ts:1-57](file://backend/src/services/admin.service.ts#L1-L57)
- Error handling: [errorHandler.ts:1-38](file://backend/src/middlewares/errorHandler.ts#L1-L38), [ApiError.ts:1-13](file://backend/src/utils/ApiError.ts#L1-L13)

**Section sources**
- [prisma.ts:1-10](file://backend/src/config/prisma.ts#L1-L10)
- [user.repository.ts:1-53](file://backend/src/repositories/user.repository.ts#L1-L53)
- [location.repository.ts:1-51](file://backend/src/repositories/location.repository.ts#L1-L51)
- [court.repository.ts:1-83](file://backend/src/repositories/court.repository.ts#L1-L83)
- [booking.repository.ts:1-49](file://backend/src/repositories/booking.repository.ts#L1-L49)
- [admin.service.ts:1-57](file://backend/src/services/admin.service.ts#L1-L57)
- [field.service.ts:1-42](file://backend/src/services/field.service.ts#L1-L42)
- [owner.service.ts:1-148](file://backend/src/services/owner.service.ts#L1-L148)
- [user.service.ts:1-69](file://backend/src/services/user.service.ts#L1-L69)
- [errorHandler.ts:1-38](file://backend/src/middlewares/errorHandler.ts#L1-L38)
- [ApiError.ts:1-13](file://backend/src/utils/ApiError.ts#L1-L13)

## Architecture Overview
The system follows a layered architecture:
- Controllers delegate to Services
- Services use Repositories for data access
- Repositories use Prisma Client configured with a PostgreSQL adapter and connection pool
- Transactions are used for multi-entity writes

```mermaid
sequenceDiagram
participant C as "Controller"
participant S as "Service"
participant R as "Repository"
participant P as "Prisma Client"
participant DB as "PostgreSQL"
C->>S : "Call operation"
S->>R : "Invoke repository method"
R->>P : "Execute Prisma query"
P->>DB : "SQL via adapter"
DB-->>P : "Result"
P-->>R : "Result"
R-->>S : "Result"
S-->>C : "Response"
```

**Diagram sources**
- [prisma.ts:1-10](file://backend/src/config/prisma.ts#L1-L10)
- [user.repository.ts:1-53](file://backend/src/repositories/user.repository.ts#L1-L53)
- [owner.service.ts:1-148](file://backend/src/services/owner.service.ts#L1-L148)

## Detailed Component Analysis

### Prisma Configuration and Connection Pooling
- Uses a PostgreSQL adapter with a Node pg Pool for connection pooling
- Environment variable DATABASE_URL supplies credentials and connection string
- Prisma Client is instantiated with the adapter

```mermaid
flowchart TD
Start(["App start"]) --> LoadEnv["Load DATABASE_URL"]
LoadEnv --> CreatePool["Create pg Pool"]
CreatePool --> CreateAdapter["Create PrismaPg Adapter"]
CreateAdapter --> NewClient["Instantiate PrismaClient(adapter)"]
NewClient --> Ready(["Ready for queries"])
```

**Diagram sources**
- [prisma.ts:1-10](file://backend/src/config/prisma.ts#L1-L10)

**Section sources**
- [prisma.ts:1-10](file://backend/src/config/prisma.ts#L1-L10)

### Repository Pattern Implementation
Repositories encapsulate all Prisma operations per domain:
- User repository: find by ID/email/phone, create, generate next user ID
- Location repository: find by owner, create, generate next location ID
- Court repository: find by location, CRUD, create images, fetch with details, generate next court ID
- Booking repository: fetch owner’s bookings, update status

```mermaid
classDiagram
class UserRepository {
+findById(id)
+findByEmailOrPhone(email, phone)
+findAll()
+create(data)
+generateNextUserId()
}
class LocationRepository {
+findByOwnerId(ownerId)
+findFirstByOwnerId(ownerId)
+create(data)
+generateNextLocationId()
}
class CourtRepository {
+findByLocationId(locationId)
+findByIdAndOwnerId(courtId, ownerId)
+findById(courtId)
+create(data)
+update(courtId, data)
+createCourtImages(images)
+findAllWithDetails()
+generateNextCourtId()
}
class BookingRepository {
+findByOwnerId(ownerId)
+findByIdAndOwnerId(bookingDetailId, ownerId)
+updateStatus(bookingDetailId, status)
}
```

**Diagram sources**
- [user.repository.ts:1-53](file://backend/src/repositories/user.repository.ts#L1-L53)
- [location.repository.ts:1-51](file://backend/src/repositories/location.repository.ts#L1-L51)
- [court.repository.ts:1-83](file://backend/src/repositories/court.repository.ts#L1-L83)
- [booking.repository.ts:1-49](file://backend/src/repositories/booking.repository.ts#L1-L49)

**Section sources**
- [user.repository.ts:1-53](file://backend/src/repositories/user.repository.ts#L1-L53)
- [location.repository.ts:1-51](file://backend/src/repositories/location.repository.ts#L1-L51)
- [court.repository.ts:1-83](file://backend/src/repositories/court.repository.ts#L1-L83)
- [booking.repository.ts:1-49](file://backend/src/repositories/booking.repository.ts#L1-L49)

### Transactions and Multi-Entity Writes
Owner registration and adding courts use Prisma transactions to ensure atomicity across related entities:
- Owner registration: creates a user and a location in a single transaction
- Adding a court: creates the court and associated images in a single transaction

```mermaid
sequenceDiagram
participant S as "OwnerService"
participant TX as "Prisma $transaction"
participant U as "nguoidung"
participant D as "diadiem"
participant SAN as "san"
participant IMG as "anhsan"
S->>TX : "Begin transaction"
TX->>U : "Create user"
TX->>D : "Create location (user id)"
TX-->>S : "Commit"
S-->>S : "Generate token"
S-->>Client : "{user, location, token}"
S->>TX : "Begin transaction"
TX->>SAN : "Create court (location id)"
TX->>IMG : "Create images (court id)"
TX-->>S : "Commit"
S-->>Client : "Court with images"
```

**Diagram sources**
- [owner.service.ts:32-59](file://backend/src/services/owner.service.ts#L32-L59)
- [owner.service.ts:86-110](file://backend/src/services/owner.service.ts#L86-L110)

**Section sources**
- [owner.service.ts:32-59](file://backend/src/services/owner.service.ts#L32-L59)
- [owner.service.ts:86-110](file://backend/src/services/owner.service.ts#L86-L110)

### Complex Queries, Joins, and Aggregations
- Owner booking listing with nested includes for facility and customer:
  - Query path: [booking.repository.ts:4-24](file://backend/src/repositories/booking.repository.ts#L4-L24)
- Facility listing with computed average rating and representative image:
  - Aggregation logic: [field.service.ts:7-38](file://backend/src/services/field.service.ts#L7-L38)
- Location retrieval with facility images included:
  - Query path: [location.repository.ts:4-14](file://backend/src/repositories/location.repository.ts#L4-L14)
- Facility retrieval with images, location, and reviews:
  - Query path: [court.repository.ts:52-63](file://backend/src/repositories/court.repository.ts#L52-L63)

These demonstrate Prisma’s relation include patterns and manual aggregation over loaded relations.

**Section sources**
- [booking.repository.ts:4-24](file://backend/src/repositories/booking.repository.ts#L4-L24)
- [field.service.ts:7-38](file://backend/src/services/field.service.ts#L7-L38)
- [location.repository.ts:4-14](file://backend/src/repositories/location.repository.ts#L4-L14)
- [court.repository.ts:52-63](file://backend/src/repositories/court.repository.ts#L52-L63)

### CRUD Operations
- Users: create, find by ID/email/phone, list, generate next ID
  - Paths: [user.repository.ts:4-34](file://backend/src/repositories/user.repository.ts#L4-L34), [user.service.ts:8-42](file://backend/src/services/user.service.ts#L8-L42)
- Locations: create, find by owner, generate next ID
  - Paths: [location.repository.ts:4-32](file://backend/src/repositories/location.repository.ts#L4-L32)
- Courts: create, update, delete not shown; includes images and details
  - Paths: [court.repository.ts:25-46](file://backend/src/repositories/court.repository.ts#L25-L46), [court.repository.ts:48-63](file://backend/src/repositories/court.repository.ts#L48-L63)
- Bookings: update status and filter by owner
  - Paths: [booking.repository.ts:40-45](file://backend/src/repositories/booking.repository.ts#L40-L45)

**Section sources**
- [user.repository.ts:4-34](file://backend/src/repositories/user.repository.ts#L4-L34)
- [user.service.ts:8-42](file://backend/src/services/user.service.ts#L8-L42)
- [location.repository.ts:4-32](file://backend/src/repositories/location.repository.ts#L4-L32)
- [court.repository.ts:25-46](file://backend/src/repositories/court.repository.ts#L25-L46)
- [court.repository.ts:48-63](file://backend/src/repositories/court.repository.ts#L48-L63)
- [booking.repository.ts:40-45](file://backend/src/repositories/booking.repository.ts#L40-L45)

### Availability Checks and Reporting Patterns
- Availability checks: Use join filters on facility schedules and existing bookings to detect conflicts
  - Example pattern: filter datsanchitiet by facility ID, date, and overlapping time windows
  - Reference model relations: [schema.prisma:43-56](file://backend/prisma/schema.prisma#L43-L56)
- Reporting: Compute average ratings per facility by iterating reviews in memory after fetching
  - Reference aggregation: [field.service.ts:7-38](file://backend/src/services/field.service.ts#L7-L38)

Note: Specific SQL-like availability logic is not present in the current code; implement it using Prisma’s where conditions on related entities.

**Section sources**
- [field.service.ts:7-38](file://backend/src/services/field.service.ts#L7-L38)
- [schema.prisma:43-56](file://backend/prisma/schema.prisma#L43-L56)

### Error Handling and Transaction Safety
- Centralized error handler converts Prisma known request errors (e.g., unique constraint violations) to user-friendly messages
- ApiError is used for explicit business errors with status codes
- Transactions ensure rollback on failures; services catch and propagate errors appropriately

```mermaid
flowchart TD
A["Repository/Service throws error"] --> B{"Is ApiError?"}
B --> |Yes| C["Use provided status/message"]
B --> |No| D{"Is Prisma Known Error?"}
D --> |Yes| E["Map to 400 with meta info"]
D --> |No| F["Default 500"]
C --> G["Return JSON response"]
E --> G
F --> G
```

**Diagram sources**
- [errorHandler.ts:14-30](file://backend/src/middlewares/errorHandler.ts#L14-L30)
- [ApiError.ts:1-13](file://backend/src/utils/ApiError.ts#L1-L13)

**Section sources**
- [errorHandler.ts:1-38](file://backend/src/middlewares/errorHandler.ts#L1-L38)
- [ApiError.ts:1-13](file://backend/src/utils/ApiError.ts#L1-L13)

## Dependency Analysis
Repositories depend on Prisma Client; services depend on repositories and coordinate transactions; controllers depend on services. The Prisma adapter depends on the pg Pool.

```mermaid
graph LR
PG["pg.Pool"] --> AD["PrismaPg Adapter"]
AD --> PC["PrismaClient"]
PC --> RU["UserRepository"]
PC --> RL["LocationRepository"]
PC --> RC["CourtRepository"]
PC --> RB["BookingRepository"]
RU --> SU["UserService"]
RU --> SO["OwnerService"]
RL --> SO
RC --> SO
RB --> SO
SU --> CTRL_U["UserController"]
SO --> CTRL_O["OwnerController"]
```

**Diagram sources**
- [prisma.ts:1-10](file://backend/src/config/prisma.ts#L1-L10)
- [user.repository.ts:1-53](file://backend/src/repositories/user.repository.ts#L1-L53)
- [location.repository.ts:1-51](file://backend/src/repositories/location.repository.ts#L1-L51)
- [court.repository.ts:1-83](file://backend/src/repositories/court.repository.ts#L1-L83)
- [booking.repository.ts:1-49](file://backend/src/repositories/booking.repository.ts#L1-L49)
- [user.service.ts:1-69](file://backend/src/services/user.service.ts#L1-L69)
- [owner.service.ts:1-148](file://backend/src/services/owner.service.ts#L1-L148)

**Section sources**
- [prisma.ts:1-10](file://backend/src/config/prisma.ts#L1-L10)
- [user.repository.ts:1-53](file://backend/src/repositories/user.repository.ts#L1-L53)
- [location.repository.ts:1-51](file://backend/src/repositories/location.repository.ts#L1-L51)
- [court.repository.ts:1-83](file://backend/src/repositories/court.repository.ts#L1-L83)
- [booking.repository.ts:1-49](file://backend/src/repositories/booking.repository.ts#L1-L49)
- [user.service.ts:1-69](file://backend/src/services/user.service.ts#L1-L69)
- [owner.service.ts:1-148](file://backend/src/services/owner.service.ts#L1-L148)

## Performance Considerations
- Connection pooling: Ensure pool size matches workload; monitor connection usage and timeouts
- Query optimization:
  - Use selective where clauses and pagination for large lists
  - Prefer includes only when necessary; avoid N+1 by batching queries
  - Denormalize frequently accessed aggregates (e.g., average ratings) at write time if needed
- Indexes: Add database indexes for commonly filtered columns (IDs, emails, phone numbers)
- Transactions: Keep transaction scope small; avoid long-running transactions
- Caching: Cache static or slowly changing data (e.g., facility metadata) with invalidation on updates

[No sources needed since this section provides general guidance]

## Troubleshooting Guide
Common issues and resolutions:
- Duplicate key errors (unique constraint): handled by centralized error handler and surfaced with user-friendly messages
  - Reference: [errorHandler.ts:17-26](file://backend/src/middlewares/errorHandler.ts#L17-L26)
- Business validation errors: throw ApiError with appropriate status codes
  - Reference: [ApiError.ts:1-13](file://backend/src/utils/ApiError.ts#L1-L13), [owner.service.ts:18-21](file://backend/src/services/owner.service.ts#L18-L21)
- Transaction failures: ensure all related writes are wrapped in a single transaction; rollback occurs automatically on exceptions
  - Reference: [owner.service.ts:32-59](file://backend/src/services/owner.service.ts#L32-L59), [owner.service.ts:86-110](file://backend/src/services/owner.service.ts#L86-L110)

**Section sources**
- [errorHandler.ts:1-38](file://backend/src/middlewares/errorHandler.ts#L1-L38)
- [ApiError.ts:1-13](file://backend/src/utils/ApiError.ts#L1-L13)
- [owner.service.ts:32-59](file://backend/src/services/owner.service.ts#L32-L59)
- [owner.service.ts:86-110](file://backend/src/services/owner.service.ts#L86-L110)

## Conclusion
The platform uses a clean repository-service-controller architecture with Prisma for data access. Transactions ensure data consistency for multi-entity writes, while repositories encapsulate CRUD and complex queries. The centralized error handler improves resilience and user feedback. For optimal performance, apply connection pooling best practices, query optimization, and indexing strategies.

[No sources needed since this section summarizes without analyzing specific files]

## Appendices

### Database Schema Overview
The schema defines core entities and relations for users, facilities, bookings, payments, and media.

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
DATCHITIET {
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
DANHGIA {
string ma_danh_gia PK
string ma_nguoi_dung FK
string ma_dat_san_chi_tiet FK
int so_sao
timestamp ngay_danh_gia
}
ANHSAN {
string ma_anh_san PK
string ma_san FK
string duong_dan_anh
string ma_cloudinary
timestamp ngay_tao
}
NGUOIDUNG ||--o{ DATSAN : "creates"
NGUOIDUNG ||--o{ DIADIEM : "owns"
NGUOIDUNG ||--o{ GIAODICH : "initiates"
NGUOIDUNG ||--o{ DANHGIA : "writes"
DIADIEM ||--o{ SAN : "contains"
SAN ||--o{ DATCHITIET : "booked_in"
SAN ||--o{ ANHSAN : "has_images"
DATSAN ||--o{ DATCHITIET : "splits_into"
DATSAN ||--o{ GIAODICH : "generates_payments"
DATCHITIET ||--o{ DANHGIA : "rated_by"
```

**Diagram sources**
- [schema.prisma:10-126](file://backend/prisma/schema.prisma#L10-L126)

### Migration and Seeding Procedures
- Migrations: Use Prisma CLI to generate and apply migrations against the PostgreSQL database
  - Reference: [schema.prisma:1-4](file://backend/prisma/schema.prisma#L1-L4)
- Seeding: Seed initial data (e.g., roles, default users) using Prisma Studio or a seed script executed after migrations
- Maintenance: Monitor slow queries, add missing indexes, and periodically vacuum/analyze the database

[No sources needed since this section provides general guidance]