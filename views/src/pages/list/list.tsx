import { useEffect, useState } from "react";
import { List, Button, message } from "antd";
import { useNavigate } from "react-router-dom";
import { deleteFileByIdAPI, getFilesAPI } from "../../services/api";
import {ReloadOutlined} from "@ant-design/icons";
import "./list.css";

const VideoListPage = () => {
    const [videos, setVideos] = useState<any[]>([]);
    const navigate = useNavigate();

    const fetchVideos = async () => {
        try {
                const res = await getFilesAPI();
                console.log("API response:", res);
            if (!res) {
                message.error("Failed to fetch videos.");
                return;
            }
                setVideos(res);
            } catch (err) {
                message.error("Failed to fetch videos.");
            }
    };

    const handleDelete = async (id: string) => {
        try {
            const res = await deleteFileByIdAPI(id);
            console.log("API response:", res);
            if (!res) {
                message.error("Failed to delete videos.");
                return;
            }
            message.success("Video deleted successfully!");
            fetchVideos();
        } catch (err) {
            message.error("Failed to delete videos.");
        }
    };

    useEffect(() => {
        fetchVideos();
    }, []);

    return (
    <div className="video-list-container">
        <div className="video-list-header">
            <h1>Video List</h1>
            <Button type="default" icon={<ReloadOutlined />} onClick={() => {
                fetchVideos();
                message.success("Videos reloaded successfully!");
                }
            } />
        </div>
        <List
            dataSource={videos}
            renderItem={(video: any) => (
            <List.Item className="video-item"
                actions={[
                <Button className="watch-button" onClick={() => navigate(`/watch/${video._id}`)}>
                    Watch
                </Button>,
                <Button className="delete-button" onClick={() => handleDelete(video._id)}>
                    Delete
                </Button>,
                
                ]}
            >
                {video.filename}
            </List.Item>
            )}
        />
        
    </div>
    );
};

export default VideoListPage;
