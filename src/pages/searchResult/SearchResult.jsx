import React, {useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";

import "./style.scss";

// custom hook use nhi -- method use to call API
import { fetchDataFromApi } from "../../utils/api";
import ContentWrapper from "../../components/contentWrapper/ContentWrapper";

import MovieCard from "../../components/movieCard/MovieCard";
import Spinner from "../../components/spinner/Spinner";
import noResults from "../../assets/no-results.png";

const SearchResult = () => {

  // states ko add krro
  const [data, setData] = useState(null);

  // pageno konsa hai -- uske liye hai ye state
  const [pageNum, setPageNum] = useState(1);
  const [loading, setLoading] = useState(false);
  // url vli query hume isse mil jaegi (search result ke url meh)
  const {query} = useParams();

  // jo milega humko api se -- vo setdata vle m store krwa lo
  const fetchInitialData = () => {
    setLoading(true);
     // /search/movie?query=Jack+Reacher&api_key=API_KEY
    fetchDataFromApi(`/search/multi?query=${query}&page=${pageNum}&api_key=92332e061c5435118655378b57551af3`)
    .then((res) => {
        setData(res);
        setPageNum((prev) => prev + 1);
        setLoading(false);
    });
  }

 

  // next page ka data milega iss meh (merge from purana vla)
  const fetchNextPageData = () => {
    fetchDataFromApi(`/search/multi?query=${query}&page=${pageNum}&api_key=92332e061c5435118655378b57551af3`)
    .then((res) => {
      // already data hai -- purana vla merge it
      if(data?.results) {
        setData({
          ...data, results: [...data?.results, ...res.results],
        });
      }

      // initially data null -- toh as it is pass kr dena hai
      else {
        setData(res);
      }

      setPageNum((prev) => prev + 1);    
    });
  };


  // jb bhi query change -- toh API call islea [] meh (and page no 1 se start)
  useEffect(() => {
    setPageNum(1);
    fetchInitialData();
  },[query])

  // initially loader dikhana hai jb tk search ho ke na aa jaaye
  return (
    // jb tk loading hai -- tb tk hi dikhe ye spinner
    // initial ke liye loading and true (and agr load na ho toh data ho)
    <div className="searchResultsPage">
      {loading && <Spinner initial={true}/>}

      {!loading && (
         <ContentWrapper>
            {/* empty fragment liya -- cz data load na hua ho toh */}
            {data?.results?.length > 0 ? (
              <>
                  <div className="pageTitle">
                    {`Search ${data?.total_results > 1 ? "results" : "result"} of '${query}' `}
                  </div>

                {/* intially data empty hota hai -- islea empty array diya
                and infinte scroll humara tb tk chle -- jb pagenum < total pages se */}
                <InfiniteScroll 
                className="content"
                dataLength={data?.results?.length || []}
                next={fetchNextPageData}
                hasMore={pageNum <= data?.total_pages}
                loader={<Spinner />}>
                  {data?.results.map((item, index) => {
                    if(item.media_type === "person") return;
                    
                    return (
                      <MovieCard key={index} data ={item} fromSearch={true}/>
                    )

                  })}
                </InfiniteScroll>

              </>

            ) : (
              // data available nhi hai agr suppose (error ko handle ka tareeka hai)
              <span className="resultNotFound">
                Sorry, Results not found!
              </span>
            )}
         </ContentWrapper>
      )}

    </div>
  )
};

export default SearchResult
