export enum ProductStatus {
    DRAFT = 'DRAFT',
    ACTIVE = 'ACTIVE',
    DEACTIVATED = 'DEACTIVATED',
    DISCONTINUED = 'DISCONTINUED',
}

export interface Product {
    id: string;
    name: string;
    description: string;
    sku: string;
    price: number;
    currency: string;
    status: ProductStatus;
    available: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface CreateProductCommand {
    name: string;
    description?: string;
    sku: string;
    price: number;
}

export interface UpdateProductCommand {
    name: string;
    description?: string;
    price: number;
}
