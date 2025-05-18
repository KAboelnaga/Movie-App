import { useEffect, useState } from 'react'
import axiosInstance from '../apis/config'
import { useParams } from 'react-router';
import CardImage from '../components/CardImage';
import Rating from '../components/Rating';
import MovieCard from '../components/MovieCard';

export default function MovieDetails(){
    const [movie, setmovie] = useState(null);
    const [recommendation, setRecommendation] = useState(null);
    const [fullStars, setFullStars] = useState(0);
    const [halfStars, setHalfStars] = useState(0);
    const [emptyStars, setEmptyStars] = useState(5);
    const { id } = useParams();

    useEffect(() => {
        Promise.all([
        axiosInstance.get(`/movie/${id}?api_key=${import.meta.env.VITE_API_KEY}`),
        axiosInstance.get(`/movie/${id}/recommendations?api_key=${import.meta.env.VITE_API_KEY}`)
        ])
        .then(([movie, recommendation]) => {
            setmovie(movie.data);
            setRecommendation(recommendation.data.results);
            }
            )
        .catch(error => console.log(error))
    }, [id]);

    useEffect(() => {
        if (movie && movie.vote_average !== undefined) {
            const rating = movie.vote_average / 2;
            const full = Math.floor(rating);
            const half = rating % 1 >= 0.5 ? 1 : 0;
            const empty = 5 - full - half;
            setFullStars(full);
            setHalfStars(half);
            setEmptyStars(empty);
        }
    }, [movie]);
    if (!movie) return <p>Loading...</p>;
        console.log(recommendation);
    return(
        <>
            <div className="row">
                <div className="col-12 col-lg-2 m-3">
                    <CardImage poster_path={movie.poster_path}/>
                </div>
                <div className="col-8 mt-3">
                    <h1 className="inter-700">{movie.title}</h1>
                    <p className="text-muted" style={{fontSize:'12px'}}>{movie.release_date}</p>
                    <Rating fullStars={fullStars} halfStars={halfStars} emptyStars={emptyStars} />
                    <span className="ms-3 ">{movie.vote_count}</span>
                    <p className='mt-4'>{movie.overview}</p>
                    {
                    movie?.genres?.map((genre) => (
                        <span className='bg-yellow rounded-4 me-4 p-2' key={genre.id}>
                            {genre.name}
                        </span>
                        
                    ))
                    }
                    <div className="d-block mt-3">
                    <p className='d-inline inter-600'>Duration:</p>
                    <span className='ms-3 inter-400 me-5'>{movie.runtime} Min.</span>
                    <span className='d-inline inter-600 me-3'> Languages:</span>
                    {
                        movie?.spoken_languages?.map((language) =>(
                            <span className='me-3 ' key={language.id}>
                                {language.name}
                            </span>
                        ))
                    }
                    </div>
                    <div className="my-3">
                        {
                            movie?.production_companies?.map((company) =>(
                                <img src={`${import.meta.env.VITE_IMAGE_BASE_URL}/${company.logo_path}`} className="card-img-fluid rounded-1 me-5 my-3" alt={company.name} key={company.id} style={{width: '200px'}}/>
                            ))
                        }
                    </div>
                </div>
                <h2 className='ms-3 inter-700'>Recommendations</h2>
                <div className="row row-cols-2 g-4 vw-100">
                        {
                    recommendation?.slice(0,6).map((rec) => (
                        <MovieCard movie={rec} key={rec.id}/>
                    ))
                }
                </div>
                
            </div>
        </>
    )
}
