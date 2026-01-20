import { formatCurrency, generateIdempotencyKey, cn } from '../utils';

describe('utils', () => {
    describe('formatCurrency', () => {
        it('formats numbers as USD by default', () => {
            expect(formatCurrency(100)).toBe('$100.00');
            expect(formatCurrency(1234.56)).toBe('$1,234.56');
        });

        it('formats numbers with custom currency', () => {
            // Note: outcome might vary slightly by locale in CI, but usually it's consistent for USD
            expect(formatCurrency(100, 'EUR')).toContain('100.00');
        });
    });

    describe('generateIdempotencyKey', () => {
        it('generates a string with timestamp and random part', () => {
            const key = generateIdempotencyKey();
            expect(typeof key).toBe('string');
            expect(key).toMatch(/^\d+-[a-z0-9]+$/);
        });

        it('generates unique keys', () => {
            const key1 = generateIdempotencyKey();
            const key2 = generateIdempotencyKey();
            expect(key1).not.toBe(key2);
        });
    });

    describe('cn', () => {
        it('merges tailwind classes correctly', () => {
            expect(cn('btn', 'btn-primary')).toBe('btn btn-primary');
            expect(cn('px-2 py-2', 'p-4')).toBe('p-4');
        });
    });
});
