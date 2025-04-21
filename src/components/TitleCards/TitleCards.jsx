import React, { useEffect, useRef, useState } from "react";
import "./TitleCards.css";
import cards from "../../assets/cards/Cards_data";
import cards_data from "../../assets/cards/Cards_data";
import { Link } from "react-router-dom";
const TitleCards = ({title,category}) => {


  //remove this code to scroll using touch pad
const [apiData,setApiData]=useState([])

  const cardsRef = useRef();
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5NDI5ZTk2NjM0MjZkYTI3NzAxYTFiNzI5ZTFhYjI4NiIsIm5iZiI6MTczNzY1MDg5Ni4xODU5OTk5LCJzdWIiOiI2NzkyNzJkMGVhNjQ2ODIzNGVlYWQxYmUiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.X9OMStrcWC9IeHFbMd7_s7qWFhwlB5Lol_T65QEMULY'
    }
  };

  const handleWheel = (event) => {
    event.preventDefault();
    cardsRef.current.scrollLeft += event.deltaY;
  };

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${category?category:"now_playing"}?language=en-US&page=1`, options)
  .then(res => res.json())
  .then(res => setApiData(res.results))
  .catch(err => console.error(err));

    cardsRef.current.addEventListener("wheel", handleWheel);

  }, []);

//this much..................................






  return (
    <div className="title-cards">
      <h2>{title?title:"Popular on Netflix"}</h2>
      <div className="card-list" ref={cardsRef}>
        {apiData.map((card, index) => {
          return (
            <Link to={`/player/${card.id}`} className="card" key={index}>
              <img src={`https://image.tmdb.org/t/p/w500`+card.backdrop_path} alt="" />
              <p>{card.original_title}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default TitleCards;
