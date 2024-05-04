import MovieCard from "./AnimeCard";
import "../styles/AnimePage.sass";
import { AxiosInstance } from "axios";
import { useEffect, useState } from "react";
import { Anime } from "./Interface/InterfaceCollection";

interface AnimePageProps {
  client: AxiosInstance;
}

const AnimePage = ({ client }: AnimePageProps) => {
  const [animes, setAnimes] = useState<Anime[]>([]);
  const [isLoading, setIsLoading] = useState(false); 

  const fetchAnimeData = async () => {
    setIsLoading(true);
    localStorage.topper = window.scrollY;

    try {
      const apiUrl = "/api/anime/";
      const response = await client.get(apiUrl);
      const fetchedAnimes = response.data["animes"];
      setAnimes(prevAnimes => [...prevAnimes, ...fetchedAnimes]); // Update animes state using functional update to avoid dependency on previous state
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };
  
  useEffect(() => {
    window.scrollTo({
      top: localStorage.topper,
      behavior: "instant",
    });   
  },[isLoading])
  useEffect(() => {
    fetchAnimeData();
  }, []);





  return (
    <>
      <div className="movie-page">
        {isLoading ? (
          <p>Loading animes...</p> // Display loading message while fetching
        ) : (
            animes.map((anime, index) => (
              <MovieCard key={index} anime={anime} />
            ))
          )}
      </div>
      <button className="load-more-btn" onClick={fetchAnimeData} disabled={isLoading}>
        {isLoading ? 'Loading...' : <span>Show more <i className="fa-solid fa-caret-down"></i></span>}
      </button>
    </>
  );
};

export default AnimePage;

