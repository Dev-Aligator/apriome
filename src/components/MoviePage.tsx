import MovieCard from "./MovieCard";
import "../styles/MoviePage.sass";


const MoviePage = () => {
  const movies = [
    {
      id: '0',
      title: 'Avatar',
      director: 'James Cameron',
      genre: ['Scifi', 'Action'],
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit...',
      poster: 'https://lumiere-a.akamaihd.net/v1/images/avatar_800x1200_208c9665.jpeg'
    },
    {
      id: '0',
      title: 'Avatar',
      director: 'James Cameron',
      genre: ['Scifi', 'Action'],
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit...',
      poster: 'https://lumiere-a.akamaihd.net/v1/images/avatar_800x1200_208c9665.jpeg'
    },
    {
      id: '0',
      title: 'Avatar',
      director: 'James Cameron',
      genre: ['Scifi', 'Action'],
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit...',
      poster: 'https://lumiere-a.akamaihd.net/v1/images/avatar_800x1200_208c9665.jpeg'
    },
    {
      id: '0',
      title: 'Avatar',
      director: 'James Cameron',
      genre: ['Scifi', 'Action'],
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit...',
      poster: 'https://lumiere-a.akamaihd.net/v1/images/avatar_800x1200_208c9665.jpeg'
    },
    {
      id: '0',
      title: 'Avatar',
      director: 'James Cameron',
      genre: ['Scifi', 'Action'],
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit...',
      poster: 'https://lumiere-a.akamaihd.net/v1/images/avatar_800x1200_208c9665.jpeg'
    },


  ];

  return (
    <div className="movie-page">
      {movies.map((movie, index) => (
        <MovieCard key={index} movie={movie} />
      ))}
    </div>
  );
};


export default MoviePage;
