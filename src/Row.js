import React, { useEffect, useState } from 'react';
import YouTube from 'react-youtube';
import axios from './axios';
import './Row.css';
import movieTrailer from "movie-trailer";

const base_url = "https://image.tmdb.org/t/p/original/";

export function Row({ title, fetchUrl, isLargerRow }) {

    const [movies, setMovies] = useState([]);
    const [trailerUrl, setTrailerUrl] = useState("");


    useEffect(() => {
        //if  [], run once when to row loads, and dont run again. Only on page load
        async function fetchData(){
            const request = await axios.get(fetchUrl);  
            setMovies(request.data.results);
            return request;          
        }
        fetchData();
    },[fetchUrl]);

    const opts = {
        height: "390",
        width: "100%",
        playerrVars: {
            autoplay: 1
        }
    }

    const handleClick = (movie) => {
        if(trailerUrl){
            setTrailerUrl("");
        }else{
            movieTrailer(movie?.name || "")
            .then(url => {
                const urlParams = new URLSearchParams(new URL(url).search);
                setTrailerUrl(urlParams.get('v'));
            }).catch((error) => console.log(error));
        }
    }

    return (
        <div className="row">
            <h2>{title}</h2>
            <div className="row__posters">
                {movies.map(movie => (
                    <img 
                        key={movie.id} 
                        onClick={() => handleClick(movie)}
                        className={`row__poster ${isLargerRow && "row_posterLarge"}`} 
                        src={`${base_url}${isLargerRow ? movie.poster_path : movie.backdrop_path}`} 
                        alt={movie.name}/>
                ))}
            </div>
            <div className="row__trailer">
            {trailerUrl && <YouTube videoId={trailerUrl} opts={opts}/>}
            </div>
        </div>
    )
}

export default Row;