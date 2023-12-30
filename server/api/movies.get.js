// `api/movies` endpoint -m GET
import moviesData from '~/static/movies.json';

export default defineEventHandler(async (event) => {
  // const body = await readBody(event)
  return moviesData.movies
})