import CardImage from "./CardImage";
import FavoriteIcon from "./FavoriteIcon";
import Rating from "./Rating";
import { Link, useNavigate } from "react-router";
export default function WatchlistCard({movie,id}){
    console.log(movie);
    const navigate = useNavigate();
    const fullStars = parseInt(Math.floor(movie.vote_average/2));
    const halfStars = (movie.vote_average/2) % 1 >= 0.5 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStars;
    const navigateToDetails = (id) => {
        navigate(`/moviedetails/${id}`);
    }
    return(
    <>
        <div className="d-flex flex-col col-lg-5 shadow-sm mx-3">
            
                <div className="card d-flex flex-row p-2 border-0 col-4" onClick={() => navigateToDetails(id)} style={{ cursor: 'pointer'}}>
                    <CardImage poster_path={movie.poster_path}/>
                </div>


            <div className="col-8 mt-3 ms-3">
                <div className="d-flex justify-content-between align-items-evenly">
                <Link to={`/moviedetails/${id}`} className="text-decoration-none text-reset">
                    <h6 className="inter-700 fs-1">{movie.title}</h6>
                </Link>
                    <span className="me-3">
                        <FavoriteIcon movie={movie} id={id}/>
                    </span>
                </div>
                <div className="d-inline">
                    <Link to={`/moviedetails/${id}`} className="text-decoration-none text-reset">
                        <Rating fullStars={fullStars} halfStars={halfStars} emptyStars={emptyStars}/>
                    </Link>
                    <span className="ms-3 ">{movie.vote_count}</span>
                </div>
                <Link to={`/moviedetails/${id}`} className="text-decoration-none text-reset">
                    <p className="mt-3">{movie.overview}</p>
                </Link>
            </div>
        
        </div>
    </>)
}