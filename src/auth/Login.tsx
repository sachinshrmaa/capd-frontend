import { Button, Col, Form, Input, message } from "antd";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import useUserContext from "../context/useUserContext";

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const [notification, notificationHolder] = message.useMessage();
  const { setUser } = useUserContext();

  const navigate = useNavigate();

  const handleLogin = async (values: any) => {
    let payload = {
      email: values.email,
      password: values.password,
    };
    try {
      setIsLoading(true);
      const res = await axios.post(
        "http://localhost:3000/api/v1/auth/login",
        payload,
        { withCredentials: true }
      );

      if (res.data.user.role === "Teacher") {
        navigate("/teacher/dashboard");
      } else if (res.data.user.role === "Student") {
        navigate("/student/dashboard");
      } else if (res.data.user.role === "Admin") {
        navigate("/admin/dashboard");
      }

      if (res.data.message === "Logged in successfully") {
        setUser(res.data.user);
        localStorage.setItem("name", res.data.user.name);
        localStorage.setItem("email", res.data.user.email);
        localStorage.setItem("role", res.data.user.role);
        localStorage.setItem("rollNo", res.data.user?.roll_no);
        localStorage.setItem("semesterId", res.data.user?.semester_id);
        localStorage.setItem("departmentId", res.data.user?.department_id);
      }

      setIsLoading(false);
    } catch (error) {
      notification.error({
        type: "error",
        content: "Invalid crendentials! Please try again.",
      });
      setIsLoading(false);
      console.log(error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-700 text-white">
      {notificationHolder}
      <Col className="w-[80%] md:w-full max-w-md p-6 bg-slate-900 rounded-lg shadow-md">
        <img
          src="/images/logo.png"
          alt="SIST logo"
          className="block h-10 w-160 md:h-14 md:w-200 mx-auto mb-4"
        />
        <h2 className="text-lg md:text-2xl text-center my-6">
          Welcome Back, Login
        </h2>
        <Form layout="vertical" onFinish={handleLogin}>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your email!",
              },
            ]}
            className="white-label"
          >
            <Input
              type="email"
              placeholder="Email"
              allowClear
              prefix={<UserOutlined />}
              className="h-10"
            />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
            className="white-label"
          >
            <Input.Password
              placeholder="Password"
              allowClear
              prefix={<LockOutlined />}
              className="h-10"
            />
          </Form.Item>

          <Form.Item>
            <Button
              loading={isLoading}
              type="primary"
              htmlType="submit"
              className="px-10 h-10"
            >
              Login
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </div>
  );
}
