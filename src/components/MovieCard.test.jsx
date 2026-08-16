import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { favoritesReducer } from './store/slices/favorites';
import MovieCard from './MovieCard';

function renderCard(movie, category) {
    const store = configureStore({ reducer: { favorites: favoritesReducer } });
    return render(
        <Provider store={store}>
            <MemoryRouter>
                <MovieCard movie={movie} category={category} />
            </MemoryRouter>
        </Provider>
    );
}

describe('MovieCard', () => {
    it('renders a movie title, release date, and details link', () => {
        const movie = { id: 1, title: 'Dune', release_date: '2021-10-22', poster_path: '/poster.jpg' };
        renderCard(movie, 'movies');

        expect(screen.getAllByText('Dune').length).toBeGreaterThan(0);
        expect(screen.getAllByText('2021-10-22').length).toBeGreaterThan(0);
        const links = screen.getAllByRole('link');
        expect(links[0]).toHaveAttribute('href', '/moviedetails/1/movies');
    });

    it('renders a TV show name for the shows category', () => {
        const show = { id: 2, name: 'Arcane', first_air_date: '2021-11-06', poster_path: '/poster.jpg' };
        renderCard(show, 'shows');

        expect(screen.getAllByText('Arcane').length).toBeGreaterThan(0);
    });
});
