import fetchFromTMDB from "../utils/tmdb";
import { Response } from "express";
import User, { IUser } from "../models/userModel";
import { AuthenticatedRequest } from "../types";

const searchPerson = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
        const { query } = req.params;
        const response = await fetchFromTMDB(
            `https://api.themoviedb.org/3/search/person?query=${query}&include_adult=false&language=en-US&page=1`
        );

        if (response.results.length === 0) {
            res.status(404).json({ message: "No results found" });
            return;
        }

        if (req.user) {
            await User.findByIdAndUpdate(req.user._id, {
                $push: {
                    searchHistory: {
                        id: response.results[0].id,
                        image: response.results[0].profile_path,
                        title: response.results[0].name,
                        searchType: "person",
                        createdAt: new Date(),
                    },
                },
            });
        }

        res.json({ success: true, content: response.results });
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        } else {
            res.status(500).json({ message: "An unknown error occurred" });
        }
    }
};

const searchMovie = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
        const { query } = req.params;
        const response = await fetchFromTMDB(
            `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`
        );

        if (response.results.length === 0) {
            res.status(404).json({ message: "No results found" });
            return;
        }

        if (req.user) {
            await User.findByIdAndUpdate(req.user._id, {
                $push: {
                    searchHistory: {
                        id: response.results[0].id,
                        image: response.results[0].poster_path,
                        title: response.results[0].title,
                        searchType: "movie",
                        createdAt: new Date(),
                    },
                },
            });
        }

        res.json({ success: true, content: response.results });
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        } else {
            res.status(500).json({ message: "An unknown error occurred" });
        }
    }
};

const searchTv = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
        const { query } = req.params;
        const response = await fetchFromTMDB(
            `https://api.themoviedb.org/3/search/tv?query=${query}&include_adult=false&language=en-US&page=1`
        );

        if (response.results.length === 0) {
            res.status(404).json({ message: "No results found" });
            return;
        }

        if (req.user) {
            await User.findByIdAndUpdate(req.user._id, {
                $push: {
                    searchHistory: {
                        id: response.results[0].id,
                        image: response.results[0].poster_path,
                        title: response.results[0].name,
                        searchType: "tv",
                        createdAt: new Date(),
                    },
                },
            });
        }

        res.json({ success: true, content: response.results });
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        } else {
            res.status(500).json({ message: "An unknown error occurred" });
        }
    }
};

const getSearchHistory = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
        const user = await User.findById(req.user?._id).exec();
        res.json({ success: true, content: user?.searchHistory });
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        } else {
            res.status(500).json({ message: "An unknown error occurred" });
        }
    }
};

const removeItemFromSearchHistory = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    let id = req.params.id;
    const idNumber = parseInt(id);

    try {
        await User.findByIdAndUpdate(req.user?._id, {
            $pull: {
                searchHistory: { id: idNumber }
            }
        });
        res.json({ success: true, message: "Item removed from search history" });
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        } else {
            res.status(500).json({ message: "An unknown error occurred" });
        }
    }
};

export { searchPerson, searchMovie, searchTv, getSearchHistory, removeItemFromSearchHistory };