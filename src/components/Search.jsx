import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router";
import { LanguageContext } from "../context/LanguageContext";

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
        console.log(search);
    }
    return(
        <div className="d-flex align-items-center mx-5 pb-5 ">
        {language === 'en' && <input type="search" name="search" id="search" placeholder='Search and explore...' value={search} className="bg-white text-black border-0 rounded-2 me-3 ps-3" style={{height:'5vh', flexGrow: 1}} onChange={handleChange}/>}
        {language === 'ar' && <input type="search" name="search" id="search" placeholder='ابحث واستكشف...' value={search} className="bg-white text-black border-0 rounded-2 ms-3 ps-3" style={{height:'5vh', flexGrow: 1}} onChange={handleChange}/>}
        {language === 'fr' && <input type="search" name="search" id="search" placeholder='Recherchez et explorez...' value={search} className="bg-white text-black border-0 rounded-2 me-3 ps-3" style={{height:'5vh', flexGrow: 1}} onChange={handleChange}/>}
        {language === 'zh' && <input type="search" name="search" id="search" placeholder='搜索并探索...' value={search} className="bg-white text-black border-0 rounded-2 me-3 ps-3" style={{height:'5vh', flexGrow: 1}} onChange={handleChange}/>}
        
        {language === 'en' && <button className="btn btn-yellow" onClick={handleSearch}>Search</button>}
        {language === 'ar' && <button className="btn btn-yellow" onClick={handleSearch}>بحث</button>}
        {language === 'fr' && <button className="btn btn-yellow" onClick={handleSearch}>Rechercher</button>}
        {language === 'zh' && <button className="btn btn-yellow" onClick={handleSearch}>搜索</button>}
        </div>
    )
}