import { useEffect, useRef, useState } from "react";
import axiosInstance from "../apis/config";
import { motion as Motion } from "motion/react";
import Search from "../components/Search";
import { useParams } from "react-router";
import MovieCard from "../components/MovieCard";
import Pages from "../components/Pages";
import { staggerContainer } from "../components/motionVariants";
import Loading from "./Loading";
import useDocumentTitle from "../hooks/useDocumentTitle";
export default function SearchPage(){
    const [movies, setMovies] = useState([]);
    const [shows, setShows] = useState([]);
    const [moviesPage, setMoviesPages] = useState(1);
    const [moviesTotalPages, setMoviesTotalPages] = useState(1);
    const [showsPage, setShowsPages] = useState(1);
    const [showsTotalPages, setShowsTotalPages] = useState(1);
    const [error, setError] = useState(false);
    const [loaded, setLoaded] = useState(false);
    const [retryKey, setRetryKey] = useState(0);
    const params = useParams();
    const search = params.search;
    const moviesTitleRef = useRef(null);
    const showsTitleRef = useRef(null);
    useDocumentTitle(`Search: ${search}`);

    useEffect(() =>{
        setError(false);
        setLoaded(false);
        Promise.all([
        axiosInstance.get(`/search/movie?query=${search}&page=${moviesPage}`),
        axiosInstance.get(`/search/tv?query=${search}&page=${showsPage}`)])
        .then(([movies, shows]) => {
            setMovies(movies.data.results);
            setShows(shows.data.results);
            setMoviesTotalPages(movies.data.total_pages);
            setShowsTotalPages(shows.data.total_pages);
            setLoaded(true);
        })
        .catch(err => {
            console.log(err);
            setError(true);
        });

    },[search, moviesPage, showsPage, retryKey]);

    const moveToMovieTitle = () => {
        moviesTitleRef.current.scrollIntoView({ behavior: 'smooth' });
    }

    const changeMoviesPage = (c) => {
        setMoviesPages(c);
        moveToMovieTitle();

    }



    const moveToShowTitle = () => {
        showsTitleRef.current.scrollIntoView({ behavior: 'smooth' });
    }
    const changeShowsPage = (current) => {
        setShowsPages(current);
        moveToShowTitle();
    }

    
    
    return(
        <div className="py-5 min-vh-100">
            <Search searchValue={`${search}`}/>
            <div className="mb-4 ms-5">
                <h4 className="inter-600 d-inline me-3">Search results for: </h4> <span>{search}</span>
            </div>
            {error &&
                <div className="text-center py-5">
                    <p className="text-muted">Something went wrong loading search results.</p>
                    <button className="btn btn-yellow" onClick={() => setRetryKey(k => k + 1)}>Retry</button>
                </div>
            }
            {!error && !loaded && <Loading/>}
            {!error && loaded && movies.length === 0 && shows.length === 0 &&
                <div className="text-center py-5">
                    <p className="text-muted">No results found for "{search}".</p>
                </div>
            }
            {!error && loaded && movies.length > 0 &&
                <Motion.div className="row row-cols-2 g-4 mx-3" initial="hidden" animate="visible" variants={staggerContainer}>
                    <h4 ref={moviesTitleRef} className="w-100 inter-500 py-3 px-5">Movies</h4>
                {
                    movies.map(result => (
                        <MovieCard movie={result} category={'movies'} key={result.id} />
                    ))
                }
                <Pages start={moviesPage - 2} page={moviesPage} totalPages={moviesTotalPages} handlePageChange={changeMoviesPage}/>
                </Motion.div>
            }
            {!error && loaded && shows.length > 0 &&
                <Motion.div className="row row-cols-2 g-4 mx-3" initial="hidden" animate="visible" variants={staggerContainer}>
                    <h4 ref={showsTitleRef} className="w-100 inter-500 py-3 px-5">TV Shows</h4>
                {
                    shows.map(result => (
                        <MovieCard movie={result} category={'shows'} key={result.id} />
                    ))
                }
                <Pages start={showsPage - 2} page={showsPage} totalPages={showsTotalPages} handlePageChange={changeShowsPage}/>
                </Motion.div>
            }
        </div>
    )
}