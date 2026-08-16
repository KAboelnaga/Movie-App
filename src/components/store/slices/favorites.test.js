import { describe, it, expect } from 'vitest';
import { favoritesReducer, toggleFavorites, loadFavorites } from './favorites';

describe('favorites slice', () => {
    it('adds a movie to favorites when toggled and not already present', () => {
        const state = { movies: {} };
        const next = favoritesReducer(state, toggleFavorites({ id: 1, title: 'Dune' }));
        expect(next.movies[1]).toEqual({ title: 'Dune' });
    });

    it('removes a movie from favorites when toggled and already present', () => {
        const state = { movies: { 1: { title: 'Dune' } } };
        const next = favoritesReducer(state, toggleFavorites({ id: 1, title: 'Dune' }));
        expect(next.movies[1]).toBeUndefined();
    });

    it('replaces the favorites map on loadFavorites', () => {
        const state = { movies: { 1: { title: 'Dune' } } };
        const next = favoritesReducer(state, loadFavorites({ 2: { title: 'Arrival' } }));
        expect(next.movies).toEqual({ 2: { title: 'Arrival' } });
    });

    it('falls back to an empty object when loadFavorites receives no payload', () => {
        const state = { movies: { 1: { title: 'Dune' } } };
        const next = favoritesReducer(state, loadFavorites(undefined));
        expect(next.movies).toEqual({});
    });
});
