import { useState } from 'react';
import { App, Button, Form, Input } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useCurrentAppContext } from '../../components/context/app.context';
import type { FormProps } from 'antd';
import { registerAPI } from '../../services/api'; // <- make sure this import exists
import './register.css';
import '../../pages/register/register.css';

type FieldType = {
  username: string;
  password: string;
  // role: string;
  name: string;
  email: string;
  description: string;
};

const RegisterPage = () => {
  const [isSubmit, setIsSubmit] = useState(false);
  const { message, notification } = App.useApp();
  const { setIsAuthenticated, setUser } = useCurrentAppContext();
  const navigate = useNavigate();

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    setIsSubmit(true);
    const res = await registerAPI(
      values.username,
      values.password,
      // values.role,
      values.name,
      values.email,
      values.description
    );
    setIsSubmit(false);
    console.log("API response:", res);
    if (res?.message === "OK") {
      setUser(res.info);
      setIsAuthenticated(true);
      localStorage.setItem("access_token", res.token);
      message.success("Register successfully!");
      navigate("/");
    } else {
      notification.error({
        message: "Something went wrong",
        duration: 5,
      });
    }
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="login-wrapper">
      <div className="login-box">
        <h2>Register</h2>
        <Form
          name="basic"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          layout="vertical"
          labelCol={{ span: 24 }}
        >
          <Form.Item label="Username" name="username" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Password" name="password" rules={[{ required: true }]}>
            <Input.Password />
          </Form.Item>
          {/* <Form.Item label="Role" name="role" rules={[{ required: true }]}>
            <Select placeholder="Select a role">
              <Select.Option value="ROLE_ADMIN">Admin</Select.Option>
                <Select.Option value="ROLE_USER">User</Select.Option>
            </Select>
          </Form.Item> */}
          <Form.Item label="Name" name="name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Email" name="email" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Description" name="description" rules={[{ required: true }]}>
            <Input.TextArea />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={isSubmit} block>
              Register
            </Button>
          </Form.Item>
        </Form>
        <div className="login-bottom-row">
          <span>Already have an account?</span>
          <Button type="link" onClick={() => navigate("/")}>
            Return to Login
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
