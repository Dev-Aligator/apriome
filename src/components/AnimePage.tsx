import MovieCard from "./AnimeCard";
import "../styles/AnimePage.sass";
import { AxiosInstance } from "axios";
import { useEffect, useState } from "react";
import { Anime } from "./Interface/InterfaceCollection";

interface AnimePageProps {
  client: AxiosInstance;
}
const AnimePage = ({client}: AnimePageProps) => {
  const [animes, setAnimes] = useState<Anime[]>([]);

  useEffect(() => {
    setAnimes([]);
    const apiUrl = "/api/anime/";
    client
      .get(apiUrl)
      .then((response) => {
        setAnimes(response.data["animes"]);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  },[]);
  return (
    <div className="movie-page">
      {animes.map((anime, index) => (
        <MovieCard key={index} anime={anime} />
      ))}
    </div>
  );
};


export default AnimePage;
