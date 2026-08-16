import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { favoritesReducer } from './store/slices/favorites';
import FavoriteIcon from './FavoriteIcon';

function renderWithStore(ui) {
    const store = configureStore({ reducer: { favorites: favoritesReducer } });
    return render(<Provider store={store}>{ui}</Provider>);
}

const movie = {
    id: 42,
    title: 'Dune',
    poster_path: '/poster.jpg',
    release_date: '2021-10-22',
    vote_average: 8,
    vote_count: 1000,
    overview: 'A desert planet.',
};

describe('FavoriteIcon', () => {
    it('starts as an outline heart when not favorited', () => {
        renderWithStore(<FavoriteIcon movie={movie} id={movie.id} category="movies" />);
        expect(document.getElementById(`favicon${movie.id}`)).toHaveClass('bi-heart');
    });

    it('fills the heart on click and empties it on a second click', async () => {
        const user = userEvent.setup();
        renderWithStore(<FavoriteIcon movie={movie} id={movie.id} category="movies" />);
        const button = screen.getByRole('button');

        await user.click(button);
        expect(document.getElementById(`favicon${movie.id}`)).toHaveClass('bi-heart-fill');

        await user.click(button);
        expect(document.getElementById(`favicon${movie.id}`)).toHaveClass('bi-heart');
    });
});
