import { useContext, useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router";
import { LanguageContext } from "../context/LanguageContext";
import searchItems from "./JS/search";
export default function Search({searchValue}){
    const emptySearch = useRef(null);
    const [search,setSearch] = useState('');
    const {language} = useContext(LanguageContext);
    const navigate = useNavigate();
    const handleSearch = () =>{
        setSearch(`${search}`);
        if (search === ''){
            emptySearch.current.classList.remove('d-none');
        }
        else{
        navigate(`/search/${search}`);
        }
    }
    useEffect(() => {
        if(searchValue){
            setSearch(searchValue);
        }
    },[]);

    const handleChange = (event) =>{
        setSearch(event.target.value);
        emptySearch.current.classList.add('d-none');
    }
    return(
        <>
        <div className="d-flex align-items-center py-3 mx-5">
            <input type="search" name="search" id="search" placeholder={searchItems.placeHolder[language]} value={search} className="bg-white text-black border-1 border-light2 rounded-2 me-3 ps-3" style={{height:'5vh', flexGrow: 1}} onChange={handleChange}/>  
            <button className="btn btn-yellow" onClick={handleSearch}>{searchItems.searchButton[language]}</button>
        </div>
        <h4 className="text-danger pb-3 mx-5 inter-500 d-none" ref={emptySearch}>Search is empty!</h4>
        </>
    )
}