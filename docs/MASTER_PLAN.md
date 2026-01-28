# 🚀 E-commerce Frontend Implementation Plan

## Project Overview

Frontend application for the E-commerce Microservices Backend. Built with **Next.js 16**, **React 19**, **TypeScript**, and **Tailwind CSS 4**.

---

## 🏗️ Backend API Reference

| Service | Port | Base URL | Description |
|---------|------|----------|-------------|
| **Product Service** | `8081` | `/api/products` | Catalog, product CRUD |
| **Inventory Service** | `8082` | `/api/inventory` | Stock management |
| **Order Service** | `8083` | `/api/orders` | Order creation, tracking |
| **Payment Service** | `8084` | `/api/payments` | Payment status |
| **Notification Service** | `8085` | `/api/notifications` | Notifications |

### API Response Format
```typescript
interface ApiResponse<T> {
  success: boolean;
  data: T | null;
  error: {
    code: string;
    message: string;
    details?: unknown;
  } | null;
  timestamp: string;
}
```

---

## 📋 Phase Overview

| Phase | Focus | Status | Estimated Time |
|-------|-------|--------|----------------|
| **Phase 1** | Project Foundation & Types | ✅ Completed | 1 day |
| **Phase 2** | Product Catalog (Browse & Search) | ✅ Completed | 2 days |
| **Phase 3** | Shopping Cart | ✅ Completed | 2 days |
| **Phase 4** | Checkout & Order Flow | ✅ Completed | 2 days |
| **Phase 5** | Order History & Tracking | ✅ Completed | 1 day |
| **Phase 6** | UI Polish & Animations | ✅ Completed | 2 days |
| **Phase 7** | Testing & Optimization | ✅ Completed | 2 days |

---

## 📦 Phase 1: Project Foundation & Types

**Goal:** Set up project structure, API client, TypeScript types matching backend DTOs.

### Task 1.1: Environment Configuration
- [ ] Create `.env.local` with API base URLs
- [ ] Create `.env.example` for documentation
- [ ] Configure Next.js `next.config.ts` for API rewrites/proxy

**Files:**
- `.env.local`
- `.env.example`
- `next.config.ts`

### Task 1.2: TypeScript Types (Match Backend DTOs)
- [ ] Create `types/api.ts` - Generic API response types
- [ ] Create `types/product.ts` - Product types
- [ ] Create `types/order.ts` - Order types
- [ ] Create `types/inventory.ts` - Inventory types
- [ ] Create `types/payment.ts` - Payment types
- [ ] Create `types/cart.ts` - Shopping cart types (frontend only)

**Files:**
```
src/types/
├── api.ts           # ApiResponse<T>, ErrorDetail, PageResponse<T>
├── product.ts       # Product, ProductStatus, CreateProductCommand
├── order.ts         # Order, OrderItem, CreateOrderCommand, OrderStatus
├── inventory.ts     # Inventory, StockOperationResponse
├── payment.ts       # Payment, PaymentMethod, PaymentStatus
├── cart.ts          # CartItem, Cart (frontend state)
└── index.ts         # Re-export all types
```

### Task 1.3: API Client Setup
- [ ] Create `lib/api/client.ts` - Base fetch wrapper with error handling
- [ ] Create `lib/api/products.ts` - Product API functions
- [ ] Create `lib/api/orders.ts` - Order API functions
- [ ] Create `lib/api/inventory.ts` - Inventory API functions
- [ ] Create `lib/api/payments.ts` - Payment API functions

**Files:**
```
src/lib/api/
├── client.ts        # Base API client with error handling
├── products.ts      # getAllProducts, getProduct, etc.
├── orders.ts        # createOrder, getOrder, getOrdersByCustomer, cancelOrder
├── inventory.ts     # getInventoryByProduct
├── payments.ts      # getPaymentByOrder
└── index.ts         # Re-export
```

### Task 1.4: React Query Setup
- [ ] Install @tanstack/react-query
- [ ] Create `lib/query-client.ts` - Query client config
- [ ] Update `components/providers.tsx` - Add QueryClientProvider
- [ ] Create custom hooks for each API endpoint

**Files:**
```
src/lib/
├── query-client.ts

src/hooks/
├── use-products.ts  # useProducts, useProduct
├── use-orders.ts    # useOrders, useOrder, useCreateOrder
├── use-inventory.ts # useInventory
├── use-cart.ts      # Cart state management (Zustand or Context)
└── index.ts
```

---

## 📦 Phase 2: Product Catalog

**Goal:** Display product listing and product detail pages with real data from backend.

### Task 2.1: Product List Page
- [ ] Create `/products` route
- [ ] Create `ProductCard` component
- [ ] Create `ProductGrid` component
- [ ] Fetch and display products from API
- [ ] Add loading skeleton states
- [ ] Add error handling states

**Files:**
```
src/app/products/
├── page.tsx
├── loading.tsx
├── error.tsx

src/components/features/products/
├── ProductCard.tsx
├── ProductGrid.tsx
├── ProductCardSkeleton.tsx
└── index.ts
```

### Task 2.2: Product Detail Page
- [ ] Create `/products/[id]` route
- [ ] Create `ProductDetail` component
- [ ] Display product info (name, description, price, status)
- [ ] Show inventory availability (call Inventory API)
- [ ] Add "Add to Cart" button
- [ ] Add quantity selector

**Files:**
```
src/app/products/[id]/
├── page.tsx
├── loading.tsx
├── error.tsx

src/components/features/products/
├── ProductDetail.tsx
├── ProductImage.tsx
├── ProductPrice.tsx
├── ProductAvailability.tsx
├── AddToCartButton.tsx
└── QuantitySelector.tsx
```

### Task 2.3: Product Search & Filter (Optional Enhancement)
- [ ] Create search input component
- [ ] Create filter sidebar (by status, price range)
- [ ] Implement URL-based search params with `nuqs`
- [ ] Add debounced search

**Files:**
```
src/components/features/products/
├── ProductSearch.tsx
├── ProductFilters.tsx
└── ProductSort.tsx
```

### Task 2.4: Update Homepage
- [ ] Replace placeholder categories with real product data
- [ ] Add "Featured Products" section (first 6 products)
- [ ] Add "Shop Now" CTA linking to `/products`

---

## 📦 Phase 3: Shopping Cart

**Goal:** Implement cart functionality with local state management.

### Task 3.1: Cart State Management
- [ ] Install Zustand for state management
- [ ] Create cart store (`stores/cart-store.ts`)
- [ ] Implement cart actions: add, remove, update quantity, clear
- [ ] Persist cart to localStorage
- [ ] Calculate totals

**Files:**
```
src/stores/
├── cart-store.ts    # Zustand store

src/hooks/
├── use-cart.ts      # Custom hook for cart operations
```

### Task 3.2: Cart Drawer/Side Panel
- [ ] Create `CartDrawer` component (slide-in panel)
- [ ] Create `CartItem` component
- [ ] Show cart icon in Header with item count badge
- [ ] Implement open/close cart drawer

**Files:**
```
src/components/features/cart/
├── CartDrawer.tsx
├── CartItem.tsx
├── CartSummary.tsx
├── CartEmptyState.tsx
└── index.ts
```

### Task 3.3: Cart Page
- [ ] Create `/cart` route
- [ ] Full-page cart view
- [ ] Update quantity controls
- [ ] Remove item functionality
- [ ] Cart summary with totals
- [ ] "Proceed to Checkout" button

**Files:**
```
src/app/cart/
├── page.tsx
```

### Task 3.4: Update Header
- [ ] Add cart icon with badge showing item count
- [ ] Add click handler to open cart drawer
- [ ] Style active states

---

## 📦 Phase 4: Checkout & Order Flow

**Goal:** Implement checkout process and order creation.

### Task 4.1: Checkout Page Layout
- [ ] Create `/checkout` route
- [ ] Create checkout form layout (multi-step or single page)
- [ ] Create `CheckoutSummary` component (order review)

**Files:**
```
src/app/checkout/
├── page.tsx
├── layout.tsx

src/components/features/checkout/
├── CheckoutLayout.tsx
├── CheckoutSummary.tsx
└── index.ts
```

### Task 4.2: Customer Information Form
- [ ] Create customer info form (using react-hook-form + zod)
- [ ] Fields: Customer ID (for demo, can be text input or mock)
- [ ] Form validation

**Files:**
```
src/components/features/checkout/
├── CustomerInfoForm.tsx
└── CheckoutFormSchema.ts  # Zod validation
```

### Task 4.3: Order Creation
- [ ] Create order submission logic
- [ ] Transform cart items to `CreateOrderCommand` format
- [ ] Call Order API with Idempotency-Key
- [ ] Handle success: redirect to order confirmation
- [ ] Handle error: display error message

**Files:**
```
src/lib/api/orders.ts     # createOrder function
src/hooks/use-orders.ts   # useCreateOrder mutation
```

### Task 4.4: Order Confirmation Page
- [ ] Create `/checkout/success` route
- [ ] Display order details
- [ ] Show order status
- [ ] Clear cart on success
- [ ] Link to view order details

**Files:**
```
src/app/checkout/success/
├── page.tsx

src/components/features/checkout/
├── OrderConfirmation.tsx
```

---

## 📦 Phase 5: Order History & Tracking

**Goal:** Allow customers to view their order history and track order status.

### Task 5.1: Orders List Page
- [ ] Create `/orders` route
- [ ] Create `OrderCard` component
- [ ] Fetch orders by customer ID
- [ ] Display order list with status badges
- [ ] Add "View Details" link

**Files:**
```
src/app/orders/
├── page.tsx
├── loading.tsx

src/components/features/orders/
├── OrderCard.tsx
├── OrderList.tsx
├── OrderStatusBadge.tsx
└── index.ts
```

### Task 5.2: Order Detail Page
- [ ] Create `/orders/[id]` route
- [ ] Display full order details
- [ ] Show order items
- [ ] Show order status timeline
- [ ] Fetch payment info (if available)
- [ ] Add "Cancel Order" button (if applicable)

**Files:**
```
src/app/orders/[id]/
├── page.tsx
├── loading.tsx

src/components/features/orders/
├── OrderDetail.tsx
├── OrderItemsList.tsx
├── OrderTimeline.tsx
├── PaymentInfo.tsx
└── CancelOrderButton.tsx
```

### Task 5.3: Customer ID Input (Demo Mode)
- [ ] Create simple customer ID input (for demo purposes)
- [ ] Store customer ID in localStorage
- [ ] Use in header or sidebar

---

## 📦 Phase 6: UI Polish & Animations

**Goal:** Enhance UI/UX with modern design, animations, and responsive layouts.

### Task 6.1: Design System Enhancements
- [ ] Update color palette (premium dark mode)
- [ ] Add custom typography (Google Fonts: Inter/Outfit)
- [ ] Create consistent spacing/sizing tokens
- [ ] Add glassmorphism effects where appropriate

### Task 6.2: Component Animations
- [ ] Add page transition animations (Framer Motion)
- [ ] Add cart drawer slide animation
- [ ] Add product card hover effects
- [ ] Add skeleton loading animations
- [ ] Add toast notifications for cart actions

**Files:**
```
src/components/ui/
├── toast.tsx
├── skeleton.tsx
├── badge.tsx
├── dialog.tsx
├── drawer.tsx
└── input.tsx
```

### Task 6.3: Responsive Design
- [ ] Ensure mobile-first responsive design
- [ ] Test on mobile, tablet, desktop
- [ ] Add mobile navigation menu
- [ ] Optimize touch interactions

### Task 6.4: Micro-interactions
- [ ] Button press effects
- [ ] Add to cart success animation
- [ ] Quantity update transitions
- [ ] Status badge pulse effects

---

## 📦 Phase 7: Testing & Optimization

**Goal:** Ensure quality, performance, and reliability.

### Task 7.1: Unit Testing
- [ ] Set up Jest + React Testing Library
- [ ] Test API client functions
- [ ] Test cart store
- [ ] Test form validation

### Task 7.2: Integration Testing
- [ ] Test product listing flow
- [ ] Test add to cart flow
- [ ] Test checkout flow
- [ ] Test order viewing flow

### Task 7.3: Performance Optimization
- [ ] Implement image optimization
- [ ] Add proper caching headers
- [ ] Lazy load components
- [ ] Optimize bundle size
- [ ] Add proper SEO meta tags

### Task 7.4: Error Handling & Edge Cases
- [ ] Handle API errors gracefully
- [ ] Handle network failures
- [ ] Handle empty states
- [ ] Add retry mechanisms

---

## 📁 Final Project Structure

```
ecommerce-frontend/
├── public/
├── src/
│   ├── app/
│   │   ├── (shop)/              # Main shop layout group
│   │   │   ├── products/
│   │   │   │   ├── page.tsx
│   │   │   │   └── [id]/page.tsx
│   │   │   ├── cart/page.tsx
│   │   │   ├── checkout/
│   │   │   │   ├── page.tsx
│   │   │   │   └── success/page.tsx
│   │   │   └── orders/
│   │   │       ├── page.tsx
│   │   │       └── [id]/page.tsx
│   │   ├── layout.tsx
│   │   ├── page.tsx             # Homepage
│   │   └── globals.css
│   │
│   ├── components/
│   │   ├── features/
│   │   │   ├── products/        # Product-related components
│   │   │   ├── cart/            # Cart components
│   │   │   ├── checkout/        # Checkout components
│   │   │   └── orders/          # Order components
│   │   ├── layout/
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── Hero.tsx
│   │   ├── ui/                  # Shadcn-style UI primitives
│   │   └── providers.tsx
│   │
│   ├── hooks/
│   │   ├── use-products.ts
│   │   ├── use-orders.ts
│   │   ├── use-inventory.ts
│   │   ├── use-cart.ts
│   │   └── index.ts
│   │
│   ├── lib/
│   │   ├── api/
│   │   │   ├── client.ts
│   │   │   ├── products.ts
│   │   │   ├── orders.ts
│   │   │   ├── inventory.ts
│   │   │   └── payments.ts
│   │   ├── query-client.ts
│   │   └── utils.ts
│   │
│   ├── stores/
│   │   └── cart-store.ts
│   │
│   └── types/
│       ├── api.ts
│       ├── product.ts
│       ├── order.ts
│       ├── inventory.ts
│       ├── payment.ts
│       ├── cart.ts
│       └── index.ts
│
├── .env.local
├── .env.example
├── next.config.ts
├── package.json
├── tailwind.config.ts
└── tsconfig.json
```

---

## 🎯 Success Criteria

1. **Functional:** Users can browse products, add to cart, checkout, and view orders
2. **Performance:** Page load < 2s, smooth animations
3. **Responsive:** Works on mobile, tablet, desktop
4. **Error Handling:** Graceful error states, retry mechanisms
5. **Code Quality:** TypeScript strict mode, consistent styling

---

## 📝 Notes

- **No Authentication (Phase 1-7):** Customer ID is manually entered for demo purposes
- **Authentication** will be added in a future phase when Backend Phase 3 is complete
- **API Gateway** will be added when Backend implements it (Port TBD)

---

## 🔗 Related Documents

- [Backend README](../../ecommerce-backend/README.md)
- [Backend Master Plan](../../ecommerce-backend/docs/MASTER_PLAN.md)
