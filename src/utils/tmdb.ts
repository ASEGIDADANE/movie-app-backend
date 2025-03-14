

import axios from "axios";
// import { AxiosRequestConfig } from "axios";
import { METHODS } from "http";

const fetchFromTMDB = async (url: string): Promise<any> => {
    console.log("fetching from TMDB");
    if (!process.env.TMDB_API_KEY) {
        throw new Error("TMDB_API_KEY is not defined in environment variables");
    }
    console.log("TMDB_API_KEY:" + process.env.TMDB_API_KEY);

    const options= {
         

        headers: {
            accept: "application/json",
            Authorization: `Bearer ${process.env.AccessToken}`
        }
    };
    console.log("fetching from TMDB2");

    try{
        console.log("fetching is going to start");
    const response = await axios.get(url, options);
    console.log(response);
    if (response.status !== 200) {
        throw new Error("Failed to fetch data from TMDB: " + response.statusText);
        console.log("fetching can not get the data");
    }

    return response.data;
}
catch(error){
    console.log("i am not get the data");
    if (error instanceof Error) {
        console.log("i am in the error");
        console.log(error.message);
    } else {
        console.log("i am in the unknown error");
    }

};
};

export default fetchFromTMDB;
