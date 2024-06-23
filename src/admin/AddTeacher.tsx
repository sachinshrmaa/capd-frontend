import { Button, Form, Input, Select, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const { Option } = Select;

export default function AddTeacher() {
  const navigate = useNavigate();
  const [notification, notificationHolder] = message.useMessage();
  const [departments, setDepartments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    try {
      const res = await axios.get(
        "http://localhost:3000/api/v1/academics/list-departments",
        { withCredentials: true }
      );
      setDepartments(res?.data?.departments);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddTeacher = async (values: any) => {
    let payload = {
      name: values.name,
      email: values.email,
      password: values.password,
      departmentId: values.department,
    };
    setIsLoading(true);
    try {
      setIsLoading(true);
      const res = await axios.post(
        "http://localhost:3000/api/v1/teachers/add-teacher",
        payload,
        { withCredentials: true }
      );
      console.log(res);
      notification.success({
        type: "success",
        content: "Teacher added successfully!",
      });
      setTimeout(() => {
        navigate("/admin/teachers");
      }, 1000);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
    setIsLoading(false);
  };

  return (
    <div>
      {notificationHolder}
      <div className="mt-2 mb-6">
        <h1 className="font-bold text-lg mb-0">Add Teacher</h1>
      </div>

      <div className="bg-slate-100 p-6 rounded-lg">
        <Form layout="vertical" onFinish={handleAddTeacher}>
          <Form.Item
            name="department"
            label="Select Department"
            rules={[
              {
                required: true,
                message: "Please select a department",
              },
            ]}
          >
            <Select placeholder="Select Department" allowClear>
              {departments.map((department: any) => (
                <Option value={department?.department_id}>
                  {department.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="name"
            label="Teacher Name"
            rules={[
              {
                required: true,
                message: "Please enter the teacher name!",
              },
            ]}
          >
            <Input type="text" placeholder="eg: Repshika Pradhan" />
          </Form.Item>

          <Form.Item
            name="email"
            label="Email"
            rules={[
              {
                required: true,
                message: "Please enter email",
              },
            ]}
          >
            <Input type="text" placeholder="eg: repshika@sist.edu.in" />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[
              {
                required: true,
                message: "Please enter password!",
              },
            ]}
          >
            <Input type="password" placeholder="Set a password" />
          </Form.Item>

          <div className="flex gap-4">
            <Form.Item>
              <Link to="/admin/batches">
                <Button type="primary" danger>
                  Cancel
                </Button>
              </Link>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" loading={isLoading}>
                Add
              </Button>
            </Form.Item>
          </div>
        </Form>
      </div>
    </div>
  );
}
