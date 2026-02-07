# Learning Summary: Next.js API Routes with Prisma

Based on the code you've built, here are the key concepts you've learned:

---

## 1. **Next.js App Router API Routes**
- Created RESTful endpoints using the App Router (`/api/workflows/route.ts`)
- Exported named functions (`GET`, `POST`, `PUT`, `DELETE`) that map to HTTP methods
- Used `NextRequest` and `NextResponse` for request/response handling

## 2. **Dynamic Route Parameters**
- Used `[id]` folder convention for dynamic segments
- Accessed params via `context.params` (as a Promise in Next.js 15+):
  ```typescript
  const { id } = await context.params;
  ```

## 3. **Zod Validation**
- Created reusable validation schemas with constraints:
  ```typescript
  z.string().min(1).max(100)
  z.string().max(500).optional()
  ```
- Used `.parse()` to validate and throw on failure

## 4. **Prisma Database Operations**
- **CRUD operations**: `create`, `findMany`, `findUnique`, `update`, `delete`
- **Pagination**: `skip` and `take` for offset-based pagination
- **Relations**: `include` to fetch related `nodes` and `edges`
- **Transactions**: `prisma.$transaction()` for atomic operations (delete old → create new)

## 5. **Centralized Error Handling**
- Single `handleApiError()` function handling:
  - `SyntaxError` → 400 (Invalid JSON)
  - `ZodError` → 400 (Validation failed)
  - `PrismaClientKnownRequestError` (P2025) → 404 (Not found)
  - Fallback → 500 (Internal Server Error)

## 6. **Parallel Queries with Promise.all**
```typescript
const [totalCount, workflows] = await Promise.all([
  prisma.workflow.count(),
  prisma.workflow.findMany({...})
]);
```

---

## Key Patterns Learned
| Pattern | Purpose |
|---------|---------|
| Schema validation at API boundary | Ensure data integrity |
| Centralized error handler | DRY, consistent responses |
| Transactions for related data | Atomic updates |
| Pagination metadata in response | Client-side pagination support |