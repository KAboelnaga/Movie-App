import { useContext } from "react";
import Search from "./Search";
import { LanguageContext } from "../context/LanguageContext";
import homeTitle from "./JS/Title";
export default function Title(){
    const {language} = useContext(LanguageContext);
    return(
        <>
            <div className="bg-light2 pt-4 mx-4">
                <h1 className="py-3 mx-5">{homeTitle.Title[language]}</h1>
                <p className="mx-5 mb-2">{homeTitle.Subtitle[language]}</p>

                <Search searchValue='' />
            </div>
        </>
    )
}