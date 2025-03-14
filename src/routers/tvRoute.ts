import {getTrendingTv, getPopularTv, getTvTrailers, getTvDetails, getSimilarTvs, getRecommendationTvs, getTvsByCategory, getTvKeywords} from '../controllers/tvController'; 
import express from 'express';
import { protectRoute } from '../middlewares/protectedRoute';

const router = express.Router();

router.get('/trending', getTrendingTv);
router.get('/popular', getPopularTv);
router.get('/trailer/:id', getTvTrailers);
router.get('/details/:id', getTvDetails);
router.get('/similar/:id', getSimilarTvs);
router.get('/recommendations/:id', getRecommendationTvs);
router.get('/:category', getTvsByCategory);
router.get('/keywords/:id', getTvKeywords);

export default router;