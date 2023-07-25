import React, { useRef } from "react";

// left and right arrow for trending ke liye (desktop ke liye)
// becoz mob meh css se auto slide ho jaata hai
import {
    BsFillArrowLeftCircleFill,
    BsFillArrowRightCircleFill,
} from "react-icons/bs";

import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
// to change format of data we get from server and show krna alg in our desktop
import dayjs from "dayjs";

import ContentWrapper from "../contentWrapper/ContentWrapper";
import Img from "../lazyLoadImage/Img";
import PosterFallback from "../../assets/no-poster.png";

import CircleRating from "../circleRating/CircleRating";

import Genres from "../genres/Genres";
import "./style.scss";

// loading state imp -- cz issi se hum skeleton dikahenge
const Carousel = ({data, loading, endpoint, title}) => {
  
    // use reference jo liya hai uske liye
    // (ye variable jaha bhi pss -- uss div ka reference mil jayega)
    // JS meh getelementbyid krk hota -- react meh var use krk use ref se hota
    const carouselContainer = useRef();
    //console.log(carouselContainer.current);

    // store meh jo url hai -- vo use selector se lelo
    const {url} = useSelector((state) => state.home) 

    // navigate instance create
    const navigate = useNavigate();


    // skeleton class add krk -- animate kregi -- mainjsx ki style meh likha
    const navigation = (dir) => {
        // carousel ki main div ko hum sbse phle pkdenge (pass on carouselItems)
        const container = carouselContainer.current;


        // left to right scroll -- variable create krdo
        const scrollAmount = dir === "left" ? 
        container.scrollLeft - (container.offsetWidth + 20) : 
        container.scrollLeft + (container.offsetWidth + 20);

        // JS function use ab -- object denge (value lega left key) and smoothly slide ho
        container.scrollTo({
            left: scrollAmount,
            behavior: "smooth",
        })


    };

    // static HTML hai -- in skItem jisse skeleton ko baar baar repeat nhi krna
    const skItem = () => {
        return (
            <div className="skeletonItem">
                <div className="posterBlock skeleton">

                </div>

                <div className="textBlock">
                    <div className="title skeleton"></div>
                    <div className="date skeleton"></div>
                </div>
            </div>
        )
    };


    return (
        <div className="carousel">
            <ContentWrapper>
                {title && <div className="carouselTitle">
                    {title}
                        </div>}
                <BsFillArrowLeftCircleFill
                    className="carouselLeftNav arrow"
                    onClick={() => navigation("left")}
                />

                <BsFillArrowRightCircleFill 
                    className="carouselRighttNav arrow"
                    onClick={() => navigation("right")}
                />
                
                {/* load ho rha -- 2nd vla chlega and nhi hoga load toh 1st vla */}
                {!loading ? (
                    <div className="carouselItems" ref={carouselContainer}>
                        {/* har ek poster ek item hai carousel ka (vo sb aaenge) */}

                        {/* source ka url kaafi bda ho jaata (img src) islea ek variable create kr lete hai */}
                        {data?.map((item) => {

                            // agr koi poster nhi dikh rha -- fallback apni poster dikhani hai
                            const posterUrl = item.poster_path ? 
                            url.poster + item.poster_path : 
                            PosterFallback;

                            return (
                                // navigate meh url bna kr jo bhejna -- media type bhi bhejni (agr media type na ho toh endpoint (movie tv se chl jaaye))
                                <div 
                                key={item.id}
                                className="carouselItem" onClick=
                                {() => navigate(`/${item.media_type || endpoint}/${item.id}`)}>

                                    <div className="posterBlock">
                                        <Img src={posterUrl} />
                                        <CircleRating rating=
                                        {item.vote_average.toFixed(1)}/>

                                        {/* 2 item hi ho genre meh IMPP toh slice it */}
                                        <Genres data={item.genre_ids.slice(0,2)}/>
                                    </div>

                                    {/* iss meh title and date rhega */}
                                    <div className="textBlock">
                                        <span className="title">
                                            {/* title movie ke liye and name series ke liye */}
                                            {item.title || item.name}
                                        </span>

                                        <span className="date">
                                            {dayjs(item.release_Date)
                                            .format("MMM D, YYYY")}
                                        </span>
                                    </div>
                                </div>

                            )
                        })}
                    </div>
                ) : (

                    // variable bnaya skitem jisse html load hue baar baar
                    <div className="loadingSkeleton">
                        {skItem()}
                        {skItem()}
                        {skItem()}
                        {skItem()}
                        {skItem()}
                    </div>
                )}
                
            </ContentWrapper>
        </div>
    )
};

export default Carousel
