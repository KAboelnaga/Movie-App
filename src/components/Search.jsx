import { useContext, useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router";
import { LanguageContext } from "../context/LanguageContext";
import searchItems from "./JS/search";
import { motion } from "framer-motion";
export default function Search({searchValue}){
    const emptySearch = useRef(null);
    const [search,setSearch] = useState('');
    const {language} = useContext(LanguageContext);
    const navigate = useNavigate();
    const handleSearch = (e) =>{
        e.preventDefault();
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
        <form className="d-flex align-items-center py-3 mt-5 flex-wrap gap-2 w-100" style={{width: '80vw'}}>
            <input type="search" name="search" id="search" placeholder={searchItems.placeHolder[language]} value={search} className="bg-white text-black border-1 border-light2 rounded-2 flex-grow-1 mx-3 me-3" style={{height:'5vh'}} onChange={handleChange} />  
            <motion.button whileHover={{ scale: 1.1 }}
  whileTap={{ scale: 0.95 }} initial={{ x: 100}} animate={{ x: 0 , transition: {duration: 0.5}}} className="btn btn-yellow mx-3" onClick={handleSearch}>{searchItems.searchButton[language]}</motion.button>
        </form>
        <h4 className="text-danger inter-500 d-none " ref={emptySearch}>Search is empty!</h4>
        </>
    )
}