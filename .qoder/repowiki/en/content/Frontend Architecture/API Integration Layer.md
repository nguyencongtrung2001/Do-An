# API Integration Layer

<cite>
**Referenced Files in This Document**
- [api.ts](file://frontend/src/services/api.ts)
- [auth.service.ts](file://frontend/src/services/auth.service.ts)
- [booking.service.ts](file://frontend/src/services/booking.service.ts)
- [court.service.ts](file://frontend/src/services/court.service.ts)
- [AuthContext.tsx](file://frontend/src/contexts/AuthContext.tsx)
- [AuthClient.tsx](file://frontend/src/components/auth/AuthClient.tsx)
- [useFields.ts](file://frontend/src/hooks/useFields.ts)
- [useOwnerBookings.ts](file://frontend/src/hooks/useOwnerBookings.ts)
- [useOwnerCourts.ts](file://frontend/src/hooks/useOwnerCourts.ts)
- [api.types.ts](file://frontend/src/types/api.types.ts)
- [auth.types.ts](file://frontend/src/types/auth.types.ts)
- [booking.types.ts](file://frontend/src/types/booking.types.ts)
- [court.types.ts](file://frontend/src/types/court.types.ts)
- [app.ts](file://backend/src/app.ts)
- [server.ts](file://backend/src/server.ts)
- [errorHandler.ts](file://backend/src/middlewares/errorHandler.ts)
- [ApiError.ts](file://backend/src/utils/ApiError.ts)
- [jwt.ts](file://backend/src/utils/jwt.ts)
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
This document describes the API integration layer and service abstractions for the frontend, focusing on HTTP client configuration, request/response handling, error management, and service-layer implementations for authentication, booking management, and facility services. It also covers authentication token management, request interceptors, response parsing, error boundaries, retry strategies, offline handling, API versioning, rate limiting, performance optimization, service composition, dependency injection, and testing strategies for API integrations.

## Project Structure
The frontend API integration layer is organized around:
- A centralized HTTP client module exporting typed helpers for GET, POST, PUT, PATCH requests.
- Service modules that encapsulate domain-specific API calls and transform payloads/responses.
- Type-safe request/response interfaces for consistent data contracts.
- React hooks that orchestrate service calls and manage UI state.
- An authentication context managing tokens and user state persisted in local storage.
- Backend Express application wiring routes, middleware, and global error handling.

```mermaid
graph TB
subgraph "Frontend"
AC["AuthClient.tsx"]
UC["useFields.ts"]
UOB["useOwnerBookings.ts"]
UOC["useOwnerCourts.ts"]
CTX["AuthContext.tsx"]
API["api.ts"]
AS["auth.service.ts"]
BS["booking.service.ts"]
CS["court.service.ts"]
AT["auth.types.ts"]
BT["booking.types.ts"]
CT["court.types.ts"]
GT["api.types.ts"]
end
subgraph "Backend"
APP["app.ts"]
SRV["server.ts"]
EH["errorHandler.ts"]
AE["ApiError.ts"]
JWT["jwt.ts"]
end
AC --> AS
UC --> CS
UOB --> BS
UOC --> CS
AS --> API
BS --> API
CS --> API
API --> APP
APP --> EH
APP --> JWT
CTX --> AC
CTX --> UOB
CTX --> UOC
```

**Diagram sources**
- [AuthClient.tsx:1-566](file://frontend/src/components/auth/AuthClient.tsx#L1-L566)
- [useFields.ts:1-78](file://frontend/src/hooks/useFields.ts#L1-L78)
- [useOwnerBookings.ts:1-67](file://frontend/src/hooks/useOwnerBookings.ts#L1-L67)
- [useOwnerCourts.ts:1-95](file://frontend/src/hooks/useOwnerCourts.ts#L1-L95)
- [AuthContext.tsx:1-83](file://frontend/src/contexts/AuthContext.tsx#L1-L83)
- [api.ts:1-78](file://frontend/src/services/api.ts#L1-L78)
- [auth.service.ts:1-36](file://frontend/src/services/auth.service.ts#L1-L36)
- [booking.service.ts:1-13](file://frontend/src/services/booking.service.ts#L1-L13)
- [court.service.ts:1-26](file://frontend/src/services/court.service.ts#L1-L26)
- [auth.types.ts:1-40](file://frontend/src/types/auth.types.ts#L1-L40)
- [booking.types.ts:1-37](file://frontend/src/types/booking.types.ts#L1-L37)
- [court.types.ts:1-82](file://frontend/src/types/court.types.ts#L1-L82)
- [api.types.ts:1-6](file://frontend/src/types/api.types.ts#L1-L6)
- [app.ts:1-21](file://backend/src/app.ts#L1-L21)
- [server.ts:1-20](file://backend/src/server.ts#L1-L20)
- [errorHandler.ts:1-38](file://backend/src/middlewares/errorHandler.ts#L1-L38)
- [ApiError.ts:1-13](file://backend/src/utils/ApiError.ts#L1-L13)
- [jwt.ts:1-13](file://backend/src/utils/jwt.ts#L1-L13)

**Section sources**
- [api.ts:1-78](file://frontend/src/services/api.ts#L1-L78)
- [auth.service.ts:1-36](file://frontend/src/services/auth.service.ts#L1-L36)
- [booking.service.ts:1-13](file://frontend/src/services/booking.service.ts#L1-L13)
- [court.service.ts:1-26](file://frontend/src/services/court.service.ts#L1-L26)
- [AuthContext.tsx:1-83](file://frontend/src/contexts/AuthContext.tsx#L1-L83)
- [AuthClient.tsx:1-566](file://frontend/src/components/auth/AuthClient.tsx#L1-L566)
- [useFields.ts:1-78](file://frontend/src/hooks/useFields.ts#L1-L78)
- [useOwnerBookings.ts:1-67](file://frontend/src/hooks/useOwnerBookings.ts#L1-L67)
- [useOwnerCourts.ts:1-95](file://frontend/src/hooks/useOwnerCourts.ts#L1-L95)
- [api.types.ts:1-6](file://frontend/src/types/api.types.ts#L1-L6)
- [auth.types.ts:1-40](file://frontend/src/types/auth.types.ts#L1-L40)
- [booking.types.ts:1-37](file://frontend/src/types/booking.types.ts#L1-L37)
- [court.types.ts:1-82](file://frontend/src/types/court.types.ts#L1-L82)
- [app.ts:1-21](file://backend/src/app.ts#L1-L21)
- [server.ts:1-20](file://backend/src/server.ts#L1-L20)
- [errorHandler.ts:1-38](file://backend/src/middlewares/errorHandler.ts#L1-L38)
- [ApiError.ts:1-13](file://backend/src/utils/ApiError.ts#L1-L13)
- [jwt.ts:1-13](file://backend/src/utils/jwt.ts#L1-L13)

## Core Components
- Centralized HTTP client:
  - Base URL resolution from environment.
  - Typed helpers for GET, POST, PUT, PATCH with optional JSON content-type and Authorization header injection.
  - Unified response parsing and error propagation.
- Service layer:
  - Authentication service: login, user registration, owner registration (multipart/form-data).
  - Booking service: fetch owner bookings and update booking status.
  - Facility service: fetch public fields, owner courts, add/update courts, update court status.
- Type system:
  - Generic API response wrapper and domain-specific request/response interfaces.
- React integration:
  - Hooks orchestrating service calls and state updates.
  - Authentication context persisting token and user data in local storage.

Key implementation references:
- HTTP client and response handling: [api.ts:1-78](file://frontend/src/services/api.ts#L1-L78)
- Authentication service: [auth.service.ts:1-36](file://frontend/src/services/auth.service.ts#L1-L36)
- Booking service: [booking.service.ts:1-13](file://frontend/src/services/booking.service.ts#L1-L13)
- Facility service: [court.service.ts:1-26](file://frontend/src/services/court.service.ts#L1-L26)
- Types: [api.types.ts:1-6](file://frontend/src/types/api.types.ts#L1-L6), [auth.types.ts:1-40](file://frontend/src/types/auth.types.ts#L1-L40), [booking.types.ts:1-37](file://frontend/src/types/booking.types.ts#L1-L37), [court.types.ts:1-82](file://frontend/src/types/court.types.ts#L1-L82)
- Hooks: [useFields.ts:1-78](file://frontend/src/hooks/useFields.ts#L1-L78), [useOwnerBookings.ts:1-67](file://frontend/src/hooks/useOwnerBookings.ts#L1-L67), [useOwnerCourts.ts:1-95](file://frontend/src/hooks/useOwnerCourts.ts#L1-L95)
- Auth context: [AuthContext.tsx:1-83](file://frontend/src/contexts/AuthContext.tsx#L1-L83)

**Section sources**
- [api.ts:1-78](file://frontend/src/services/api.ts#L1-L78)
- [auth.service.ts:1-36](file://frontend/src/services/auth.service.ts#L1-L36)
- [booking.service.ts:1-13](file://frontend/src/services/booking.service.ts#L1-L13)
- [court.service.ts:1-26](file://frontend/src/services/court.service.ts#L1-L26)
- [api.types.ts:1-6](file://frontend/src/types/api.types.ts#L1-L6)
- [auth.types.ts:1-40](file://frontend/src/types/auth.types.ts#L1-L40)
- [booking.types.ts:1-37](file://frontend/src/types/booking.types.ts#L1-L37)
- [court.types.ts:1-82](file://frontend/src/types/court.types.ts#L1-L82)
- [useFields.ts:1-78](file://frontend/src/hooks/useFields.ts#L1-L78)
- [useOwnerBookings.ts:1-67](file://frontend/src/hooks/useOwnerBookings.ts#L1-L67)
- [useOwnerCourts.ts:1-95](file://frontend/src/hooks/useOwnerCourts.ts#L1-L95)
- [AuthContext.tsx:1-83](file://frontend/src/contexts/AuthContext.tsx#L1-L83)

## Architecture Overview
The frontend integrates with the backend via a typed HTTP client. Services encapsulate route-specific logic and payload transformations. Hooks coordinate service calls and state updates. The backend exposes routes under /user, /admin, /field, and /owner, with a global error handler and JWT utilities.

```mermaid
sequenceDiagram
participant UI as "AuthClient.tsx"
participant Ctx as "AuthContext.tsx"
participant Svc as "auth.service.ts"
participant Http as "api.ts"
participant BE as "Express app.ts"
UI->>Svc : "loginUser(credentials)"
Svc->>Http : "POST /user/login (JSON body)"
Http->>BE : "HTTP request"
BE-->>Http : "JSON response"
Http-->>Svc : "Parsed data"
Svc-->>UI : "AuthResponse"
UI->>Ctx : "login(token, user)"
Ctx-->>UI : "Updated context state"
```

**Diagram sources**
- [AuthClient.tsx:55-83](file://frontend/src/components/auth/AuthClient.tsx#L55-L83)
- [AuthContext.tsx:46-69](file://frontend/src/contexts/AuthContext.tsx#L46-L69)
- [auth.service.ts:5-11](file://frontend/src/services/auth.service.ts#L5-L11)
- [api.ts:29-43](file://frontend/src/services/api.ts#L29-L43)
- [app.ts:15-18](file://backend/src/app.ts#L15-L18)

**Section sources**
- [AuthClient.tsx:55-83](file://frontend/src/components/auth/AuthClient.tsx#L55-L83)
- [AuthContext.tsx:46-69](file://frontend/src/contexts/AuthContext.tsx#L46-L69)
- [auth.service.ts:5-11](file://frontend/src/services/auth.service.ts#L5-L11)
- [api.ts:29-43](file://frontend/src/services/api.ts#L29-L43)
- [app.ts:15-18](file://backend/src/app.ts#L15-L18)

## Detailed Component Analysis

### HTTP Client and Response Handling
- Base URL resolution from environment variable.
- Helper functions for GET, POST, PUT, PATCH with:
  - Optional JSON content-type and Authorization header injection.
  - Body support for both JSON string and FormData.
- Unified response parsing:
  - Parse JSON and throw on non-OK status using a generic message fallback.
- Exported base URL for potential reuse.

```mermaid
flowchart TD
Start(["Call apiPost/apiGet"]) --> BuildHeaders["Build headers<br/>+ Authorization if token"]
BuildHeaders --> SendReq["Fetch request"]
SendReq --> CheckOk{"res.ok?"}
CheckOk --> |No| ThrowErr["Throw Error(message or default)"]
CheckOk --> |Yes| Parse["Parse JSON"]
Parse --> Return["Return parsed data"]
ThrowErr --> End(["End"])
Return --> End
```

**Diagram sources**
- [api.ts:19-27](file://frontend/src/services/api.ts#L19-L27)
- [api.ts:29-43](file://frontend/src/services/api.ts#L29-L43)
- [api.ts:11-17](file://frontend/src/services/api.ts#L11-L17)

**Section sources**
- [api.ts:1-78](file://frontend/src/services/api.ts#L1-L78)

### Authentication Service
- Login: transforms contact into email and phone fields, sends JSON payload.
- User registration: sends user details as JSON.
- Owner registration: builds FormData and sends multipart payload.
- Uses centralized HTTP client with JSON or multipart support.

```mermaid
sequenceDiagram
participant UI as "AuthClient.tsx"
participant Svc as "auth.service.ts"
participant Http as "api.ts"
participant BE as "Express app.ts"
UI->>Svc : "registerOwner(ownerData)"
Svc->>Svc : "Build FormData"
Svc->>Http : "POST /owner/register (FormData, no JSON header)"
Http->>BE : "HTTP request"
BE-->>Http : "JSON response"
Http-->>Svc : "Parsed data"
Svc-->>UI : "AuthResponse"
```

**Diagram sources**
- [auth.service.ts:22-34](file://frontend/src/services/auth.service.ts#L22-L34)
- [api.ts:29-43](file://frontend/src/services/api.ts#L29-L43)
- [app.ts:18](file://backend/src/app.ts#L18)

**Section sources**
- [auth.service.ts:1-36](file://frontend/src/services/auth.service.ts#L1-L36)

### Booking Management Service
- Fetch owner bookings via GET with token.
- Update booking status via PATCH with token and status payload.

```mermaid
sequenceDiagram
participant Hook as "useOwnerBookings.ts"
participant Svc as "booking.service.ts"
participant Http as "api.ts"
participant BE as "Express app.ts"
Hook->>Svc : "getOwnerBookings(token)"
Svc->>Http : "GET /owner/my-bookings (Authorization)"
Http->>BE : "HTTP request"
BE-->>Http : "JSON { success, bookings }"
Http-->>Svc : "Parsed data"
Svc-->>Hook : "OwnerBookingsResponse"
Hook->>Svc : "updateBookingStatus(token, id, status)"
Svc->>Http : "PATCH /owner/update-booking-status/{id} (JSON)"
Http->>BE : "HTTP request"
BE-->>Http : "JSON { success, message, booking }"
Http-->>Svc : "Parsed data"
Svc-->>Hook : "UpdateBookingStatusResponse"
```

**Diagram sources**
- [booking.service.ts:5-11](file://frontend/src/services/booking.service.ts#L5-L11)
- [api.ts:19-27](file://frontend/src/services/api.ts#L19-L27)
- [api.ts:61-75](file://frontend/src/services/api.ts#L61-L75)
- [app.ts:18](file://backend/src/app.ts#L18)

**Section sources**
- [booking.service.ts:1-13](file://frontend/src/services/booking.service.ts#L1-L13)

### Facility Services
- Public fields: GET /field returning list of items.
- Owner courts: GET /owner/my-courts with token.
- Add court: POST /owner/add-court with FormData.
- Update court: PUT /owner/update-court/{ma_san} with optional JSON or raw body.
- Update court status: PATCH /owner/update-court-status/{ma_san} with JSON.

```mermaid
sequenceDiagram
participant Hook as "useOwnerCourts.ts"
participant Svc as "court.service.ts"
participant Http as "api.ts"
participant BE as "Express app.ts"
Hook->>Svc : "getOwnerCourts(token)"
Svc->>Http : "GET /owner/my-courts (Authorization)"
Http->>BE : "HTTP request"
BE-->>Http : "JSON { success, courts }"
Http-->>Svc : "Parsed data"
Svc-->>Hook : "OwnerCourtsResponse"
Hook->>Svc : "addCourt(token, formData)"
Svc->>Http : "POST /owner/add-court (FormData)"
Http->>BE : "HTTP request"
BE-->>Http : "JSON { success, message, court }"
Http-->>Svc : "Parsed data"
Svc-->>Hook : "AddCourtResponse"
Hook->>Svc : "updateCourt(token, ma_san, data, isJSON)"
Svc->>Http : "PUT /owner/update-court/{ma_san}"
Http->>BE : "HTTP request"
BE-->>Http : "JSON { success, message, court }"
Http-->>Svc : "Parsed data"
Svc-->>Hook : "UpdateCourtResponse"
```

**Diagram sources**
- [court.service.ts:9-20](file://frontend/src/services/court.service.ts#L9-L20)
- [court.service.ts:13-19](file://frontend/src/services/court.service.ts#L13-L19)
- [api.ts:45-59](file://frontend/src/services/api.ts#L45-L59)
- [app.ts:18](file://backend/src/app.ts#L18)

**Section sources**
- [court.service.ts:1-26](file://frontend/src/services/court.service.ts#L1-L26)

### Authentication Token Management and Interceptors
- Token and user persistence in local storage via AuthContext.
- Automatic Authorization header injection in HTTP client helpers.
- No explicit interceptor layer; token management is centralized in the HTTP client and consumed by services.

```mermaid
flowchart TD
Init(["App start"]) --> LoadLS["Load token & user from localStorage"]
LoadLS --> HasTokens{"Have token & user?"}
HasTokens --> |Yes| CtxProvide["AuthProvider sets state"]
HasTokens --> |No| Idle["Idle"]
CtxProvide --> UI["Components use useAuth()"]
UI --> CallSvc["Call service with token"]
CallSvc --> InjectHeader["Inject Authorization header"]
InjectHeader --> Fetch["Fetch request"]
```

**Diagram sources**
- [AuthContext.tsx:32-51](file://frontend/src/contexts/AuthContext.tsx#L32-L51)
- [api.ts:3-9](file://frontend/src/services/api.ts#L3-L9)

**Section sources**
- [AuthContext.tsx:1-83](file://frontend/src/contexts/AuthContext.tsx#L1-L83)
- [api.ts:1-78](file://frontend/src/services/api.ts#L1-L78)

### Response Parsing and Error Management
- Centralized response parser throws on non-OK responses with a message fallback.
- Frontend components catch errors and surface user-facing messages.
- Backend global error handler normalizes errors to JSON with status, statusCode, and message.
- Domain-specific ApiError class enables controlled HTTP status propagation.

```mermaid
flowchart TD
FEStart["Service call"] --> FEHttp["HTTP request"]
FEHttp --> FECheck{"res.ok?"}
FECheck --> |No| FEThrow["Throw Error(message or default)"]
FECheck --> |Yes| FEParse["res.json()"]
FEParse --> FESuccess["Return data"]
BEStart["Route handler"] --> BEError{"Error occurred?"}
BEError --> |ApiError| BENormalize["statusCode/message from ApiError"]
BEError --> |Prisma Known Error| BEPrisma["Map to 400 with details"]
BEError --> |Other| BEFallback["Default 500"]
BENormalize --> BERes["res.json({ status, statusCode, message })"]
BEPrisma --> BERes
BEFallback --> BERes
```

**Diagram sources**
- [api.ts:11-17](file://frontend/src/services/api.ts#L11-L17)
- [errorHandler.ts:5-37](file://backend/src/middlewares/errorHandler.ts#L5-L37)
- [ApiError.ts:1-13](file://backend/src/utils/ApiError.ts#L1-L13)

**Section sources**
- [api.ts:11-17](file://frontend/src/services/api.ts#L11-L17)
- [errorHandler.ts:1-38](file://backend/src/middlewares/errorHandler.ts#L1-L38)
- [ApiError.ts:1-13](file://backend/src/utils/ApiError.ts#L1-L13)

### Data Transformation and Type Safety
- Frontend types define request/response contracts for authentication, bookings, and courts.
- Hooks transform backend payloads into UI-friendly shapes (e.g., grid and map items).
- Consistent use of generics in HTTP helpers ensures compile-time safety.

```mermaid
classDiagram
class AuthResponse {
+boolean success
+string message
+UserData user
+string token
}
class UserData {
+string ma_nguoi_dung
+string ho_ten
+string email
+string so_dien_thoai
+string vai_tro
+string anh_dai_dien
}
class LoginRequest {
+string contact
+string mat_khau
}
class RegisterRequest {
+string ho_ten
+string email
+string so_dien_thoai
+string mat_khau
}
class OwnerRegisterRequest {
+string ho_ten
+string email
+string so_dien_thoai
+string mat_khau
+string ten_dia_diem
+string dia_chi
+File anh_cccd_truoc
+File anh_cccd_sau
}
AuthResponse --> UserData : "includes"
```

**Diagram sources**
- [auth.types.ts:1-40](file://frontend/src/types/auth.types.ts#L1-L40)

**Section sources**
- [auth.types.ts:1-40](file://frontend/src/types/auth.types.ts#L1-L40)
- [booking.types.ts:1-37](file://frontend/src/types/booking.types.ts#L1-L37)
- [court.types.ts:1-82](file://frontend/src/types/court.types.ts#L1-L82)
- [api.types.ts:1-6](file://frontend/src/types/api.types.ts#L1-L6)

### API Endpoint Patterns
- Public endpoints:
  - GET /field
- Protected endpoints (require Authorization):
  - GET /owner/my-bookings
  - PATCH /owner/update-booking-status/{id}
  - GET /owner/my-courts
  - POST /owner/add-court
  - PUT /owner/update-court/{ma_san}
  - PATCH /owner/update-court-status/{ma_san}
- Authentication endpoints:
  - POST /user/login
  - POST /user/register
  - POST /owner/register

**Section sources**
- [court.service.ts:5-24](file://frontend/src/services/court.service.ts#L5-L24)
- [booking.service.ts:5-11](file://frontend/src/services/booking.service.ts#L5-L11)
- [auth.service.ts:5-34](file://frontend/src/services/auth.service.ts#L5-L34)
- [app.ts:15-18](file://backend/src/app.ts#L15-L18)

### Caching Mechanisms
- No explicit caching layer is present in the frontend API integration layer.
- Consider implementing in-memory cache keyed by URL and token for idempotent GET requests.

[No sources needed since this section provides general guidance]

### Error Boundary Implementation
- Frontend components catch errors during service calls and display user-facing messages.
- Hooks centralize error logging and state updates.
- Backend provides a global error handler returning structured JSON errors.

**Section sources**
- [AuthClient.tsx:74-82](file://frontend/src/components/auth/AuthClient.tsx#L74-L82)
- [useOwnerBookings.ts:28-32](file://frontend/src/hooks/useOwnerBookings.ts#L28-L32)
- [useOwnerCourts.ts:20-24](file://frontend/src/hooks/useOwnerCourts.ts#L20-L24)
- [errorHandler.ts:5-37](file://backend/src/middlewares/errorHandler.ts#L5-L37)

### Retry Strategies and Offline Handling
- No built-in retry or offline handling is implemented in the current integration layer.
- Recommended approaches:
  - Retry on transient network errors with exponential backoff.
  - Queue requests and replay after reconnection for offline scenarios.

[No sources needed since this section provides general guidance]

### API Versioning and Rate Limiting
- No explicit versioning scheme or rate-limiting middleware is configured in the backend.
- Recommendations:
  - Add version prefix to routes or headers.
  - Integrate rate limiting middleware per route or globally.

**Section sources**
- [app.ts:1-21](file://backend/src/app.ts#L1-L21)

### Performance Optimization Techniques
- Minimize payload sizes (avoid sending unnecessary fields).
- Use selective updates (PATCH) and partial payloads.
- Debounce/fetch-while-typing for search/filter endpoints.
- Lazy-load images and defer non-critical computations.

[No sources needed since this section provides general guidance]

### Service Composition, Dependency Injection, and Testing Strategies
- Service composition:
  - Keep services pure and delegate HTTP concerns to the HTTP client.
  - Compose services in hooks to orchestrate multiple API calls.
- Dependency injection:
  - Pass token and HTTP client instances to services for testability.
- Testing strategies:
  - Mock HTTP client functions to isolate service logic.
  - Snapshot tests for transformed data in hooks.
  - Unit tests for service functions with mocked responses.

[No sources needed since this section provides general guidance]

## Dependency Analysis
The frontend depends on:
- HTTP client for transport and headers.
- Service modules for domain logic.
- Hooks for orchestrating calls and state.
- Types for compile-time safety.

Backend depends on:
- Routes for endpoint exposure.
- Middleware for error handling.
- Utilities for JWT and error modeling.

```mermaid
graph LR
API["api.ts"] --> |exports| HTTP["HTTP Transport"]
AS["auth.service.ts"] --> API
BS["booking.service.ts"] --> API
CS["court.service.ts"] --> API
UC["useFields.ts"] --> CS
UOB["useOwnerBookings.ts"] --> BS
UOC["useOwnerCourts.ts"] --> CS
CTX["AuthContext.tsx"] --> AC["AuthClient.tsx"]
AC --> AS
APP["app.ts"] --> ROUTES["Routes (/user,/admin,/field,/owner)"]
APP --> EH["errorHandler.ts"]
APP --> JWT["jwt.ts"]
```

**Diagram sources**
- [api.ts:1-78](file://frontend/src/services/api.ts#L1-L78)
- [auth.service.ts:1-36](file://frontend/src/services/auth.service.ts#L1-L36)
- [booking.service.ts:1-13](file://frontend/src/services/booking.service.ts#L1-L13)
- [court.service.ts:1-26](file://frontend/src/services/court.service.ts#L1-L26)
- [useFields.ts:1-78](file://frontend/src/hooks/useFields.ts#L1-L78)
- [useOwnerBookings.ts:1-67](file://frontend/src/hooks/useOwnerBookings.ts#L1-L67)
- [useOwnerCourts.ts:1-95](file://frontend/src/hooks/useOwnerCourts.ts#L1-L95)
- [AuthContext.tsx:1-83](file://frontend/src/contexts/AuthContext.tsx#L1-L83)
- [AuthClient.tsx:1-566](file://frontend/src/components/auth/AuthClient.tsx#L1-L566)
- [app.ts:1-21](file://backend/src/app.ts#L1-L21)
- [errorHandler.ts:1-38](file://backend/src/middlewares/errorHandler.ts#L1-L38)
- [jwt.ts:1-13](file://backend/src/utils/jwt.ts#L1-L13)

**Section sources**
- [api.ts:1-78](file://frontend/src/services/api.ts#L1-L78)
- [auth.service.ts:1-36](file://frontend/src/services/auth.service.ts#L1-L36)
- [booking.service.ts:1-13](file://frontend/src/services/booking.service.ts#L1-L13)
- [court.service.ts:1-26](file://frontend/src/services/court.service.ts#L1-L26)
- [useFields.ts:1-78](file://frontend/src/hooks/useFields.ts#L1-L78)
- [useOwnerBookings.ts:1-67](file://frontend/src/hooks/useOwnerBookings.ts#L1-L67)
- [useOwnerCourts.ts:1-95](file://frontend/src/hooks/useOwnerCourts.ts#L1-L95)
- [AuthContext.tsx:1-83](file://frontend/src/contexts/AuthContext.tsx#L1-L83)
- [AuthClient.tsx:1-566](file://frontend/src/components/auth/AuthClient.tsx#L1-L566)
- [app.ts:1-21](file://backend/src/app.ts#L1-L21)
- [errorHandler.ts:1-38](file://backend/src/middlewares/errorHandler.ts#L1-L38)
- [jwt.ts:1-13](file://backend/src/utils/jwt.ts#L1-L13)

## Performance Considerations
- Prefer PATCH/PUT for partial updates to reduce payload size.
- Normalize and memoize transformed data in hooks to avoid redundant computations.
- Defer non-critical UI updates until after data is fetched.
- Use pagination or filtering to limit initial payload sizes.

[No sources needed since this section provides general guidance]

## Troubleshooting Guide
Common issues and resolutions:
- Authentication failures:
  - Verify token presence and validity; check Authorization header injection.
  - Inspect thrown error messages from response parsing.
- Network errors:
  - Wrap service calls with try/catch and display user-friendly messages.
  - Implement retry logic for transient failures.
- Backend errors:
  - Review global error handler responses and logs.
  - Ensure ApiError usage for controlled status propagation.

**Section sources**
- [api.ts:11-17](file://frontend/src/services/api.ts#L11-L17)
- [AuthClient.tsx:74-82](file://frontend/src/components/auth/AuthClient.tsx#L74-L82)
- [errorHandler.ts:5-37](file://backend/src/middlewares/errorHandler.ts#L5-L37)

## Conclusion
The API integration layer provides a clean separation between HTTP transport, service logic, and UI orchestration. It leverages typed contracts, centralized response handling, and a simple token management model. Extending the layer with retry/backoff, offline handling, caching, and versioning will further improve robustness and performance.

## Appendices
- Environment configuration:
  - NEXT_PUBLIC_API_URL for frontend base URL.
  - JWT_SECRET and PORT for backend.
- Route coverage:
  - User: login, register.
  - Owner: my-bookings, update-booking-status, my-courts, add-court, update-court, update-court-status.
  - Field: list.

**Section sources**
- [api.ts:1](file://frontend/src/services/api.ts#L1)
- [server.ts:4](file://backend/src/server.ts#L4)
- [jwt.ts:3](file://backend/src/utils/jwt.ts#L3)
- [app.ts:15-18](file://backend/src/app.ts#L15-L18)