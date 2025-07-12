# Types Structure Documentation

## Overview

This directory contains all TypeScript type definitions for the ecommerce admin panel. The types are organized by domain in separate files for better maintainability and clarity.

## Structure

### `base.ts` - Base Types & Common Interfaces
Contains all common types and interfaces used across domains:

- **Base Types**: `BaseEntity`, `TimestampedEntity`
- **Status Types**: `EntityStatus`, `UserRole`
- **Address Types**: `GeoLocation`, `Address`, `ShippingAddress`
- **API Response Types**: `ApiListResponse<T>`, `ApiDetailResponse<T>`, `ApiErrorResponse`
- **Filter Types**: `PaginationParams`, `SortParams`, `SearchParams`, `FilterParams`

### Domain-Specific Files

#### `user.ts` - User Domain
- `User`, `Company`
- `CreateUserForm`, `UpdateUserForm`
- `UserFilters`

#### `product.ts` - Product Domain
- `Product`, `ProductDimensions`
- `CreateProductForm`, `UpdateProductForm`
- `ProductFilters`
- `ProductStatus`

#### `category.ts` - Category Domain
- `Category`
- `CreateCategoryForm`, `UpdateCategoryForm`
- `CategoryFilters`

#### `order.ts` - Order Domain
- `Order`, `OrderItem`
- `CreateOrderForm`, `UpdateOrderForm`
- `OrderFilters`
- `OrderStatus`, `PaymentStatus`

#### `post.ts` - Post Domain (Blog/Content)
- `Post`
- `CreatePostForm`, `UpdatePostForm`
- `PostFilters`
- `PostStatus`

### `index.ts` - Centralized Exports
Provides clean exports from all domain files, making imports simpler throughout the application.

## Benefits of Domain Separation

### 1. **Clear Organization**
Each domain has its own file, making it easy to:
- Find specific types
- Understand domain boundaries
- Maintain domain-specific logic

### 2. **Reduced Coupling**
- Domains are independent
- Changes in one domain don't affect others
- Clear import dependencies

### 3. **Better Scalability**
- Easy to add new domains
- Easy to modify existing domains
- Clear ownership of types

### 4. **Improved Developer Experience**
- Smaller, focused files
- Clear file names indicate content
- Easier to navigate and understand

## Usage Examples

### Importing from Specific Domains
```typescript
// Import from specific domain
import type { User, UserFilters } from '../types/user';

// Import from centralized index
import type { User, Product, Order } from '../types';
```

### Using in Services
```typescript
import type { User, UserFilters } from '../types';

export class UserService {
  static async getUsers(params?: UserFilters): Promise<User[]> {
    // Implementation
  }
}
```

### Using in Hooks
```typescript
import type { User, UserFilters } from '../types';

export function useUsers(filters?: UserFilters) {
  // Hook implementation
}
```

### Cross-Domain References
```typescript
// Order references User and Product
import type { User } from './user';
import type { Product } from './product';

export interface Order {
  userId: number;
  user?: User;
  items: OrderItem[];
}
```

## Best Practices

### 1. **Domain Boundaries**
- Keep domain-specific types in their own files
- Use imports for cross-domain references
- Avoid duplicating types across domains

### 2. **Type Reusability**
- Common types in `base.ts`
- Domain-specific types in domain files
- Clear inheritance hierarchy

### 3. **Consistent Patterns**
- All domains follow the same structure
- Form types for create/update operations
- Filter types for querying
- Status types for state management

### 4. **Import Organization**
- Use centralized `index.ts` for convenience
- Import specific domains when needed
- Avoid circular dependencies

## Adding New Domains

To add a new domain (e.g., `Review`):

1. **Create domain file**: `src/types/review.ts`
2. **Define types**:
   ```typescript
   export interface Review extends BaseEntity {
     // domain-specific fields
   }
   
   export interface CreateReviewForm {
     // form fields
   }
   
   export interface ReviewFilters extends FilterParams {
     // filter options
   }
   ```
3. **Update index.ts**:
   ```typescript
   export * from './review';
   ```
4. **Create corresponding service and hooks**

## Migration Notes

- All imports now use `../types` instead of `../types/entities`
- Domain-specific imports available: `../types/user`, `../types/product`, etc.
- Better type organization and discoverability
- Clearer separation of concerns 