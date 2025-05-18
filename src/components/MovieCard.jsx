import { Link } from "react-router";
import CardImage from "./CardImage";
import FavoriteIcon from "./FavoriteIcon";

export default function MovieCard({movie}){
    
    return(
        <>
            <div className="col-lg-2">
                <Link to={`/moviedetails/${movie.id}`} className="text-decoration-none text-reset">
                    <CardImage poster_path={movie.poster_path}/>
                </Link>
                {/* <CircularRating percentage={75} /> */}
                <div className="d-flex justify-content-between">
                    <div>
                        <Link to={`/moviedetails/${movie.id}`} className="text-decoration-none text-reset">
                            <h5 className="card-title fs-bold">{movie.title}</h5>
                        </Link>
                        <h6 className="text-muted">{movie.release_date}</h6>
                    </div>
                    <FavoriteIcon movie={movie} id={movie.id}/>
                </div>
            </div>
        </>
    )
}