import React, { useEffect, useState } from "react";
import "./Player.css";
import back_arrow_icon from "../../assets/back_arrow_icon.png";
import { useNavigate, useParams } from "react-router-dom";

const Player = () => {
const {id}=useParams();

const navigate=useNavigate()

const[apiData,setApiData]=useState({name:"",
  key:"",
  published_at:"",
  type:""
})


  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5NDI5ZTk2NjM0MjZkYTI3NzAxYTFiNzI5ZTFhYjI4NiIsIm5iZiI6MTczNzY1MDg5Ni4xODU5OTk5LCJzdWIiOiI2NzkyNzJkMGVhNjQ2ODIzNGVlYWQxYmUiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.X9OMStrcWC9IeHFbMd7_s7qWFhwlB5Lol_T65QEMULY",
    },
  };

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`,
      options
    )
      .then((res) => res.json())
      .then((res) => setApiData(res.results[0]))
      .catch((err) => console.error(err));
  }, []);


  return (
    <div className="player">
      <img src={back_arrow_icon} alt="" onClick={()=>{
        navigate(-2)
      }}/>
      <iframe
        width="90%"
        height="90%"
        src={`https:www.youtube.com/embed/${apiData.key}`}
        title="trailer"
        frameBorder="0"
        allowFullScreen
      ></iframe>
      <div className="player-info">
        <p>{apiData.published_at.slice(0,10)}</p>
        <p>{apiData.name}</p>
        <p>{apiData.type}</p>
      </div>
    </div>
  );
};

export default Player;
