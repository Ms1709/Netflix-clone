import movieTrailer from 'movie-trailer';
import React, { useEffect, useState } from 'react'
import YouTube from 'react-youtube';
import axios from './axios';
import "./Row.css";

const base_url='https://image.tmdb.org/t/p/original/';

function Row({title, fetchUrl, isLargeRow}) {

  const [movies, setMovies] = useState([])
  const [trailerUrl, setTrailerURl] =useState([""])

  useEffect(() => {
    async function fetchData() {
      const request= await axios.get(fetchUrl)
      setMovies(request.data.results)
      return request;
    }
    fetchData();
  },[fetchUrl]);

  const opts = {
    height: '380',
    with: '100%',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };

  const handleClick = (movie) =>{
    if(trailerUrl){
      // console.log('Video closed..')
      setTrailerURl('');
    }else{
      movieTrailer(movie?.name || "")
      .then(url => {
        console.log(url)
         const urlParam  =  new URLSearchParams(new URL(url).search)
         console.log(urlParam);
         setTrailerURl(urlParam.get('v'));
      }).catch((error) => console.log("Error Found: " + error) )
    }
  }

  // console.table(movies);

  return (
    <div className='row'>
      <h2>{title}</h2>

      <div className="row__posters">
            {/* Container -> Poster */}
            {movies.map(movie => (
              <img key={movie.id}
              onClick= {() => handleClick(movie)}
              className={`row__poster ${isLargeRow && "row__posterLarge"}`} 
              src={ `${base_url}${isLargeRow ? movie.poster_path:  movie.backdrop_path}`} 
              alt={movie.name}/>
            ))}
      </div>
      {trailerUrl && <YouTube videoId={trailerUrl} opts={opts}/> }
    </div>
  )
}

export default Row