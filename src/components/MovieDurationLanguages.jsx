import { useContext } from "react"
import movieDurationItems from "./JS/movieDuration"
import { LanguageContext } from "../context/LanguageContext"

export default function MoviesDurationLanguage({runtime, spoken_languages}){
    const { language = 'en' } = useContext(LanguageContext);
    console.log(spoken_languages);
    return(
        <div className="d-block py-3">                      
            <p className='d-inline inter-600'>{movieDurationItems?.duration?.[language]}</p>
            <span className='ms-3 inter-400 me-5'>{runtime} {movieDurationItems?.minutes?.[language]}</span>
            <span className='d-inline inter-600 me-3'>{movieDurationItems?.languages?.[language]}</span>
            {
                spoken_languages?.map(lang => (
                    <span className="mx-3" key={spoken_languages.indexOf(lang)}>{lang.name}</span>
                ))
            }
        </div>
    )
}