// explore tv and more movies ki functionality deta hai
// ye humara search result component jesa hi hai 
// select genre -- sort by (ye chize bhi aa gyi)
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";

// ye library -- select genre and sort by vli functionality deti hai
import Select from "react-select";

import "./style.scss";

// api call krenge islea use fetch hook import kiya
import useFetch from "../../hooks/useFetch";

// direct api call vla bhi import kr diya
import { fetchDataFromApi } from "../../utils/api";
import ContentWrapper from "../../components/contentWrapper/ContentWrapper";
import MovieCard from "../../components/movieCard/MovieCard";
import Spinner from "../../components/spinner/Spinner";

let filters = {};

// ye data librarymeh pss -- toh filter hoke aaega data
const sortbyData = [
    { value: "popularity.desc", label: "Popularity Descending" },
    { value: "popularity.asc", label: "Popularity Ascending" },
    { value: "vote_average.desc", label: "Rating Descending" },
    { value: "vote_average.asc", label: "Rating Ascending" },
    {
        value: "primary_release_date.desc",
        label: "Release Date Descending",
    },
    { value: "primary_release_date.asc", label: "Release Date Ascending" },
    { value: "original_title.asc", label: "Title (A-Z)" },
];

const Explore = () => {
  // data, pagenum, loading -- teeno vahi same states hai (search result vli)
    const [data, setData] = useState(null);
    const [pageNum, setPageNum] = useState(1);
    const [loading, setLoading] = useState(false);

    // genre konsa -- sort kese -- kis liye tv and movie unke states
    const [genre, setGenre] = useState(null);
    const [sortby, setSortby] = useState(null);
    const { mediaType } = useParams();

    // api call krwa li genres ki (cz genre show krenge)
    // moviecard meh (fromsearch se yehi rating vgera hum hide krte)
    // https://api.themoviedb.org/3/genre/movie/list
    const { data: genresData } = useFetch(`/genre/${mediaType}/list?api_key=92332e061c5435118655378b57551af3`);

    // like search result -- hum call kr rhe api ko
    // IMPPP -- params use from api.js jo abhi tk calling meh use kiya nhi
    
    // filter meh initially empty bhejte object and jese hi value select krte
    // ye filter vla update ho jaata hai
    const fetchInitialData = () => {
        setLoading(true);
        // https://api.themoviedb.org/3/discover/movie
        fetchDataFromApi(`/discover/${mediaType}?api_key=92332e061c5435118655378b57551af3`, filters).then((res) => {
            setData(res);
            setPageNum((prev) => prev + 1);
            setLoading(false);
        });
    };


    // IMPPP -- & aaega calling api meh
    const fetchNextPageData = () => {
        fetchDataFromApi(
            `/discover/${mediaType}?page=${pageNum}&api_key=92332e061c5435118655378b57551af3`,
            filters
        ).then((res) => {
            if (data?.results) {
                setData({
                    ...data,
                    results: [...data?.results, ...res.results],
                });
            } else {
                setData(res);
            }
            setPageNum((prev) => prev + 1);
        });
    };



    // mediatype change (mtlb tv ya movie) toh ye call hoga
    useEffect(() => {
        filters = {};
        setData(null);
        setPageNum(1);
        setSortby(null);
        setGenre(null);
        fetchInitialData();
    }, [mediaType]);



    // jb bhi explore meh -- select genre change (ya sort by) change (dono ke liye)
    // selecteditems meh jo value select ki (kitne genre, crime, action, romantic)(uski id and name aa jayega)
    // action meh -- options jo ahi id, name vo dikh jayega
    // sbse phle toh state set hogi aapki
    // action clear nhi -- mtlb show krro unn genre ko (varna clear krna -- delete it)
    // genre meh api call meh id, name aata
    // hume discover meh api meh endpoint meh -- id bhejni hai (like -- "4,5,6,7,8")
    // ids ka hume array mil jaega
    // array ko string meh convert by stringify ("[4,5,6,7,8]")
    // slice se [ and ] remove kr diya kyuki bss id hi bhejni hai
    // fir filter meh ek key assign ki -- 'with genres" ke naam se and id usko assign ki
    const onChange = (selectedItems, action) => {
        if (action.name === "sortby") {
            setSortby(selectedItems);
            if (action.action !== "clear") {
                filters.sort_by = selectedItems.value;
            } else {
                delete filters.sort_by;
            }
        }

        if (action.name === "genres") {
            setGenre(selectedItems);
            if (action.action !== "clear") {
                let genreId = selectedItems.map((g) => g.id);
                genreId = JSON.stringify(genreId).slice(1, -1);
                filters.with_genres = genreId;
            } else {
                delete filters.with_genres;
            }
        }

        setPageNum(1);
        fetchInitialData();
    };



    return (
        <div className="explorePage">
            <ContentWrapper>
                <div className="pageHeader">
                    <div className="pageTitle">
                        {mediaType === "tv"
                            ? "Explore TV Shows"
                            : "Explore Movies"}
                    </div>
                    <div className="filters">

                      {/* ye hai select genre vla ye component (call from select library) 
                      iss meh onchange (dropdown meh se change kiya) and options imppp hote
                      ismulti(multiple hai na humare select (genre, sortby)) -- props hai,
                      */}

                      {/* dusre vle select ke liye custom array le rha (sort by)
                      phle vle select meh -- api jo call krayi uss meh genre ka data bhej rhe in "options"
                      getoptionlabel meh -- callback hota function to vo call kr diya (value ke liye ID de di hai) */}

                        <Select
                            isMulti
                            name="genres"
                            value={genre}
                            closeMenuOnSelect={false}
                            options={genresData?.genres}
                            getOptionLabel={(option) => option.name}
                            getOptionValue={(option) => option.id}
                            onChange={onChange}
                            placeholder="Select genres"
                            className="react-select-container genresDD"
                            classNamePrefix="react-select"
                        />
                        <Select
                            name="sortby"
                            value={sortby}
                            options={sortbyData}
                            onChange={onChange}
                            isClearable={true}
                            placeholder="Sort by"
                            className="react-select-container sortbyDD"
                            classNamePrefix="react-select"
                        />
                    </div>
                </div>
                {loading && <Spinner initial={true} />}
                {!loading && (
                    <>
                        {data?.results?.length > 0 ? (
                            <InfiniteScroll
                                className="content"
                                dataLength={data?.results?.length || []}
                                next={fetchNextPageData}
                                hasMore={pageNum <= data?.total_pages}
                                loader={<Spinner />}
                            >
                                {data?.results?.map((item, index) => {
                                    if (item.media_type === "person") return;
                                    return (
                                        <MovieCard
                                            key={index}
                                            data={item}
                                            mediaType={mediaType}
                                        />
                                    );
                                })}
                            </InfiniteScroll>
                        ) : (
                            <span className="resultNotFound">
                                Sorry, Results not found!
                            </span>
                        )}
                    </>
                )}
            </ContentWrapper>
        </div>
    );
};

export default Explore;