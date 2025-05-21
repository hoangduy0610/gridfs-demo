import { Layout, Button } from "antd";
import { useNavigate } from "react-router-dom";
import { useCurrentAppContext } from "../context/app.context";
import "./layout.css";
import VideoListPage from "../../pages/list/list";

const { Header, Content } = Layout;

const Appx = () => {
  const navigate = useNavigate();
  const { setIsAuthenticated, setUser } = useCurrentAppContext();

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    setUser(null);
    setIsAuthenticated(false);
    navigate("/");
  };

  return (
    <Layout className="app-layout">
      <Header className="app-header">
        <div className="logo">GridFS Demo</div>
        <div className="header-actions">
          <Button type="default" onClick={() => navigate("/upload")}>Upload</Button>
          <Button danger onClick={handleLogout}>Logout</Button>
        </div>
      </Header>
      <Content className="app-content">
        <VideoListPage/>
        
      </Content>
    </Layout>
  );
};

export default Appx;
