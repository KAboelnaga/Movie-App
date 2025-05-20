import { useContext } from "react"
import { LanguageContext } from "../context/LanguageContext"
import SeasonCard from "./SeasonCard";
import showSeasonItems from "./JS/showSeasonsItems";
export default function ShowSeasons({numberOfEpisodes, numberOfSeasons,seasons, spoken_languages}){
    const {language} = useContext(LanguageContext);
    return(
        <div className="d-block mt-3">          
            <p className='d-inline inter-600 py-5'>{showSeasonItems.seasons[language]}<span className='ms-3 inter-400 me-5'>{numberOfSeasons}</span></p>                           
            <p className='d-inline inter-600 my-3'>{showSeasonItems.episodes[language]}<span className='ms-3 inter-400 me-5'>{numberOfEpisodes}</span></p> 
            <span className='d-block inter-600 my-3 me-3'>{showSeasonItems.languages[language]}</span>
            {
                spoken_languages?.map((language) =>
                    <span className='me-3 bg-light2 p-2 rounded-3' key={spoken_languages.indexOf(language)}>
                        {language.name}
                    </span>
                )
            }
            <div className="row row-cols-2 g-4 mx-3">
            {
                seasons?.map(season => (
                    <div key={seasons.indexOf(season)}>
                        <SeasonCard season={season} category='shows' />
                    </div>
                ))
            }
            </div>
        </div>
    )
}