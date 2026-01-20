import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { CustomerInfoForm } from '../CustomerInfoForm';
import '@testing-library/jest-dom';

describe('CustomerInfoForm', () => {
    const mockOnSubmit = jest.fn();

    beforeEach(() => {
        mockOnSubmit.mockClear();
    });

    it('renders the form correctly', () => {
        render(<CustomerInfoForm onSubmit={mockOnSubmit} />);
        
        expect(screen.getByLabelText(/Customer ID/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Place Order/i })).toBeInTheDocument();
    });

    it('shows validation error when customerId is empty', async () => {
        render(<CustomerInfoForm onSubmit={mockOnSubmit} />);
        
        const submitButton = screen.getByRole('button', { name: /Place Order/i });
        fireEvent.click(submitButton);

        expect(await screen.findByText(/Customer ID is required/i)).toBeInTheDocument();
        expect(mockOnSubmit).not.toHaveBeenCalled();
    });

    it('submits the form with valid data', async () => {
        render(<CustomerInfoForm onSubmit={mockOnSubmit} />);
        
        const input = screen.getByLabelText(/Customer ID/i);
        fireEvent.change(input, { target: { value: 'customer-123' } });
        
        const form = screen.getByRole('form', { hidden: true }); // Form might not have role by default
        fireEvent.submit(form);

        await waitFor(() => {
            expect(mockOnSubmit).toHaveBeenCalledWith(
                expect.objectContaining({ customerId: 'customer-123' }),
                expect.anything()
            );
        });
    });

    it('disables the button when loading', () => {
        render(<CustomerInfoForm onSubmit={mockOnSubmit} isLoading={true} />);
        
        const submitButton = screen.getByRole('button', { name: /Processing Order.../i });
        expect(submitButton).toBeDisabled();
    });
});
