import { useEffect, useState } from "react";
import SearchImage from "./search.svg"
import MovieCard from "./MovieCard"

const API_URL= "https://www.omdbapi.com?apikey=57bf284f"


const App = () => {
  const [movies, setMovies] = useState([])
  const [search, setSearch] = useState("")
  
const buscarPeliculas = async (title) => {
  const response = await fetch(`${API_URL}&s=${title}`)
  const data = await response.json();
  setMovies(data.Search)
}
const handleKeyPress =(e) => {
  if(e.key === "Enter"){
    buscarPeliculas(search);
  }
}

useEffect(() => {
  buscarPeliculas("")
}, [])

  return (
    <div className="app">
    <h1>Movie App</h1>

    <div className="search">
      <input
      type="text" 
      placeholder="Busca una pelicula" 
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      onKeyPress={handleKeyPress}
      />
<img src={SearchImage} onClick={() => buscarPeliculas
(search)}
/>
  </div>

  {
    movies?.length > 0
    ? (
  <div className="container">
      {movies.map((movie) => (<MovieCard movie={movie}/>))}
  </div>

    ) : (<div className='empty'>
    <h2>No se encontraron películas.</h2>
  </div> 
  )
  }

</div>
  );
}

export default App;
