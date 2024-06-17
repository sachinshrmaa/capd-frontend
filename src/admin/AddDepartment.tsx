import { Button, Form, Input } from "antd";
import TextArea from "antd/es/input/TextArea";
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function AddDepartment() {
  const [isLoading, setIsLoading] = useState(false);

  const handleAddDepartment = async (values: any) => {
    let payload = {
      name: values.name,
      description: values.description,
    };
    setIsLoading(true);
    try {
      setIsLoading(true);
      // Add the department
      const res = await axios.post(
        "https://capd-backend.onrender.com/api/v1/academics/add-department",
        payload,
        { withCredentials: true }
      );
      console.log(res);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
    setIsLoading(false);
  };

  return (
    <div>
      <div className="mt-2 mb-6">
        <h1 className="font-bold text-lg mb-0">Add Departments</h1>
      </div>

      <div className="bg-slate-100 p-6 rounded-lg">
        <Form layout="vertical" onFinish={handleAddDepartment}>
          <Form.Item
            name="name"
            label="Department Name"
            rules={[
              {
                required: true,
                message: "Please enter the department name!",
              },
            ]}
          >
            <Input type="text" placeholder="Enter department name" />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={[
              {
                required: true,
                message: "Please enter the description!",
              },
            ]}
          >
            <TextArea placeholder="Enter department description" />
          </Form.Item>
          <div className="flex gap-4">
            <Form.Item>
              <Link to="/admin/departments">
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
