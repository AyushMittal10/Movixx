import React from 'react'

import "./style.scss";

import { useParams } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';

import DetailsBanner from './detailsBanner/detailsBanner';

import Cast from './cast/Cast';
import VideosSection from './videosSection/VideosSection';

import Similar from './carousels/Similar';
import Recommendation from './carousels/Recommendation';

// details banner meh jo data pss krna uske liye API call krwani pdegi
// specific details ke liye endpoint -- /movie/{movie_id}
const Details = () => {

  // dynamic movie and tv ke liye -- params lo
  // params meh -- media type and id milegi (cz app.jsx meh details compoenent meh ye dono de rkha hai)
  const {mediaType, id} = useParams();

  // 2 api call -- ek toh cast ka data, ek video ka data  
  // media type bhejna hai (movie meh -- movie and tv meh -- tv) toh dynamic chahiye (ye videos ke liye)
  const {data, loading} = useFetch(`/${mediaType}/${id}/videos?api_key=92332e061c5435118655378b57551af3`)
  
  // 2nd api call -- variable change krdiye maine
  const {data: credits, loading: creditsLoading} = useFetch(`/${mediaType}/${id}/credits?api_key=92332e061c5435118655378b57551af3`)

  return (
    <div>
      {/* trailer ke liye -- 1st vli pss islea [0] -- toh results meh phla object pss kr diya*/}
      <DetailsBanner video={data?.results?.[0]} crew = {credits?.crew}/>
      
      <Cast data={credits?.cast} 
      loading={creditsLoading}/>

      <VideosSection data={data} 
      loading = {loading}/>

      <Similar mediaType={mediaType} id={id}/>

      <Recommendation mediaType={mediaType} id={id}/>
    </div>
  )
};

export default Details;
