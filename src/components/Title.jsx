import { useContext } from "react";
import Search from "./Search";
import { LanguageContext } from "../context/LanguageContext";
import homeTitle from "./JS/Title";
export default function Title(){
    const {language} = useContext(LanguageContext);
    return(
        <>
            <div className="bg-light2 mt-4 mx-4">
                <h1 className="p-5">{homeTitle.Title[language]}</h1>
                <p className="mx-5 mb-5">{homeTitle.Subtitle[language]}</p>

                <Search searchValue='' />
            </div>
        </>
    )
}