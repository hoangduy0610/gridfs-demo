import { Request, Response } from "express";
import fs from "fs";
import { GridFSBucket, MongoClient } from "mongodb";

const dbDsn = process.env.DB_URL || "mongodb://localhost:27017";

class VideoController {
    public static async getVideoPlayer(req: Request, res: Response) {
        const file = fs.createReadStream(__dirname + "/../../views/index.html");
        res.writeHead(200, { "Content-Type": "text/html" });
        file.pipe(res);
    };

    public static async initVideo(req: Request, res: Response) {
        const mongoClient = new MongoClient(dbDsn);
        await mongoClient.connect();

        try {
            const db = mongoClient.db("videos");
            const bucket = new GridFSBucket(db);
            const videoUploadStream = bucket.openUploadStream("bigbuck");
            const videoReadStream = fs.createReadStream(__dirname + "/../../resources/bigbuck.mp4");
            videoReadStream.pipe(videoUploadStream);
            res.status(200).send("Done...");
        } catch (e) {
            console.error(e);
            res.status(500).send("Error uploading video");
        } finally {
            mongoClient.close();
        }
    };

    public static async getMongoVideo(req: Request, res: Response) {
        const mongoClient = new MongoClient(dbDsn);
        await mongoClient.connect();
        try {
            const range = req.headers.range;
            if (!range) {
                res.status(400).send("Requires Range header");
                return;
            }

            const db = mongoClient.db("videos");
            const video = await db.collection("fs.files").findOne({});
            if (!video) {
                res.status(404).send("No video uploaded!");
                return;
            }

            const videoSize = video.length;
            const start = Number(range.replace(/\D/g, ""));
            const end = videoSize - 1;

            const contentLength = end - start + 1;
            const headers = {
                "Content-Range": `bytes ${start}-${end}/${videoSize}`,
                "Accept-Ranges": "bytes",
                "Content-Length": contentLength,
                "Content-Type": "video/mp4",
            };

            res.writeHead(206, headers);

            const bucket = new GridFSBucket(db);
            const downloadStream = bucket.openDownloadStreamByName("bigbuck", {
                start,
            });

            downloadStream.pipe(res);
        } catch (e) {
            console.error(e);
            res.status(500).send("Error streaming video");
        } finally {
            mongoClient.close();
        }
    }
}

export default VideoController;
