import  { useState } from "react";
import type { FormProps } from "antd";
import { App, Button,  Form, Input } from "antd";
import { useNavigate } from "react-router-dom";
import { loginAPI } from "../../services/api";
import { useCurrentAppContext } from "../../components/context/app.context";
import './login.css';

type FieldType = {
  username: string;
  password: string;
};



const LoginPage = () => {
    const [isSubmit, setIsSubmit] = useState(false);
    const { message, notification } = App.useApp();
    const { setIsAuthenticated, setUser } = useCurrentAppContext();
    const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
        const { username, password } = values;
        setIsSubmit(true);
        const res = await loginAPI(username, password);
        console.log("API response:", res);
        setIsSubmit(false);
        if (res?.token) {
            setUser(res.info);
            setIsAuthenticated(true);
            localStorage.setItem("access_token", res.token);
            message.success("Login successfully!");
            console.log("Logged in, navigating to /home");

            navigate("/home");
        } else {
            notification.error({
                message: "Something went wrong",
                duration: 5,
            });
        }
    };
    const navigate = useNavigate();
    const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
        errorInfo
    ) => {
        console.log("Failed:", errorInfo);
    };

    return (
    <div className="login-wrapper">
        <div className="login-box">
        <h2>Login</h2>
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
            <Form.Item<FieldType>
                label="Username"
                name="username"
                rules={[{ required: true, message: "Please input your username!" }]}
            >
                <Input />
            </Form.Item>
            <Form.Item<FieldType>
                label="Password"
                name="password"
                rules={[{ required: true, message: "Please input your password!" }]}
            >
                <Input.Password />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit" loading={isSubmit} block>
                    Login
                </Button>
            </Form.Item>
        </Form>

        <div className="login-bottom-row">
            <span>Don't have an account?</span>
            <Button type="link" onClick={() => navigate("/register")}>
                Register
            </Button>
        </div>
        </div>
    </div>
    );
};

export default LoginPage;