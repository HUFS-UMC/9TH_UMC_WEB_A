import {useEffect, useState} from "react";
import axios from 'axios';
import type { Movie } from '../types/Movie';
import MovieCard from '../components/MovieCard';

export default function MoviePage(){
    const [movies, setMovies] = useState<Movie[]>([]);

    useEffect(() : void => {
        const fetchMovies = async () : Promise<void> => {

            const { data } = await axios.get<{ results: Movie[] }>(
                'https://api.themoviedb.org/3/person/popular?language=en-US&page=1',
                {
                    headers : {
                        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyODY3YzYyNjJjODI0NTFmMGY4YTgxZDQ2NzJiOTMxZCIsIm5iZiI6MTc1OTIxMjYzNC4yODE5OTk4LCJzdWIiOiI2OGRiNzQ1YTExNzNkMzA4NTgzOGM5YjkiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.dzqbEvWUHf4HmZuuRDIF37Y0jpix2ucVIsrut2jToYk'
                    },
                }
            );

            setMovies(data.results);
        };

        fetchMovies();
    }, []);

    return (
        <div className='p-10 grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6'>
            {movies?.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
            ))}
        </div>
    );
}