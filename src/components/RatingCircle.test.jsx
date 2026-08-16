import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import RatingCircle from './RatingCircle';

describe('RatingCircle', () => {
    it('renders nothing when percent is missing, null, or zero', () => {
        expect(render(<RatingCircle/>).container).toBeEmptyDOMElement();
        expect(render(<RatingCircle percent={null}/>).container).toBeEmptyDOMElement();
        expect(render(<RatingCircle percent={0}/>).container).toBeEmptyDOMElement();
    });

    it('renders the rounded percent value', () => {
        const { getByText } = render(<RatingCircle percent={78.6}/>);
        expect(getByText('79')).toBeInTheDocument();
    });

    it('clamps values above 100 down to 100', () => {
        const { getByText } = render(<RatingCircle percent={150}/>);
        expect(getByText('100')).toBeInTheDocument();
    });

    it('clamps negative values down to 0 and still renders (edge case only reached above the >0 guard)', () => {
        const { container } = render(<RatingCircle percent={-5}/>);
        expect(container).toBeEmptyDOMElement();
    });
});
