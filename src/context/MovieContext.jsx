import { createContext, useState, useEffect } from "react";

const MovieContext = createContext();


export function MovieProvider({ children }) {
  const [movies, setMovies] = useState([]);
  const [user, setUser] = useState(null);
  const [searchedMovies, setSearchedMovies] = useState([]);
  const [token, setToken] = useState([])


  const fetchAllMovies = async () => {
    const data = await fetch('https://kanzu-code-movie-library-backend.onrender.com/api/v1/movies');
    const movies = await data.json();
    setMovies(movies)
  }
  return (
    <MovieContext.Provider value={{ fetchAllMovies, movies,setMovies, searchedMovies, setSearchedMovies,user, setUser,token, setToken}}>
      {children}
    </MovieContext.Provider>
  )
}

export default MovieContext