import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import LanguageProvider from '../context/LanguageContext';
import MovieTrailer from './MovieTrailer';

function renderTrailer(videos) {
    return render(
        <LanguageProvider>
            <MovieTrailer videos={videos}/>
        </LanguageProvider>
    );
}

describe('MovieTrailer', () => {
    it('renders nothing when there is no YouTube trailer or teaser', () => {
        expect(renderTrailer(undefined).container).toBeEmptyDOMElement();
        expect(renderTrailer([]).container).toBeEmptyDOMElement();
        expect(renderTrailer([{ site: 'YouTube', type: 'Clip', key: 'abc' }]).container).toBeEmptyDOMElement();
        expect(renderTrailer([{ site: 'Vimeo', type: 'Trailer', key: 'abc' }]).container).toBeEmptyDOMElement();
    });

    it('embeds the trailer, preferring type Trailer over Teaser', () => {
        const videos = [
            { site: 'YouTube', type: 'Teaser', key: 'teaser-key', name: 'Teaser' },
            { site: 'YouTube', type: 'Trailer', key: 'trailer-key', name: 'Official Trailer' },
        ];
        const { container } = renderTrailer(videos);
        const iframe = container.querySelector('iframe');
        expect(iframe).toHaveAttribute('src', expect.stringContaining('trailer-key'));
    });

    it('falls back to a Teaser when no Trailer is available', () => {
        const videos = [{ site: 'YouTube', type: 'Teaser', key: 'teaser-key', name: 'Teaser' }];
        const { container } = renderTrailer(videos);
        const iframe = container.querySelector('iframe');
        expect(iframe).toHaveAttribute('src', expect.stringContaining('teaser-key'));
    });
});
