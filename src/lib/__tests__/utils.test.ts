import { cn, formatCurrency } from '../utils'

describe('utils', () => {
    describe('cn', () => {
        it('should merge class names correctly', () => {
            expect(cn('a', 'b')).toBe('a b')
            expect(cn('a', { b: true, c: false })).toBe('a b')
            expect(cn('text-red-500', 'text-blue-500')).toBe('text-blue-500') // tailwind-merge test
        })
    })

    describe('formatCurrency', () => {
        it('should format currency for USD correctly', () => {
            expect(formatCurrency(100, 'USD')).toMatch(/\$100\.00/)
        })

        it('should format currency for VND correctly', () => {
            // Note: VND format might vary slightly by environment, using match to be safe
            expect(formatCurrency(100000, 'VND')).toMatch(/₫/)
        })

        it('should use USD as default', () => {
            expect(formatCurrency(50)).toMatch(/\$50\.00/)
        })
    })
})
