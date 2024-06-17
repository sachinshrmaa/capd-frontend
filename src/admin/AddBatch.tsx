import { Button, Form, Input, Select, message } from "antd";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const { Option } = Select;

export default function AddBatch() {
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

  const handleAddBatch = async (values: any) => {
    let payload = {
      name: values.name,
      departmentId: values.department,
      startYear: values.startYear,
      endYear: values.endYear,
    };
    setIsLoading(true);
    try {
      setIsLoading(true);
      const res = await axios.post(
        "http://localhost:3000/api/v1/academics/add-batch",
        payload,
        { withCredentials: true }
      );
      console.log(res);
      notification.error({
        type: "success",
        content: "Batch added successfully!",
      });
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
        <h1 className="font-bold text-lg mb-0">Add Batch</h1>
      </div>

      <div className="bg-slate-100 p-6 rounded-lg">
        <Form layout="vertical" onFinish={handleAddBatch}>
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
            label="Batch Name"
            rules={[
              {
                required: true,
                message: "Please enter the batch name!",
              },
            ]}
          >
            <Input type="text" placeholder="eg: 20-24" />
          </Form.Item>

          <Form.Item
            name="startYear"
            label="Start Year"
            rules={[
              {
                required: true,
                message: "Please enter the start year!",
              },
            ]}
          >
            <Input type="text" placeholder="eg: 2020" />
          </Form.Item>

          <Form.Item
            name="endYear"
            label="End Year"
            rules={[
              {
                required: true,
                message: "Please enter the end year!",
              },
            ]}
          >
            <Input type="text" placeholder="eg: 2024" />
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
