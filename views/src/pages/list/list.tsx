import { DeleteOutlined, EyeOutlined, ReloadOutlined } from "@ant-design/icons";
import { Button, Card, Dropdown, List, message, type MenuProps } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteFileByIdAPI, getFilesAPI } from "../../services/api";
import "./list.css";

const VideoListPage = () => {
    const [videos, setVideos] = useState<any[]>([]);
    const navigate = useNavigate();

    const handleMenuClick: MenuProps['onClick'] = (e) => {
        e.domEvent.stopPropagation()
    }

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

    const getMenuProps = (video: any) => ({
        items: [
            {
                label: 'Watch',
                key: '1',
                icon: <EyeOutlined />,
                onClick: () => {
                    navigate(`/watch/${video._id}`)
                }
            },
            {
                label: 'Delete',
                key: '2',
                danger: true,
                icon: <DeleteOutlined />,
                onClick: () => {
                    handleDelete(video._id);
                }
            }
        ],
        onClick: handleMenuClick
    })

    useEffect(() => {
        fetchVideos();
    }, []);

    return (
        <div className="video-list-container">
            <div className="video-list-header">
                <h1>Video List</h1>
                <Button color="primary" variant="outlined" icon={<ReloadOutlined />} onClick={() => {
                    fetchVideos();
                    message.success("Videos reloaded successfully!");
                }}>
                    Reload
                </Button>
            </div>
            <List
                grid={{
                    gutter: 16,
                    xs: 1,
                    sm: 2,
                    md: 4,
                    lg: 4,
                    xl: 6,
                    xxl: 8,
                }}
                dataSource={videos}
                renderItem={(video: any) => (
                    <List.Item
                        style={{
                            cursor: "pointer",
                        }}
                        onClick={() => navigate(`/watch/${video._id}`)}
                    >
                        <Card
                            cover={<img alt="video thumbnail" src="https://douglasgreen.com/wp-content/uploads/2014/03/video-play-btn-featured.png" />}
                            variant="outlined"
                        >
                            <Dropdown.Button
                                style={{
                                    position: "absolute",
                                    top: 10,
                                    right: 10,
                                    justifyContent: "end",
                                }}
                                size={'middle'}
                                getPopupContainer={(trigger) => trigger.parentElement as HTMLElement}
                                buttonsRender={([leftBtn, rightBtn]) => [
                                    null,
                                    <span onClick={(e) => e.stopPropagation()}>
                                        {rightBtn}
                                    </span>
                                ]}
                                trigger={['click']}
                                menu={(() => getMenuProps(video))()}
                            />
                            <Card.Meta title={video.filename.split(".")[0]} />
                        </Card>
                    </List.Item>
                )}
            />
        </div>
    );
};

export default VideoListPage;
