import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { favoritesReducer } from '../components/store/slices/favorites';
import LanguageProvider from '../context/LanguageContext';
import axiosInstance from '../apis/config';
import ActorPage from './ActorPage';

vi.mock('../apis/config');
// jsdom has no canvas, which the Lottie spinner needs; irrelevant to what this test covers.
vi.mock('./Loading', () => ({ default: () => null }));

function renderActorPage() {
    const store = configureStore({ reducer: { favorites: favoritesReducer } });
    return render(
        <Provider store={store}>
            <MemoryRouter initialEntries={['/actor/1']}>
                <LanguageProvider>
                    <ActorPage/>
                </LanguageProvider>
            </MemoryRouter>
        </Provider>
    );
}

describe('ActorPage', () => {
    it('dedupes credits for the same show (an actor can have multiple roles/episodes in one series)', async () => {
        axiosInstance.get.mockResolvedValue({
            data: {
                name: 'Test Actor',
                combined_credits: {
                    cast: [
                        { id: 42, media_type: 'tv', name: 'Some Show', poster_path: '/a.jpg', popularity: 10, character: 'Role A' },
                        { id: 42, media_type: 'tv', name: 'Some Show', poster_path: '/a.jpg', popularity: 10, character: 'Role B' },
                        { id: 7, media_type: 'movie', title: 'Some Movie', poster_path: '/b.jpg', popularity: 5 },
                    ],
                },
            },
        });

        renderActorPage();

        await waitFor(() => expect(screen.getByText('Test Actor')).toBeInTheDocument());

        // Each MovieCard renders two <a> tags to the same href (poster link + title link),
        // so 2 links = one card; 4 would mean the duplicate credit rendered a second card.
        const showLinks = screen.getAllByRole('link').filter(a => a.getAttribute('href') === '/moviedetails/42/shows');
        const movieLinks = screen.getAllByRole('link').filter(a => a.getAttribute('href') === '/moviedetails/7/movies');
        expect(showLinks).toHaveLength(2);
        expect(movieLinks).toHaveLength(2);
    });
});
