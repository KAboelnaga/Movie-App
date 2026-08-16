import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Ratings from './Ratings';

describe('Ratings', () => {
    it('renders nothing when no source has a positive rating', () => {
        const { container } = render(<Ratings tmdb={0} imdb={null} rottenTomatoes={undefined}/>);
        expect(container).toBeEmptyDOMElement();
    });

    it('renders only the TMDB badge when only a TMDB rating is available', () => {
        render(<Ratings tmdb={8.4} voteCount={1000}/>);
        expect(screen.getByText('TMDB')).toBeInTheDocument();
        expect(screen.queryByText('IMDb')).not.toBeInTheDocument();
        expect(screen.queryByText('🍅 Rotten Tomatoes')).not.toBeInTheDocument();
        expect(screen.getByText('1000 votes')).toBeInTheDocument();
    });

    it('renders all three badges when all sources are available', () => {
        render(<Ratings tmdb={8.4} voteCount={1000} imdb={8.8} imdbVotes="2,000" rottenTomatoes={81}/>);
        expect(screen.getByText('TMDB')).toBeInTheDocument();
        expect(screen.getByText('IMDb')).toBeInTheDocument();
        expect(screen.getByText('🍅 Rotten Tomatoes')).toBeInTheDocument();
        expect(screen.getByText('2,000 votes')).toBeInTheDocument();
    });
});
