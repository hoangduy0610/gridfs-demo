import { Button, Layout, message } from "antd";
import { useState } from "react";
import { useParams } from "react-router-dom";
import "./video-player.css";
import { Content, Header } from "antd/es/layout/layout";
import "../../components/layout/layout.css";
import { ArrowLeftOutlined } from "@ant-design/icons";

const VideoPlayerPage = () => {
  const { id } = useParams();
  const [downloadVideoUrl] = useState<string | null>(null);
  const videoUrl = 'https://gridfs-api.evovou.store/files';

  const downloadVideo = () => {
    if (!id) {
      message.error("Invalid video id.");
      return;
    }

    const fileUrl = `${videoUrl}/${id}`;
    const link = document.createElement("a");
    link.href = fileUrl;
    link.download = "video.mp4";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    message.success("Video downloading!");
  };


  return (
    <Layout className="app-layout ">
      <Header className="app-header transparent-header">
        <Button
          variant="outlined"
          color="primary"
          onClick={() => window.location.href = "/home"}
        >
          <ArrowLeftOutlined />
          Back
        </Button>
        <div className="header-actions">

          <Button danger onClick={() => {
            localStorage.removeItem("access_token");
            window.location.href = "/";
          }}>Logout</Button>
        </div>
      </Header>
      <Content className="app-content">
        <div className="video-page">
          <h2>Now Playing</h2>

          {videoUrl ? (
            <video controls width="100%" autoPlay >
              <source src={`${videoUrl}/${id}`} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          ) : (
            <p className="loading-text">Loading video...</p>
          )}

          <button onClick={downloadVideo} className="download-button">
            Download Video
          </button>
          {downloadVideoUrl && (
            <a href={downloadVideoUrl} download className="download-link">
              Click here to download the video
            </a>
          )}
        </div>
      </Content>
    </Layout>
  );
};

export default VideoPlayerPage;