import "../styles/MovieCard.sass";
import { Movie } from "./Interface/InterfaceCollection";

interface MovieCardProps {
  movie: Movie;
}
const MovieCard = ({movie}:MovieCardProps) => {
  return (
    <div className="movie-card">
      <div className="poster"><img src={movie.poster}></img></div>
      <div className="details">
        <img src={movie.poster} className="logo"></img>
        <h3>{movie.director}</h3>

        <div className="tags">
          {movie.genre.map((tag, index) => (
            <span key={index}>{tag}</span>
          ))}
        </div>

        <div className="info">
          <p>{movie.description}</p>
        </div>
      </div>
    </div>
  );
};  

export default MovieCard;
