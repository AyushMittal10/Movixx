import { useState, useEffect} from 'react'

// react router bnao -- jisse easily pages set ho jaaye
import { BrowserRouter, Routes, Route } from "react-router-dom"
import './App.css'

import { fetchDataFromApi } from './utils/api'

// action ko import kr liya
import { useSelector, useDispatch } from 'react-redux'
import {getApiConfiguration, getGenres} from "./store/homeSlice"

// saare component and pages import
import Header from "./components/header/Header"
import Footer from "./components/footer/Footer"
import Home from "./pages/home/Home"
import Details from "./pages/details/Details"
import SearchResult from "./pages/searchResult/SearchResult"
import Explore from "./pages/explore/Explore"
import PageNotFound from "./pages/404/PageNotFound"



function App() {
  // use dispatch ke through(hook ke through) action getapiconfig call krwaenge
  const dispatch = useDispatch()

  // saari states of url aa jaegi iss meh ()
  // problem -- store ke home ki from homeslice value access kr rha hai ye state se
  const {url} = useSelector((state) => 
  state.home)
  console.log(url)

  // iss hook ke andar hi api call krwaenge (invoke func)
  useEffect(() => {
      // apiTesting()
      fetchApiConfig();
      genresCall();
  }, []);

  // successful hui -- toh then meh callback hai
  // const apiTesting = () => {
  //   fetchDataFromApi('/movie/popular?api_key=92332e061c5435118655378b57551af3')
  //   .then((res) => {
  //     console.log(res)

  //     // action ke andar response pass krdo
  //     dispatch(getApiConfiguration(res))
  //   })
  // }

  const fetchApiConfig = () => {
    fetchDataFromApi("/configuration?api_key=92332e061c5435118655378b57551af3")
    .then((res) => {
      console.log(res);

      // chize chahiye -- for foto to show -- vo sab url meh store from api
      const url = {
          backdrop: res.images.secure_base_url + "original",
          poster: res.images.secure_base_url + "original",
          profile: res.images.secure_base_url + "original",
      };
  
      dispatch(getApiConfiguration(url));
    });
  };

  const genresCall = async () => {
    let promises = [];
    let endPoints = ["tv", "movie"]
    let allGenres = {}

    // promise all dono API ek sth call krega aapki
    // dono ka response kbhi bhi aaye par ek sth hi return krega (promise all )
    endPoints.forEach((url) => {
      promises.push(fetchDataFromApi(`/genre/${url}/list?api_key=92332e061c5435118655378b57551af3`))
    })

    // data 2 array meh aayega
    // array meh object hai and object meh genres hai
    const data = await Promise.all(promises);
    console.log(data);

    // id key bnegi and response value meh aayega
    // genre ka object bnaya -- key li humne itemid and iterator is passed
    data.map(({genres}) => {
        return genres.map((item) => {
          allGenres[item.id] = item
        })
    })

    // dispatch(action to reducer) meh action and action meh -- 
    dispatch(getGenres(allGenres));
  };
  
  return (
      // for testing tha ye sab
      // <div className="App"> App 
      // {/* url? zruri -- cz api aane m time lgegi -- undefined value hai toh app break na kr jaaye islea */}
      //   {url?.total_pages}
      // </div>

      <BrowserRouter>

      <Header />

        <Routes>
            {/* route take 2 path -- root directory and element (ye component leta hai) */}
            <Route path="/" element={<Home />} />
            {/* jab movie pr click -- toh uski details dega ye humko */}
            <Route path="/:mediaType/:id" element={<Details />} />
            
            <Route path="/search/:query" element={<SearchResult />} />
            {/* xplore Tv ya movie se related content */}
            <Route path="/explore/:mediaType" element={<Explore />} />
            {/* iske alawa kch bhi -- toh page not found */}
            <Route path="*" element={<PageNotFound />} />

        </Routes>

      <Footer />

      </BrowserRouter>
  )
}

export default App
