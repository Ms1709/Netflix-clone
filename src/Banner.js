import React, { useEffect, useState } from 'react'
import axios from './axios';
import requests from './request';
import "./Banner.css"

function Banner() {

  const [movie,setMovies] =useState([]);

  useEffect( () => {
    async function fetchData(){
      const request = await axios.get(requests.fetchNetflixOriginals);
      setMovies(request.data.results[
        Math.floor(Math.random() *  request.data.results.length -1)
       ]);
       return request
    }
    fetchData();
  },[])

  console.log(movie);

  function truncate(str,n){
    return str?.length>n ? str.substr(0,n-1)+ "..." : str;
  }

  return (
    <header className='banner' style={{
        backgroundSize: "cover",
        backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
        backgroundPosition: "center center",
    }}> 
       {/**Background Image */}
      <div className='baneer_contents'>

            {/**Title */}
            <h1 className='banner_title'>
                {movie?.title || movie?.name || movie?.original_name}
            </h1>

            {/**Div > 2 buttons */}
            <div className='banner__button'>
                <button className='banner__buttons'>Play</button>
                <button className='banner__buttons'>My List</button>
            </div>

            {/**Description */}
            <h1 className='banner_description'>
                {truncate(movie?.overview,150)}
            </h1>

        </div> 
        <div className='banner--fadeButtom'/>
    </header>
  )
}

export default Banner;