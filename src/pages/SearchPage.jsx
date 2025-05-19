import { useEffect, useState } from "react";
import axiosInstance from "../apis/config";
import Search from "../components/Search";
import { useParams } from "react-router";
import MovieCard from "../components/MovieCard";

export default function SearchPage(){
    const [searchResults, setSearchResults] = useState([]);
    const params = useParams();
    const search = params.search;
    useEffect(() =>{
        axiosInstance.get(`search/movie?api_key=${import.meta.env.VITE_API_KEY}&query=${search}`)
        .then(res => setSearchResults(res.data.results))
        .catch(err => console.log(err));
        console.log(searchResults);
    },[search]);
    return(
        <div className="py-5">
            <Search searchValue={`${search}`}/>
            <div className="mb-4 ms-5">
                <h4 className="inter-600 d-inline me-3">Search results for: </h4> <span>{search}</span>
            </div>
            <div className="row row-cols-2 g-4 mx-3">
            {
                searchResults.map(result => (
                    <MovieCard movie={result} key={result.id} />
                ))
            }
            </div>
        </div>
    )
}