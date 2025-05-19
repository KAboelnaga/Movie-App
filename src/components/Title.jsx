import Search from "./Search";

export default function Title(){
    return(
        <>
            <div className="bg-light2 mt-4 mx-4">
                <h1 className="p-5">Welcome to our movie app</h1>
                <p className="ms-5 mb-5">Millions of movies, TV shows and people to discover. Explore now.</p>
                <Search searchValue='' />
            </div>
        </>
    )
}