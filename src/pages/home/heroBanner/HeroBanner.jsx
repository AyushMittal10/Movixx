import React, {useState, useEffect} from 'react'
import { useNavigate} from "react-router-dom"
import { useSelector } from "react-redux";
import "./style.scss";

import useFetch from '../../../hooks/useFetch';

import Img from "../../../components/lazyLoadImage/Img"
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper"
// 1 state create krni -- refresh pr new image of page aaye 
// 1 state krni hai input ki -- jo type krenge vo save hona chahiye
// and store meh jo url save -- vo yha leni hogi

const HeroBanner = () => {

  // hooks use -- for the state maintain ke liye (intially empty)
  const [background, setBackground] = useState("");
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const {url} = useSelector((state) => state.home)

  // call API
  const {data, loading} = useFetch("/movie/upcoming?api_key=92332e061c5435118655378b57551af3")

  // api se jo foto aa rhi -- vo randomly load ho uske liye (backdrop path ye key ka naam from console nikala hai hum ne)
  useEffect(() => {
    const bg = url.backdrop + 
      data?.results?.[Math.floor(Math.random() * 20)]?.backdrop_path;
      
    setBackground(bg);
  }, [data])

  // method for search input -- jo input type (iss method ke through state m save ho jaaye)
  // pss it in input section (and enter pe search page pe le jaaye)
  const searchQueryHandler = (event) => {
    if(event.key === "Enter" && query.length > 0){
      navigate(`/search/${query}`);
    }
  };

  const searchthequery = (event) => {
    navigate(`/search/${query}`);
  }

  return (
    <div className="heroBanner">
      {!loading && <div className="backdrop-img">
        <Img src={background}/>
      </div>}

      <div className="opacity-layer"></div>
      <ContentWrapper>
        <div className="wrapper">
          <div className="heroBannerContent">
            <span className="title">Welcome</span>
            <span className="subTitle">
              Millions of movies, TV shows and people to discover. Explore now.
            </span>
            <div className="searchInput">
              <input 
                type="text" 
                placeholder="Search for a movie or TV show...."
                onChange={(e)=> setQuery(e.target.value)} 
                onKeyUp={(searchQueryHandler)}
              />
              <button onClick={searchthequery}>Search</button>
            </div>
          </div>
        </div>
      </ContentWrapper>
    </div>
  )
}

export default HeroBanner
