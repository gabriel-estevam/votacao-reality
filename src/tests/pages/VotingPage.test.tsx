import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import VotingPage from '../../pages/VotingPage';
import '@testing-library/jest-dom';

describe('VotingPage', () => {
    it('should render all participant cards correctly', () => {
        render(<VotingPage />, { wrapper: MemoryRouter });

        expect(screen.getByText('Alane')).toBeInTheDocument();
        expect(screen.getByText('Beatriz')).toBeInTheDocument();
        expect(screen.getByText('Raquele')).toBeInTheDocument();
    });

    it('should allow voting and display the selected participant name after vote', () => {
        render(<VotingPage />, { wrapper: MemoryRouter });

        // Select "Beatriz"
        const beatrizCard = screen.getByText('Beatriz');
        fireEvent.click(beatrizCard);

        // Confirm vote
        const confirmButton = screen.getByRole('button', { name: /Confirmar Voto/i });
        fireEvent.click(confirmButton);

        // Expect confirmation section to appear with correct name
        expect(screen.getByText(/Seu voto/i)).toBeInTheDocument();
        expect(screen.getByText('Beatriz')).toBeInTheDocument();
    });
});
