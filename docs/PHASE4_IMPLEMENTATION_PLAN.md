# 🛒 Phase 4: Checkout & Order Flow - Implementation Plan

## Overview

Triển khai quy trình checkout và tạo đơn hàng cho ứng dụng E-commerce Frontend, bao gồm checkout page, customer info form, order creation với idempotency key, và order confirmation page.

---

## Current State Analysis

### ✅ Đã có sẵn (Phase 1-3)
- **Cart Store** (`stores/cart-store.ts`): Zustand store với đầy đủ actions
- **Order Types** (`types/order.ts`): `Order`, `OrderItem`, `CreateOrderCommand`, `OrderItemRequest`, `OrderStatus`
- **Order API** (`lib/api/orders.ts`): `createOrder`, `getOrder`, `getOrdersByCustomer`, `cancelOrder` với Idempotency-Key
- **Order Hooks** (`hooks/use-orders.ts`): `useOrders`, `useOrder`, `useCreateOrder`, `useCancelOrder`
- **Dependencies**: `react-hook-form@7.70.0`, `zod@4.3.5` đã cài sẵn
- **Cart Page** (`app/cart/page.tsx`): Đã có "Proceed to Checkout" button

### 📁 Cấu trúc cần tạo
```
src/
├── app/checkout/
│   ├── page.tsx              # Main checkout page
│   ├── layout.tsx            # Checkout layout  
│   └── success/
│       └── page.tsx          # Order confirmation page
├── components/features/checkout/
│   ├── CheckoutLayout.tsx    # Layout wrapper
│   ├── CheckoutSummary.tsx   # Order review summary
│   ├── CustomerInfoForm.tsx  # Customer info form
│   ├── CheckoutFormSchema.ts # Zod validation schema
│   ├── OrderConfirmation.tsx # Success display
│   └── index.ts              # Re-exports
└── lib/
    └── utils.ts              # Add UUID generator
```

---

## Backend API Reference

### Order Service (Port 8083)

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/orders` | POST | Create order (supports Idempotency-Key header) |
| `/api/orders/{id}` | GET | Get order by ID |
| `/api/orders?customerId={id}` | GET | Get orders by customer |
| `/api/orders/{id}/cancel` | POST | Cancel order |

### CreateOrderCommand Schema
```typescript
interface CreateOrderCommand {
    customerId: string;      // Required, not blank
    items: OrderItemRequest[]; // Required, not empty
}

interface OrderItemRequest {
    productId: string;  // Required
    quantity: number;   // Min: 1
}
```

---

## Proposed Changes

### Component: Utilities

#### [MODIFY] [utils.ts](file:///home/sotatek/Develop/My_Self/Mordern_Java/ecommerce-frontend/src/lib/utils.ts)

Thêm function generate UUID cho Idempotency-Key:
```typescript
export function generateIdempotencyKey(): string {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}
```

---

### Component: Checkout Form Schema

#### [NEW] [CheckoutFormSchema.ts](file:///home/sotatek/Develop/My_Self/Mordern_Java/ecommerce-frontend/src/components/features/checkout/CheckoutFormSchema.ts)

Zod schema cho checkout form validation:
```typescript
import { z } from 'zod';

export const checkoutFormSchema = z.object({
    customerId: z.string()
        .min(1, 'Customer ID is required')
        .max(100, 'Customer ID is too long'),
});

export type CheckoutFormData = z.infer<typeof checkoutFormSchema>;
```

---

### Component: Customer Info Form

#### [NEW] [CustomerInfoForm.tsx](file:///home/sotatek/Develop/My_Self/Mordern_Java/ecommerce-frontend/src/components/features/checkout/CustomerInfoForm.tsx)

Form nhập Customer ID với react-hook-form + zod validation:

**Features:**
- Input field cho Customer ID 
- Form validation với error messages
- Loading state khi đang submit
- Disable submit khi cart empty

---

### Component: Checkout Summary

#### [NEW] [CheckoutSummary.tsx](file:///home/sotatek/Develop/My_Self/Mordern_Java/ecommerce-frontend/src/components/features/checkout/CheckoutSummary.tsx)

Hiển thị order review trước khi submit:

**Features:**
- Danh sách items từ cart (tên product, quantity, price)
- Subtotal, shipping, tax, total
- Số lượng items

---

### Component: Checkout Layout

#### [NEW] [CheckoutLayout.tsx](file:///home/sotatek/Develop/My_Self/Mordern_Java/ecommerce-frontend/src/components/features/checkout/CheckoutLayout.tsx)

Wrapper layout cho checkout pages:

**Features:**
- Two-column layout (form bên trái, summary bên phải)
- Responsive: stack trên mobile
- Progress indicator (optional enhancement)

---

### Component: Order Confirmation

#### [NEW] [OrderConfirmation.tsx](file:///home/sotatek/Develop/My_Self/Mordern_Java/ecommerce-frontend/src/components/features/checkout/OrderConfirmation.tsx)

Hiển thị chi tiết đơn hàng sau khi tạo thành công:

**Features:**
- Order ID
- Order status với badge
- Danh sách items đã đặt
- Tổng tiền
- Link đến order details page
- Button tiếp tục shopping

---

### Component: Index Export

#### [NEW] [index.ts](file:///home/sotatek/Develop/My_Self/Mordern_Java/ecommerce-frontend/src/components/features/checkout/index.ts)

Re-export tất cả checkout components.

---

### Component: Checkout Page

#### [NEW] [page.tsx](file:///home/sotatek/Develop/My_Self/Mordern_Java/ecommerce-frontend/src/app/checkout/page.tsx)

Main checkout page:

**Flow:**
1. Kiểm tra cart có items không → redirect về `/cart` nếu empty
2. Hiển thị CustomerInfoForm và CheckoutSummary
3. Khi submit form:
   - Generate idempotency key
   - Transform cart items → CreateOrderCommand format
   - Call `useCreateOrder` mutation
   - On success: clear cart → redirect `/checkout/success?orderId={id}`
   - On error: show error message

---

### Component: Checkout Layout File

#### [NEW] [layout.tsx](file:///home/sotatek/Develop/My_Self/Mordern_Java/ecommerce-frontend/src/app/checkout/layout.tsx)

Checkout route layout với consistent styling.

---

### Component: Order Success Page

#### [NEW] [page.tsx](file:///home/sotatek/Develop/My_Self/Mordern_Java/ecommerce-frontend/src/app/checkout/success/page.tsx)

Order confirmation page:

**Flow:**
1. Lấy `orderId` từ URL search params
2. Fetch order details với `useOrder(orderId)`
3. Hiển thị OrderConfirmation component
4. Handle loading/error states
5. Auto-refetch nếu order đang trong transitional state (PENDING, INVENTORY_RESERVED)

---

## Implementation Tasks Breakdown

### Task 4.1: Checkout Page Layout (Day 1 Morning)
- [x] Create `/checkout` route structure
- [ ] Create `CheckoutLayout.tsx` component
- [ ] Create `CheckoutSummary.tsx` component
- [ ] Create `app/checkout/layout.tsx`

### Task 4.2: Customer Information Form (Day 1 Afternoon)
- [ ] Create `CheckoutFormSchema.ts` with zod
- [ ] Create `CustomerInfoForm.tsx` with react-hook-form
- [ ] Add form validation and error states
- [ ] Add loading state during submission

### Task 4.3: Order Creation Logic (Day 1 Evening)
- [ ] Add `generateIdempotencyKey` to utils.ts
- [ ] Create main `app/checkout/page.tsx`
- [ ] Implement cart → CreateOrderCommand transform
- [ ] Handle order creation with idempotency
- [ ] Handle success/error states

### Task 4.4: Order Confirmation Page (Day 2)
- [ ] Create `OrderConfirmation.tsx` component
- [ ] Create `/checkout/success/page.tsx`
- [ ] Fetch and display order details
- [ ] Clear cart on success
- [ ] Add navigation links

---

## File Dependency Order

Thứ tự implement để tối ưu workflow:

1. `lib/utils.ts` - Add generateIdempotencyKey
2. `components/features/checkout/CheckoutFormSchema.ts`
3. `components/features/checkout/CheckoutSummary.tsx`
4. `components/features/checkout/CustomerInfoForm.tsx`
5. `components/features/checkout/CheckoutLayout.tsx`
6. `components/features/checkout/index.ts`
7. `app/checkout/layout.tsx`
8. `app/checkout/page.tsx`
9. `components/features/checkout/OrderConfirmation.tsx`
10. `app/checkout/success/page.tsx`

---

## Verification Plan

### Manual Testing Checklist

1. **Empty Cart Protection**
   - [ ] Navigate trực tiếp đến `/checkout` với cart rỗng → redirect về `/cart`

2. **Checkout Flow**
   - [ ] Thêm sản phẩm vào cart
   - [ ] Click "Proceed to Checkout" từ cart page
   - [ ] Nhập Customer ID
   - [ ] Submit form
   - [ ] Verify redirect đến success page với order details

3. **Form Validation**
   - [ ] Submit với Customer ID trống → show error
   - [ ] Submit với valid Customer ID → no error

4. **Order Creation**
   - [ ] Verify order được tạo trong backend
   - [ ] Verify cart được clear sau khi success
   - [ ] Verify idempotency: submit lại với cùng key → không tạo duplicate order

5. **Error Handling**
   - [ ] Backend không available → show error message
   - [ ] Invalid order data → show error message

6. **UI/UX**
   - [ ] Loading state hiển thị đúng khi đang submit
   - [ ] Responsive layout trên mobile/tablet/desktop
   - [ ] Success page hiển thị đầy đủ order info

### Browser Testing

```bash
# Start frontend dev server
npm run dev

# Test checkout flow
1. Open http://localhost:3000/products
2. Add products to cart
3. Go to cart → Click checkout
4. Enter customer ID
5. Submit and verify success page
```

---

## Notes & Considerations

> [!IMPORTANT]
> **No Authentication**: Customer ID là input thủ công (demo mode). Authentication sẽ được thêm ở phase sau.

> [!TIP]
> **Idempotency Key**: Generated mỗi lần user click submit. Nếu user refresh và submit lại, sẽ có key mới → order mới.

> [!NOTE]
> **Cart State**: Cart được persist trong localStorage (Zustand). Clear cart chỉ sau khi order creation thành công.

---

## Estimated Time

| Task | Estimated |
|------|-----------|
| Task 4.1: Layout & Summary | 2 hours |
| Task 4.2: Customer Form | 1.5 hours |
| Task 4.3: Order Creation | 2 hours |
| Task 4.4: Confirmation Page | 1.5 hours |
| Testing & Polish | 1 hour |
| **Total** | **8 hours (1 day)** |
