import express, { Application, Request, Response } from "express";
import fs from "fs";
import mongodb, { MongoClient } from 'mongodb';
require('dotenv').config([".env"]);

const url = process.env.DB_URL || "mongodb://localhost:27017";

async function main() {
    const app: Application = express();

    app.get("/", async function (req: Request, res: Response) {
        const file = fs.createReadStream(__dirname + "/../views/index.html");
        res.writeHead(200, { 'Content-Type': 'text/html' });
        file.pipe(res);
    });

    // Sorry about this monstrosity
    app.get('/init-video', async function (req: Request, res: Response) {
        const mongoClient = new MongoClient(url)
        await mongoClient.connect();

        try {
            const db = mongoClient.db('videos');
            const bucket = new mongodb.GridFSBucket(db);
            const videoUploadStream = await bucket.openUploadStream('bigbuck');
            const videoReadStream = await fs.createReadStream('./bigbuck.mp4');
            await videoReadStream.pipe(videoUploadStream);
            res.status(200).send("Done...");
        } catch (e) {
            console.error(e);
            res.status(500).send("Error uploading video");
        } finally {
            mongoClient.close();
        }

    });

    app.get("/mongo-video", async function (req: Request, res: Response) {
        const mongoClient = new MongoClient(url)
        await mongoClient.connect();
        try {
            const range = req.headers.range;
            if (!range) {
                res.status(400).send("Requires Range header");
                return;
            }

            const db = mongoClient.db('videos');
            // GridFS Collection
            const video = await db.collection('fs.files').findOne({});
            if (!video) {
                res.status(404).send("No video uploaded!");
                return;
            }

            // Create response headers
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

            // HTTP Status 206 for Partial Content
            await res.writeHead(206, headers);

            const bucket = new mongodb.GridFSBucket(db);
            const downloadStream = bucket.openDownloadStreamByName('bigbuck', {
                start
            });

            // Finally pipe video to response
            await downloadStream.pipe(res);
        } catch (e) {
            console.error(e);
            res.status(500).send("Error streaming video");
        } finally {
            mongoClient.close();
        }
    });

    app.listen(8000, async function () {
        console.log("Listening on port 8000!");
    });
}

main()
    .then(console.log)
    .catch(console.error);
