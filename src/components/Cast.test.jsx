import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import LanguageProvider from '../context/LanguageContext';
import Cast from './Cast';

function renderCast(cast) {
    return render(
        <MemoryRouter>
            <LanguageProvider>
                <Cast cast={cast}/>
            </LanguageProvider>
        </MemoryRouter>
    );
}

describe('Cast', () => {
    it('renders nothing when there is no cast', () => {
        expect(renderCast(undefined).container).toBeEmptyDOMElement();
        expect(renderCast([]).container).toBeEmptyDOMElement();
    });

    it('renders actors sorted by billing order with links to their actor page', () => {
        const cast = [
            { id: 2, name: 'Second Actor', character: 'Sidekick', profile_path: null, order: 1 },
            { id: 1, name: 'First Actor', character: 'Hero', profile_path: null, order: 0 },
        ];
        renderCast(cast);

        const names = screen.getAllByText(/Actor$/).map(el => el.textContent);
        expect(names).toEqual(['First Actor', 'Second Actor']);

        const links = screen.getAllByRole('link');
        expect(links[0]).toHaveAttribute('href', '/actor/1');
        expect(links[1]).toHaveAttribute('href', '/actor/2');
    });

    it('caps the list at 12 cast members', () => {
        const cast = Array.from({ length: 20 }, (__, i) => ({
            id: i,
            name: `Actor ${i}`,
            character: `Character ${i}`,
            profile_path: null,
            order: i,
        }));
        renderCast(cast);

        expect(screen.getAllByRole('link')).toHaveLength(12);
    });
});
