import RatingCircle from "./RatingCircle";

const badgeStyle = {
    fontSize: '11px',
    fontWeight: 700,
    padding: '2px 8px',
    borderRadius: '4px',
    display: 'inline-block',
    letterSpacing: '0.02em',
};

export default function Ratings({ tmdb, voteCount, imdb, imdbVotes, rottenTomatoes }) {
    if (!(tmdb > 0) && !(imdb > 0) && !(rottenTomatoes > 0)) return null;

    return (
        <div className="d-flex align-items-start flex-wrap gap-4 my-3">
            {tmdb > 0 &&
                <div className="text-center">
                    <RatingCircle percent={tmdb * 10} size={60}/>
                    <div className="mt-2">
                        <span style={{ ...badgeStyle, backgroundColor: '#01b4e4', color: '#fff' }}>TMDB</span>
                    </div>
                    <p className="mb-0 mt-1 text-muted" style={{ fontSize: '11px' }}>{voteCount > 0 ? `${voteCount} votes` : ' '}</p>
                </div>
            }
            {imdb > 0 &&
                <div className="text-center">
                    <RatingCircle percent={imdb * 10} size={60}/>
                    <div className="mt-2">
                        <span style={{ ...badgeStyle, backgroundColor: '#F5C518', color: '#000' }}>IMDb</span>
                    </div>
                    <p className="mb-0 mt-1 text-muted" style={{ fontSize: '11px' }}>{imdbVotes ? `${imdbVotes} votes` : ' '}</p>
                </div>
            }
            {rottenTomatoes > 0 &&
                <div className="text-center">
                    <RatingCircle percent={rottenTomatoes} size={60}/>
                    <div className="mt-2">
                        <span style={{ ...badgeStyle, backgroundColor: '#FA320A', color: '#fff' }}>🍅 Rotten Tomatoes</span>
                    </div>
                    <p className="mb-0 mt-1 text-muted" style={{ fontSize: '11px' }}>{' '}</p>
                </div>
            }
        </div>
    );
}
