// trending.jsx ki copy hi hai

// home.css meh -- trending ki css likho
import React, {useState} from 'react'

import ContentWrapper from '../../../components/contentWrapper/ContentWrapper'
import SwitchTabs from '../../../components/switchTabs/SwitchTabs'

import useFetch from '../../../hooks/useFetch'


import Carousel from '../../../components/carousel/Carousel'
const Popular = () => {

    const [endpoint, setEndpoint] = useState("movie");

    const {data, loading} = useFetch(`/${endpoint}/popular?api_key=92332e061c5435118655378b57551af3`);

    // tabs change pr -- color change (and api call)
    // initially day ka data -- week pr click pr vo data
    // IMPPP -- movies same as movies in data switch tabs
    const onTabChange = (tab) => {
        setEndpoint(tab === "Movies" ? "movie" : "tv")
    }

    return (
    <div className="carouselSection">
        <ContentWrapper>
            <span className="carouselTitle">What's Popular</span>
            <SwitchTabs data={["Movies", "TV Shows"]} onTabChange={onTabChange}/>
        </ContentWrapper>

        {/* carousel add krne hai -- middle section ke liye (data, loading dono bhej deni hai)*/}
        {/* media type nhi hone se kbhi API call nhi hoti (as props bhejdo) */}
        <Carousel 
            data={data?.results}
            loading={loading}
            endpoint={endpoint}/>
    </div>
  )
}

export default Popular;
// home vle meh isko import bhi krro