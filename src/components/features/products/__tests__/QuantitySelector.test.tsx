import { render, screen, fireEvent } from '@testing-library/react';
import { QuantitySelector } from '../QuantitySelector';
import '@testing-library/jest-dom';

jest.mock('lucide-react', () => ({
    Minus: () => <span>-</span>,
    Plus: () => <span>+</span>,
}));

describe('QuantitySelector', () => {
    const mockOnChange = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders current quantity', () => {
        render(<QuantitySelector quantity={5} onChange={mockOnChange} />);
        expect(screen.getByText('5')).toBeInTheDocument();
    });

    it('calls onChange with decremented value', () => {
        render(<QuantitySelector quantity={5} onChange={mockOnChange} />);
        const decBtn = screen.getByText('-');
        fireEvent.click(decBtn);
        expect(mockOnChange).toHaveBeenCalledWith(4);
    });

    it('calls onChange with incremented value', () => {
        render(<QuantitySelector quantity={5} onChange={mockOnChange} />);
        const incBtn = screen.getByText('+');
        fireEvent.click(incBtn);
        expect(mockOnChange).toHaveBeenCalledWith(6);
    });

    it('disables decrease button when quantity is 1', () => {
        render(<QuantitySelector quantity={1} onChange={mockOnChange} />);
        const decBtn = screen.getByText('-').closest('button');
        expect(decBtn).toBeDisabled();
    });

    it('does not call onChange when disabled', () => {
        render(<QuantitySelector quantity={5} onChange={mockOnChange} disabled />);
        const incBtn = screen.getByText('+');
        fireEvent.click(incBtn);
        expect(mockOnChange).not.toHaveBeenCalled();
    });
});
