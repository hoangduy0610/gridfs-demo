import { Application } from 'express';
import apiRouter from './api';

class Routes {
    public mountApi(_express: Application): Application {
        return _express.use(`/`, apiRouter);
    }
}

export default new Routes;