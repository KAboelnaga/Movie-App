import Title from "../components/Title";
import axiosInstance from "../apis/config";
import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";
export default function Home(){
    const page = 1;
    const [movies, setMovies] = useState([]);
    
    useEffect(() =>{
        axiosInstance.get(`/movie/now_playing?api_key=${import.meta.env.VITE_API_KEY}&page=${page}&limit=12`)
        .then(response => setMovies(Array.isArray(response.data?.results) ? response.data.results : []))
        .catch(error => console.log(error))
    },[page]);
    
    return(
        <>
        <Title />
        <h2 className="inter-700 py-5 mx-4">Now Playing</h2>
        <div className="row row-cols-2 g-4 mx-3">
            {movies.map((movie) => (
             <MovieCard movie={movie} key={movie.id}/>
            ))
            }
        </div>
        </>
    )
}