import "../styles/AnimeCard.sass";
import { Anime } from "./Interface/InterfaceCollection";

interface AnimeCardProps {
  anime: Anime;
}
const AnimeCard = ({anime}:AnimeCardProps) => {
  const maxSynopsisLength = 200;
  const minSynopsisLength = 50;
  if (anime.synopsis) {
    if (anime.synopsis.length > maxSynopsisLength)
      anime.synopsis = anime.synopsis.substring(0, maxSynopsisLength - 3) + "...";
    else if (anime.synopsis.length < minSynopsisLength)
      anime.synopsis.padEnd(50, " ");
  }
  
  if( !anime.genre ){
    anime.genre = "['Unknown']";
  }
  const genres = JSON.parse(anime.genre.replace(/'/g, '"')) as String[];
  return (
    <div className="movie-card">
      <div className="poster"><img src={anime.img_url ? anime.img_url : ""}></img></div>
      <div className="details">
        <h3>{anime.title}</h3>

        <div className="tags">
          {genres.map((tag, index) => (
            <span key={index} className={`genre ${String(tag)}`}>{tag}</span>
          ))}
        </div>

        <div className="info">
          <p>{anime.synopsis}</p>
        </div>
      </div>
    </div>
  );
};  

export default AnimeCard;
