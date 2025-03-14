import {getTrendingMovie, getNowPlayingMovies, getMovieTrailer, getMovieDetails, getSimilarMovies, getRecommendationMovies, getMoviesByCategory} from '../controllers/movieControllers';
import express from 'express';
import { protectRoute } from '../middlewares/protectedRoute';

const router = express.Router();

router.get('/trending', getTrendingMovie);
router.get('/nowplaying', getNowPlayingMovies);
router.get('/trailer/:id', getMovieTrailer);
router.get('/details/:id', getMovieDetails);
router.get('/similar/:id', getSimilarMovies);
router.get('/recommendations/:id', getRecommendationMovies);
router.get(':category', getMoviesByCategory);

export default router;