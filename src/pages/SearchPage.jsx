import { useEffect, useRef, useState } from "react";
import axiosInstance from "../apis/config";
import Search from "../components/Search";
import { useParams } from "react-router";
import MovieCard from "../components/MovieCard";
import PageIcon from "../components/PageIcon";
export default function SearchPage(){
    const [movies, setMovies] = useState([]);
    const [shows, setShows] = useState([]);
    const [moviesPage, setMoviesPages] = useState(1);
    const [moviesTotalPages, setMoviesTotalPages] = useState(1);
    const [showsPage, setShowsPages] = useState(1);
    const [showsTotalPages, setShowsTotalPages] = useState(1);
    const params = useParams();
    const search = params.search;
    const moviesTitleRef = useRef(null);
    const showsTitleRef = useRef(null);

    useEffect(() =>{
        Promise.all([
        axiosInstance.get(`search/movie?api_key=${import.meta.env.VITE_API_KEY}&query=${search}&page=${moviesPage}`),
        axiosInstance.get(`search/tv?api_key=${import.meta.env.VITE_API_KEY}&query=${search}&page=${showsPage}`)])
        .then(([movies, shows]) => {
            setMovies(movies.data.results);
            setShows(shows.data.results);
            setMoviesTotalPages(movies.data.total_pages);
            setShowsTotalPages(shows.data.total_pages);
        })
        .catch(err => console.log(err));
        
    },[search, moviesPage, showsPage]);

    const moveToMovieTitle = () => {
        moviesTitleRef.current.scrollIntoView({ behavior: 'smooth' });
    }

    const changeMoviesPage = (c) => {
        setMoviesPages(c);
        moveToMovieTitle();

    }
    const prevMoviesPage = () => {
        setMoviesPages(moviesPage - 1);
        moveToMovieTitle();
    }
    const nextMoviesPage = () => {
        setMoviesPages(moviesPage + 1);
        moveToMovieTitle();
    }


    const moveToShowTitle = () => {
        showsTitleRef.current.scrollIntoView({ behavior: 'smooth' });
    }
    const changeShowsPage = (current) => {
        setShowsPages(current);
        moveToShowTitle();
    }
    const prevShowsPage = () => {
        setShowsPages(showsPage - 1);
        moveToShowTitle();
    }
    const nextShowsPage = () => {
        setShowsPages(showsPage + 1);
        moveToShowTitle();
    }
    
    
    return(
        <div className="py-5">
            <Search searchValue={`${search}`}/>
            <div className="mb-4 ms-5">
                <h4 className="inter-600 d-inline me-3">Search results for: </h4> <span>{search}</span>
            </div>
            <div className="row row-cols-2 g-4 mx-3">
                <h4 ref={moviesTitleRef} className="w-100 inter-500 py-3 px-5">Movies</h4>
            {
                movies.map(result => (
                    <MovieCard movie={result} category={'movies'} key={result.id} />
                ))
            }
            <div className="w-100 d-flex justify-content-center align-items-center py-3">
                <button className={`btn px-3 mx-3 ${moviesPage === 1 ? 'disabled btn-dark' : 'btn-outline-dark'}`} onClick={prevMoviesPage}><i className="bi bi-chevron-left"></i></button>
                {[...Array(5)].map((__, i) =>{
                    const current = moviesPage + i;
                    return(
                        <PageIcon current={current} page={moviesPage} totalPages={moviesTotalPages} changePage={changeMoviesPage} key={i}/>
                    )
                }
                )}
                <button className={`btn px-3 mx-3 ${moviesPage === moviesTotalPages ? 'disabled btn-dark' : 'btn-outline-dark'}`} onClick={nextMoviesPage}><i className="bi bi-chevron-right"></i></button>
            </div>
            </div>
            <div className="row row-cols-2 g-4 mx-3">
                <h4 ref={showsTitleRef} className="w-100 inter-500 py-3 px-5">TV Shows</h4>
            {
                shows.map(result => (
                    <MovieCard movie={result} category={'shows'} key={result.id} />
                ))
            }
            <div className="w-100 d-flex justify-content-center align-items-center py-3">
                <button className={`btn px-3 mx-3 ${showsPage === 1 ? 'disabled btn-dark' : 'btn-outline-dark'}`} onClick={prevShowsPage}><i className="bi bi-chevron-left"></i></button>
                {[...Array(5)].map((__, i) =>{
                    const current = showsPage + i;
                    return(
                        <PageIcon current={current} page={showsPage} totalPages={showsTotalPages} changePage={changeShowsPage} key={i}/>
                    )
                }
                )}
                <button className={`btn px-3 mx-3 ${showsPage === showsTotalPages ? 'disabled btn-dark' : 'btn-outline-dark'}`} onClick={nextShowsPage}><i className="bi bi-chevron-right"></i></button>
            </div>
            </div>
        </div>
    )
}