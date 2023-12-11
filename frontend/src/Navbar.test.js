import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import NavBar from './Navbar'; 
import { useLocation } from 'react-router-dom';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'), // use actual for all non-hook parts
  useLocation: jest.fn(),
}));

describe('NavBar Component', () => {
  const mockLocation = {
    pathname: '/create-budget',
    // include other properties from location if needed
  };

  beforeEach(() => {
    useLocation.mockReturnValue(mockLocation);
  });

  it('renders the navbar with all links', () => {
    render(<NavBar />, { wrapper: MemoryRouter });
    expect(screen.getByText(/Dashboard/i)).toBeInTheDocument();
    expect(screen.getByText(/Create Budget/i)).toBeInTheDocument();
    expect(screen.getByText(/Add Expenses/i)).toBeInTheDocument();
    expect(screen.getByText(/Log Out/i)).toBeInTheDocument();
  });

  it('applies active style to the active link', () => {
    render(
      <MemoryRouter initialEntries={['/create-budget']}>
        <Routes>
            <Route path="/create-budget" element={<NavBar />} />
        </Routes>
</MemoryRouter>

    );

    const createBudgetLink = screen.getByText(/Create Budget/i);
    expect(createBudgetLink).toHaveClass('active');
  });
});
