import fetchFromTMDB from "../utils/tmdb";
import { Request, Response } from "express";

const getTrendingTv = async (req: Request, res: Response): Promise<void> => {
    try {
        const response = await fetchFromTMDB(
            "https://api.themoviedb.org/3/trending/tv/day?language=en-US"
        );
        const randomMovie = response.results[Math.floor(Math.random() * response.results.length)];
        res.json({ success: true, content: randomMovie });

    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        } else {
            res.status(500).json({ message: "An unknown error occurred" });
        }
    }

}

const getPopularTv = async (req: Request, res: Response): Promise<void> => {
    
    try {
        const response = await fetchFromTMDB(
            "https://api.themoviedb.org/3/tv/popular?language=en-US&page=1"
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

const getTvTrailers = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
        const response = await fetchFromTMDB(
            `https://api.themoviedb.org/3/tv/${id}/videos?language=en-US`
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

const getTvDetails = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
        const response = await fetchFromTMDB(
            `https://api.themoviedb.org/3/tv/${id}?language=en-US`   
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
const getSimilarTvs = async (req: Request, res: Response): Promise<void> => {
    const {id} = req.params;
    try {
        const response = await fetchFromTMDB(
            `https://api.themoviedb.org/3/tv/${id}/similar?language=en-US&page=1`
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

const getRecommendationTvs = async (req: Request, res: Response): Promise<void> => {
    const {id} = req.params;
    try{
        const response = await fetchFromTMDB(
            `https://api.themoviedb.org/3/tv/${id}/recommendations?language=en-US&page=1`
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

const getTvsByCategory = async (req: Request, res: Response): Promise<void> => {
    const { category } = req.params;
    try{
        const response = await fetchFromTMDB(
            `https://api.themoviedb.org/3/tv/${category}?language=en-US&page=1`  
        );
        res.json({ success: true, content: response.results });
    }
    catch(error){

        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        } else {
            res.status(500).json({ message: "An unknown error occurred" });
        }
    }
}
const  getTvKeywords = async (req: Request, res: Response): Promise<void> => {
    const{id}  =  req.params;
    try{
        const response = await fetchFromTMDB(
            `https://api.themoviedb.org/3/tv/${id}/keywords`
        );
        res.json({ success: true, content: response.results });
    }
    catch(error){
        if(error instanceof Error){
            res.status(500).json({ message: error.message });
        }
        else{
            res.status(500).json({ message: "An unknown error occurred" });
        }
    }
}

export { getTrendingTv, getPopularTv, getTvTrailers, getTvDetails, getSimilarTvs, getRecommendationTvs, getTvsByCategory, getTvKeywords };
