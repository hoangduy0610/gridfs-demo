import { useState } from "react";
import { Button, Form, Layout, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { uploadFilesAPI } from "../../services/api";
import './upload.css'
import '../../components/layout/layout.css'
import { Content, Header } from "antd/es/layout/layout";

const UploadPage = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const onFinish = async () => {
    if (!file) {
      message.warning("Vui lòng chọn 1 video!");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    setIsUploading(true); 

    try {
      const res = await uploadFilesAPI(formData);
      console.log("API response:", res);
      if (!res?.id) {
        message.error("Tải lên lỗi!");
        return;
      }
      message.success("Tải lên thành công!");
      setFile(null);
    } catch (err) {
      message.error("Tải lên lỗi!");
    } finally {
      setIsUploading(false); // end loading
    }
  };

  return (
    <Layout className="app-layout ">
      <Header className="app-header transparent-header">
        <div className="logo"></div>
        <div className="header-actions">
          <Button type="default" onClick={() => window.location.href = "/home"}>Back to Video List</Button>
          <Button danger onClick={() => {
            localStorage.removeItem("access_token");
            window.location.href = "/";
          }}>Logout</Button>
        </div>
      </Header>
      <Content className="app-content">
        <div className="upload-container">
        <Form onFinish={onFinish} layout="vertical" className="upload-form">
            <Form.Item label="Select video file">
                <div className="centered">
                    <Upload
                    beforeUpload={(f) => {
                        setFile(f);
                        return false;
                    }}
                    maxCount={1}
                        accept="video/*"
                    >
                    <Button icon={<UploadOutlined />}>Choose Video</Button>
                </Upload>
                </div>
                
            </Form.Item>
            <Form.Item>
                <div className="centered">
                    <Button type="primary" htmlType="submit" loading={isUploading}>
                    Upload
                    </Button>
                </div>
            </Form.Item>
          </Form>
        </div>
      </Content>
      
    </Layout>
    
    
  );
};

export default UploadPage;
