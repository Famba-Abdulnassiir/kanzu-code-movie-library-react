import React from 'react';
import { useParams } from 'react-router-dom';

const MovieDetail = ({ movies }) => {
  const { movieId } = useParams();

  // Find the movie with the specified movieId
  const movie = movies.find(movie => movie.id === parseInt(movieId));

  if (!movie) {
    return <div>Movie not found</div>;
  }

  return (
    <div>
      <h2>{movie.title}</h2>
      <p>Year: {movie.year}</p>
      <p>Description: {movie.description}</p>
      {/* Display more details about the movie */}
    </div>
  );
};

export default MovieDetail;