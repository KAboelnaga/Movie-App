import CardImage from "./CardImage";
import FavoriteIcon from "./FavoriteIcon";

export default function MovieCard({movie}){
    
    return(
        <>
            <div className="col-lg-2">
                <CardImage poster_path={movie.poster_path}/>
                {/* <CircularRating percentage={75} /> */}
                <div className="d-flex justify-content-between">
                    <div>
                        <h5 className="card-title fs-bold">{movie.title}</h5>
                        <h6 className="text-muted">{movie.release_date}</h6>
                    </div>
                    <FavoriteIcon movie={movie} id={movie.id}/>
                </div>
            </div>
        </>
    )
}