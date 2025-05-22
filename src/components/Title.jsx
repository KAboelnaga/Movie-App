import { useContext } from "react";
import Search from "./Search";
import { LanguageContext } from "../context/LanguageContext";
import homeTitle from "./JS/Title";
export default function Title(){
    const {language} = useContext(LanguageContext);
    return(
        <>
            <div className="bg-light2 pt-4 m-4">
                <h1 className="py-3 mx-3">{homeTitle.Title[language]}</h1>
                <p className="mx-3">{homeTitle.Subtitle[language]}</p>

                <Search searchValue='' />
            </div>
        </>
    )
}