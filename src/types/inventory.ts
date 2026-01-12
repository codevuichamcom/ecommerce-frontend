export interface Inventory {
    id: string;
    productId: string;
    availableQuantity: number;
    reservedQuantity: number;
    totalQuantity: number;
    createdAt: string;
    updatedAt: string;
}

export interface StockOperationResponse {
    success: boolean;
    message: string;
    productId: string;
    quantity: number;
}
