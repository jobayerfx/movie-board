// `api/movies` endpoint -m POST
import { writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';
import moviesData from '~/static/movies.json';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const moviesFilePath = path.resolve(__dirname, '../static/movies.json');

export default defineEventHandler(async (event) => {
    const updatedMovies = await readBody(event)
//  const updatedMovies = req.body;
    moviesData.movies = updatedMovies;

    writeFileSync(moviesFilePath, JSON.stringify(moviesData, null, 2));
    
    res.status(200).end();
})