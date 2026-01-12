export enum OrderStatus {
    PENDING = 'PENDING',
    CREATED = 'CREATED',
    INVENTORY_RESERVED = 'INVENTORY_RESERVED',
    PAYMENT_COMPLETED = 'PAYMENT_COMPLETED',
    COMPLETED = 'COMPLETED',
    CANCELLED = 'CANCELLED',
    PAYMENT_FAILED = 'PAYMENT_FAILED',
    STOCK_CONFIRMATION_FAILED = 'STOCK_CONFIRMATION_FAILED',
}

export interface OrderItem {
    productId: string;
    productName: string;
    quantity: number;
    unitPrice: number;
    subtotal: number;
}

export interface Order {
    id: string;
    customerId: string;
    items: OrderItem[];
    status: OrderStatus;
    totalAmount: number;
    currency: string;
    totalItems: number;
    createdAt: string;
    updatedAt: string;
}

export interface OrderItemRequest {
    productId: string;
    quantity: number;
}

export interface CreateOrderCommand {
    customerId: string;
    items: OrderItemRequest[];
}
