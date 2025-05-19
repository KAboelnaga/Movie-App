import CardImage from "./CardImage"
export default function SeasonCard({season, category}){
    return(
        <>
        <div className="col-lg-4">
            <CardImage poster_path={season.poster_path}/>
            <div className="d-flex justify-content-between">
                <div>
                    
                        <h5 className="card-title fs-bold">{category === 'movies' && season.title}{category === 'shows' && season.name}</h5>

                    <h6 className="text-muted">{category === 'movies' && season.release_date}{category === 'shows' && season.first_air_date}</h6>
                </div>
            </div>
        </div>
        </>
    )
}