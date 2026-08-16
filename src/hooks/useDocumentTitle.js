import { useEffect } from 'react';

export default function useDocumentTitle(title) {
    useEffect(() => {
        document.title = title ? `${title} · Movie App` : 'Movie App';
    }, [title]);
}
