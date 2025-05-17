import React, { useState } from "react";
import type { FormProps } from "antd";
import { App, Button, Checkbox, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";
import { loginAPI } from "../../services/api";
import { useCurrentAppContext } from "../components/context/app.context";

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
            message.success("Đăng nhập tài khoản thành công!");
            console.log("Logged in, navigating to /home");

            navigate("/home");
        } else {
            notification.error({
                message: "Có lỗi xảy ra",
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
        <div className="flex justify-center items-center flex-1 h-[100vh] w-[100vw]">
        <div className="bg-gray-200 rounded-2xl p-12 w-[30vw]">
            <Form
            name="basic"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            layout="vertical"
            labelCol={{ span: 24 }}
            >
            <Form.Item<FieldType>
                labelCol={{
                span: 24,
                }}
                wrapperCol={{ span: 24 }}
                label="Username"
                name="username"
                rules={[{ required: true, message: "Please input your username!" }]}
            >
                <Input />
            </Form.Item>
            <Form.Item<FieldType>
                labelCol={{
                span: 24,
                }}
                wrapperCol={{ span: 24 }}
                label="Password"
                name="password"
                rules={[{ required: true, message: "Please input your password!" }]}
            >
                <Input.Password />
            </Form.Item>
            <Form.Item
                label={null}
                wrapperCol={{ span: 24 }}
                labelCol={{
                span: 24,
                }}
            >
                <Button type="primary" htmlType="submit" loading={isSubmit}>
                Login
                </Button>
            </Form.Item>
            </Form>
        </div>
        </div>
    );
};

export default LoginPage;