// home.css meh -- trending ki css likho
import React, {useState} from 'react'

import ContentWrapper from '../../../components/contentWrapper/ContentWrapper'
import SwitchTabs from '../../../components/switchTabs/SwitchTabs'

import useFetch from '../../../hooks/useFetch'
// trending mvies vgera call krwani -- call api's
// (/trending/{mediatype}/ timewindow) documentation m likha

import Carousel from '../../../components/carousel/Carousel'
const Trending = () => {

    // API Call ke liye (time window) -- day/week
    const [endpoint, setEndpoint] = useState("day");

    const {data, loading} = useFetch(`/trending/all/${endpoint}?api_key=92332e061c5435118655378b57551af3`);

    // tabs change pr -- color change (and api call)
    // initially day ka data -- week pr click pr vo data
    const onTabChange = (tab) => {
        setEndpoint(tab === "Day" ? "day" : "week")
    }

    return (
    <div className="carouselSection">
        <ContentWrapper>
            <span className="carouselTitle">Trending</span>
            <SwitchTabs data={["Day", "Week"]} onTabChange={onTabChange}/>
        </ContentWrapper>

        {/* carousel add krne hai -- middle section ke liye (data, loading dono bhej deni hai)*/}
        <Carousel data={data?.results} loading={loading}/>
    </div>
  )
}

export default Trending
