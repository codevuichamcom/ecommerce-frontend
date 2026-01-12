export enum PaymentStatus {
    PENDING = 'PENDING',
    COMPLETED = 'COMPLETED',
    FAILED = 'FAILED',
    REFUNDED = 'REFUNDED',
}

export enum PaymentMethod {
    CREDIT_CARD = 'CREDIT_CARD',
    PAYPAL = 'PAYPAL',
    BANK_TRANSFER = 'BANK_TRANSFER',
    CASH_ON_DELIVERY = 'CASH_ON_DELIVERY',
}

export interface Payment {
    id: string;
    orderId: string;
    customerId: string;
    amount: number;
    currency: string;
    paymentMethod: PaymentMethod;
    status: PaymentStatus;
    transactionId: string;
    failureReason?: string;
    createdAt: string;
    completedAt?: string;
}
