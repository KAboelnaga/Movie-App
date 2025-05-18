import { useState } from "react"

export default function Search(){
    const [search,setSearch] = useState('');
    const handleSearch = () =>{
        console.log('searching', search);
    }
    const handleChange = (event) =>{
        setSearch(event.target.value);
        console.log(search);
    }
    return(
        <div className="d-flex align-items-center mx-5 pb-5 ">
        <input type="search" name="search" id="search" placeholder='Search and explore...' value={search} className="bg-white text-black border-0 rounded-2 me-3 ps-3" style={{height:'5vh', flexGrow: 1}} onChange={handleChange}/>
        <button className="btn btn-yellow" onClick={handleSearch}>Search</button>
        </div>
    )
}