# Code Review Report - Phase 4: Checkout & Order Flow

**Date:** January 17, 2026
**Reviewer:** Senior Frontend Engineer
**Verdict:** NEEDS REVISION - Có một số vấn đề cần fix trước khi merge

---

## Overview

Review toàn bộ implementation của Phase 4 bao gồm:
- Checkout page (`/checkout`)
- Order success page (`/checkout/success`)
- Checkout components (Layout, Form, Summary, Confirmation)
- Order hooks và API client
- Related types và utilities

---

## Critical Issues (Phải fix ngay)

### 1. Idempotency Key Implementation SAI hoàn toàn

**File:** `src/app/checkout/page.tsx:47`

```typescript
const handleSubmit = async (data: CheckoutFormData) => {
    // ...
    const idempotencyKey = generateIdempotencyKey() // SAI!
```

**Vấn đề:** Idempotency key được tạo MỚI mỗi lần submit. Điều này phá vỡ hoàn toàn mục đích của idempotency.

**Hậu quả:** Nếu user click "Place Order" 2 lần (do lag hoặc double-click), sẽ tạo 2 orders khác nhau vì mỗi lần có key khác nhau.

**Giải pháp:** Key cần được tạo 1 lần khi vào checkout page và giữ nguyên cho đến khi order thành công hoặc user thay đổi cart.

```typescript
// Đúng cách:
const [idempotencyKey] = useState(() => generateIdempotencyKey())

// Hoặc reset khi cart thay đổi
useEffect(() => {
    setIdempotencyKey(generateIdempotencyKey())
}, [items]) // khi items thay đổi thì tạo key mới
```

---

### 2. Race Condition - Cart có thể thay đổi trong lúc submitting

**File:** `src/app/checkout/page.tsx:38-44`

```typescript
const handleSubmit = async (data: CheckoutFormData) => {
    const command: CreateOrderCommand = {
        customerId: data.customerId,
        items: items.map(...), // items có thể thay đổi
    }
```

**Vấn đề:** `items` được đọc từ store tại thời điểm submit. Nếu store thay đổi giữa chừng (tab khác, extension, etc.), order có thể sai.

**Giải pháp:** Capture items snapshot hoặc lock cart khi bắt đầu checkout.

---

### 3. Type mismatch trong refetchInterval

**File:** `src/hooks/use-orders.ts:21`

```typescript
refetchInterval: (query) => {
    const status = query.state.data?.status;
    return status === 'PENDING' || status === 'INVENTORY_RESERVED' ? 2000 : false;
    //         ^^^^^^^^^^^^^^^^   ^^^^^^^^^^^^^^^^^^^^^^^^^^
    //         String literal thay vì dùng enum OrderStatus
}
```

**Vấn đề:** Đã định nghĩa `OrderStatus` enum nhưng lại dùng string literal. Nếu backend đổi tên status, code sẽ fail silently.

**Giải pháp:**
```typescript
return status === OrderStatus.PENDING || status === OrderStatus.INVENTORY_RESERVED ? 2000 : false;
```

---

### 4. Missing validation trước khi submit

**File:** `src/app/checkout/page.tsx:34-68`

Không có validation check nếu `items` rỗng trước khi call API. Dựa vào redirect logic là không đủ vì có thể có race condition.

---

## High Severity Issues

### 5. Duplicate Skeleton Code

**File:** `src/app/checkout/success/page.tsx:37-62` và `src/app/checkout/success/page.tsx:95-118`

`CheckoutSuccessLoading` và loading state trong `CheckoutSuccessContent` gần như giống hệt nhau. DRY violation rõ ràng.

```typescript
// Loading state bên trong component (line 37-62)
if (isLoading) {
    return (
        <div className="container mx-auto px-4 py-12">
            <div className="max-w-2xl mx-auto">
                {/* Success Header Skeleton */}
                ...
            </div>
        </div>
    )
}

// Suspense fallback component (line 95-118)
function CheckoutSuccessLoading() {
    return (
        <div className="container mx-auto px-4 py-12">
            <div className="max-w-2xl mx-auto">
                // Copy-paste code
            </div>
        </div>
    )
}
```

---

### 6. Index as Key Anti-pattern

**File:** `src/components/features/checkout/OrderConfirmation.tsx:108`

```typescript
{order.items.map((item, index) => (
    <div key={index} // KHÔNG BAO GIỜ dùng index làm key
```

**Vấn đề:** Nếu order items được reorder hoặc removed, React sẽ render sai.

**Giải pháp:** Dùng `item.productId` hoặc composite key `${item.productId}-${index}`

---

### 7. CheckoutSummary không handle empty state

**File:** `src/components/features/checkout/CheckoutSummary.tsx`

Nếu `items` rỗng, component vẫn render với "0 items" và "$0.00". Không có empty state message hoặc redirect logic.

---

### 8. No Network Error Handling

**File:** `src/app/checkout/success/page.tsx:66`

```typescript
if (error || !order) {
    return (
        // Không phân biệt:
        // - Network error (user offline)
        // - 404 (order không tồn tại)
        // - 500 (server error)
```

User cần biết lỗi gì để biết có nên retry không.

---

### 9. No Request Timeout

**File:** `src/lib/api/client.ts`

API client không có timeout configuration. Nếu server chậm, user sẽ stuck với loading spinner vô hạn.

---

## Medium Severity Issues

### 10. Magic Numbers

```typescript
// use-orders.ts:21
return status === 'PENDING' ? 2000 : false; // 2000ms từ đâu ra?

// CheckoutSummary.tsx:20
<div className="space-y-4 max-h-80 overflow-y-auto"> // 80 * 4 = 320px?
```

Nên extract ra constants với meaningful names.

---

### 11. Hardcoded Emojis

**Files:** `CheckoutSummary.tsx:24`, `CheckoutSummary.tsx:71-75`

```typescript
<span className="text-2xl">📦</span>
// ...
<span>🛡️</span>
<span>↩️</span>
```

Emoji rendering không consistent across OS/browsers. Nên dùng Icon components hoặc SVG.

---

### 12. Demo Mode Warning Hardcoded

**File:** `src/components/features/checkout/CustomerInfoForm.tsx:62-68`

```typescript
<div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-4">
    <p>...<strong>Demo Mode:</strong>...</p>
</div>
```

Không có cách để tắt khi deploy production. Cần feature flag hoặc env variable.

---

### 13. Inconsistent Type Safety trong getStatusConfig

**File:** `src/components/features/checkout/OrderConfirmation.tsx:15-68`

```typescript
function getStatusConfig(status: OrderStatus) {
    switch (status) {
        // ...
        default:
            return {
                variant: "secondary" as const,
                label: status, // Return raw status nếu không match
```

Nếu backend thêm status mới, UI sẽ hiển thị technical string như "REFUND_PENDING" thay vì human-readable text.

---

### 14. No Form Reset on Error

**File:** `src/app/checkout/page.tsx:60-67`

Khi order fail, form vẫn giữ nguyên state. Nên có option reset hoặc ít nhất scroll to error message.

---

## Low Severity / Style Issues

### 15. Không có Error Boundary

Nếu `OrderConfirmation` component throw error, entire page crash. Cần wrap trong Error Boundary.

### 16. Missing Accessibility

- Form fields thiếu `aria-describedby` cho error messages
- Error alerts thiếu `role="alert"`
- Loading states thiếu `aria-busy`
- Buttons trong loading state thiếu `aria-disabled`

### 17. No Analytics/Tracking Events

Checkout flow là critical path. Cần tracking cho:
- Checkout started
- Form validation errors
- Order submission attempt
- Order success/failure

### 18. Long Tailwind Class Strings

```typescript
className="mb-6 p-4 bg-destructive/10 border border-destructive/20 rounded-lg flex items-start gap-3"
```

Khó maintain. Cân nhắc dùng `cva` (class-variance-authority) hoặc tách ra CSS modules.

### 19. cancelOrder API Design Issue

**File:** `src/lib/api/orders.ts:18-19`

```typescript
cancelOrder: (id: string, reason?: string) =>
    apiClient.post<Order>(`${BASE_URL}/api/orders/${id}/cancel${reason ? `?reason=${encodeURIComponent(reason)}` : ''}`),
```

`reason` nên được truyền trong request body, không phải query param. Query params có length limit và visible trong logs.

---

## Summary

| Severity | Count | Status |
|----------|-------|--------|
| Critical | 4 | **MUST FIX** |
| High | 5 | Should fix before merge |
| Medium | 5 | Nice to have |
| Low | 5 | Future improvement |

---

## Những điểm làm tốt

1. **Hydration handling** cho Zustand store được implement đúng cách
2. **TypeScript types** được định nghĩa rõ ràng và consistent
3. **Zod validation schema** clean và đủ dùng
4. **Component structure** tách biệt tốt (Layout, Form, Summary, Confirmation)
5. **React Query** được sử dụng đúng pattern với proper cache invalidation
6. **Barrel exports** trong index.ts giúp import clean
7. **Skeleton loading** có thoughtful layout matching actual content
8. **Auto-refetch** cho transitional order states là smart feature

---

## Action Items (Theo priority)

- [x] Fix idempotency key logic NGAY *(Fixed in Round 2)*
- [x] Fix index as key issue *(Fixed in Round 2)*
- [x] Dùng enum thay vì string literal cho OrderStatus *(Fixed in Round 2)*
- [x] Add validation check trước khi submit *(Fixed in Round 2)*
- [ ] Extract duplicate skeleton component
- [ ] Add empty state handling cho CheckoutSummary
- [ ] Add request timeout
- [ ] Extract magic numbers thành constants
- [ ] Add Error Boundary
- [ ] Improve accessibility

---

## Reviewer Notes

Code structure và patterns nhìn chung tốt, nhưng idempotency bug là **critical** và cần fix trước khi deploy. Đây là lỗi logic business quan trọng, không phải lỗi UI.

---

## Follow-up

- **Round 2 Review:** [PHASE4_CODE_REVIEW_ROUND2.md](./PHASE4_CODE_REVIEW_ROUND2.md) - Review lại sau khi fix các critical issues
