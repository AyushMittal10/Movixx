// searchresults par familiar result dega ye
// carousel vle component ke dimilar hai yeh

import React from "react";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import "./style.scss";
import Img from "../lazyLoadImage/Img";
import CircleRating from "../circleRating/CircleRating";
import Genres from "../genres/Genres";
import PosterFallback from "../../assets/no-poster.png";

// no api call -- saara data pss krenge jiss meh independently tv ya movie ka data hoga
// fromsearch -- true yaa null
const MovieCard = ({ data, fromSearch, mediaType }) => {
    // store se url le lo aap
    const { url } = useSelector((state) => state.home);

    const navigate = useNavigate();

    // poster hai toh uska url hai -- varna fallback img hoga
    const posterUrl = data.poster_path
        ? url.poster + data.poster_path
        : PosterFallback;


    return (
        // movie card is main class -- uss meh onclick method lgaya hai
        // and navigate krwa diya particular tv series ya movie pe
        <div
            className="movieCard"
            onClick={() =>
                navigate(`/${data.media_type || mediaType}/${data.id}`)
            }
        >

            {/* poster ki img lga di -- and agr search space se nhi hai ye 
            tbhi ye sb element show ho toh likhe varna show na ho (rating genre vgera na dikhe)
            search space pr bss content dikhana hai -- norating and all */}
            <div className="posterBlock">
                <Img className="posterImg" src={posterUrl} />
                {!fromSearch && (
                    <React.Fragment>
                        <CircleRating rating={data.vote_average.toFixed(1)} />
                        <Genres data={data.genre_ids.slice(0, 2)} />
                    </React.Fragment>
                )}
            </div>

            {/* date le kr format krro bss */}
            <div className="textBlock">
                <span className="title">{data.title || data.name}</span>
                <span className="date">
                    {dayjs(data.release_date).format("MMM D, YYYY")}
                </span>
            </div>
        </div>
    );
};

export default MovieCard;