import { Request, Response, Router } from 'express';
import VideoController from '../controllers/VideoController';

const router = Router();

router.get("/", (req: Request, res: Response) => VideoController.getVideoPlayer(req, res));
router.get('/init-video', (req: Request, res: Response) => VideoController.initVideo(req, res));
router.get("/mongo-video", (req: Request, res: Response) => VideoController.getMongoVideo(req, res));

export default router;