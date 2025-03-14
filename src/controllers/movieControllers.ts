import fetchFromTMDB from "../utils/tmdb";
import { Request, Response } from "express";

const getTrendingMovie = async (req: Request, res: Response): Promise<void> => {
    try {
        console.log("i am in the trending movie");
        const response = await fetchFromTMDB(
            "https://api.themoviedb.org/3/trending/movie/day?language=en-US"
        );
        console.log(response.results);
        const limited = response.results.slice(0, 5);
		res.json({ success: true, content: limited });
        // res.status(200).json(response);
    } catch (error) {
        console.log("i am not get the data");
        if (error instanceof Error) {
            console.log("i am in the error");
            res.status(500).json({ message: error.message });
            console.log(error.message);
        } else {
            console.log("i am in the unknown error");
            res.status(500).json({ message: "An unknown error occurred" });
        }
    }
}

const getNowPlayingMovies = async (req: Request, res: Response): Promise<void> => {
    try {
        const response = await fetchFromTMDB(
            "https://api.themoviedb.org/3/movie/now_playing"
        );
        res.json({ success: true, content: response.results });
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        } else {
            res.status(500).json({ message: "An unknown error occurred" });
        }
    }
}

const getMovieTrailer = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const response = await fetchFromTMDB(
            `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`
        );
        res.json({ success: true, content: response.results });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        } else {
            res.status(500).json({ message: "An unknown error occurred" });
        }
    }
}

const getMovieDetails = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const response = await fetchFromTMDB(
            `https://api.themoviedb.org/3/movie/${id}?language=en-US`
        );
        res.json({ success: true, content: response });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        } else {
            res.status(500).json({ message: "An unknown error occurred" });
        }
    }
}

const getSimilarMovies = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const response = await fetchFromTMDB(
            `https://api.themoviedb.org/3/movie/${id}/similar?language=en-US&page=1`
        );
        res.json({ success: true, content: response.results });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        } else {
            res.status(500).json({ message: "An unknown error occurred" });
        }
    }
}

const getRecommendationMovies = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const response = await fetchFromTMDB(
            `https://api.themoviedb.org/3/movie/${id}/recommendations?language=en-US&page=1`
        );
        res.json({ success: true, content: response.results });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        } else {
            res.status(500).json({ message: "An unknown error occurred" });
        }
    }
}
const getMoviesByCategory = async (req: Request, res: Response): Promise<void> => {
    try{
        const {category} = req.params;
        const response = await fetchFromTMDB(
            `https://api.themoviedb.org/3/movie/${category}?language=en-US&page=1`
        );
        res.json({ success: true, content: response.results });

    }
    catch(error){
        if(error instanceof Error){
            res.status(500).json({message: error.message});
        }else{
            res.status(500).json({message: "An unknown error occurred"});
        }
    }
}


export { getTrendingMovie, getNowPlayingMovies, getMovieTrailer, getMovieDetails, getSimilarMovies, getRecommendationMovies, getMoviesByCategory };




