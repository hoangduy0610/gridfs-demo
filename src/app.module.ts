import express, { Application } from "express";
import Routes from "./routes";

class AppModule {
    public express: Application;

    constructor() {
        this.express = express();
        this.mountRoutes();

        this.startListener();
    }

    private mountRoutes(): void {
        this.express.use(express.json());
        this.express.use(express.urlencoded({ extended: true }));
        this.express = Routes.mountApi(this.express);
    }

    private startListener(): void {
        const port = process.env.PORT || 3000;
        this.express.listen(port, () => {
            console.log(`Server is running on http://localhost:${port}`);
        });
    }
}

export default AppModule;