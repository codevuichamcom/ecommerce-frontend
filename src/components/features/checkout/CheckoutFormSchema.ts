import { z } from 'zod';

/**
 * Checkout form validation schema.
 * For demo purposes, only Customer ID is required.
 * In a real application, this would include shipping address, payment info, etc.
 */
export const checkoutFormSchema = z.object({
    customerId: z
        .string()
        .trim()
        .min(1, 'Customer ID is required')
        .max(100, 'Customer ID is too long')
        .regex(/^[a-zA-Z0-9_-]+$/, 'Customer ID can only contain letters, numbers, underscores, and hyphens'),
});

export type CheckoutFormData = z.infer<typeof checkoutFormSchema>;
