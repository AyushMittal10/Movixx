import axios from "axios";

const BASE_URL = "https://api.themoviedb.org/3";
const TMDB_TOKEN = import.meta.env.VITE_APP_TMDB_TOKEN;

const headers = {
    Authorization: "bearer " + 
    TMDB_TOKEN,
};

// agr api fetch successful to call hogi -- varna api msg
// get -- 1st argument is url, 2nd is options (configurations)
// axois se jo milega -- data meh and usko return kr diya hum ne
export const fetchDataFromApi = async (url, params) => {
    try {
        const {data} = await axios.get(BASE_URL + url, {
            headers,
            params
        }) 
        return data;
    } catch (err) {
        console.log(err);
        return err;
    }
}