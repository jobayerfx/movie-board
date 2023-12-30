import moviesData from '~/static/movies.json';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const searchQuery = body.title_like;

  if (searchQuery) {
    // If there's a search query, filter movies based on the name
    const filteredMovies = moviesData.movies.filter(movie =>
      movie.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return filteredMovies;
  } else {
    // If no search query, return the entire list
    return moviesData.movies;
  }
});