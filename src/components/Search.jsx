import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router";
import { LanguageContext } from "../context/LanguageContext";
import searchItems from "./JS/search";
export default function Search({searchValue}){
    const [search,setSearch] = useState('');
    const {language} = useContext(LanguageContext);
    const navigate = useNavigate();
    const handleSearch = () =>{
        setSearch(`${search}`);
        navigate(`/search/${search}`);
    }
    useEffect(() => {
        if(searchValue){
            setSearch(searchValue);
        }
    },[]);

    const handleChange = (event) =>{
        setSearch(event.target.value);
    }
    return(
        <div className="d-flex align-items-center mx-5 pb-5 ">
        <input type="search" name="search" id="search" placeholder={searchItems.placeHolder[language]} value={search} className="bg-white text-black border-0 rounded-2 me-3 ps-3" style={{height:'5vh', flexGrow: 1}} onChange={handleChange}/>  
        <button className="btn btn-yellow" onClick={handleSearch}>{searchItems.searchButton[language]}</button>
        </div>
    )
}