import FavoriteIcon from "./FavoriteIcon";

export default function MovieCard({movie}){
    
    return(
        <>
            <div className="col-lg-2">
                <div className="card">
                <img src={`${import.meta.env.VITE_IMAGE_BASE_URL}/${movie.poster_path}`} className="card-img-fluid rounded-1" alt="..."/>
                </div>
                {/* <CircularRating percentage={75} /> */}
                <div className="d-flex justify-content-between">
                    <div>
                        <h5 className="card-title fs-bold">{movie.title}</h5>
                        <h6 className="text-muted">{movie.release_date}</h6>
                    </div>
                    <FavoriteIcon movie={movie}/>
                </div>
            </div>
        </>
    )
}