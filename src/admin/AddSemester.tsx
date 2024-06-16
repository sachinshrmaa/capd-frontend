import { Button, DatePicker, Form, Input, Select } from "antd";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const { Option } = Select;

export default function AddSemester() {
  const [departments, setDepartments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [batches, setBatches] = useState([]);

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

  const fetchBatches = async (department: string) => {
    let payload = {
      department: department,
    };
    try {
      const res = await axios.post(
        "http://localhost:3000/api/v1/academics/list-batches",
        payload,
        { withCredentials: true }
      );
      setBatches(res?.data?.batches);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddSemester = async (values: any) => {
    let payload = {
      name: values.name,
      batchId: values.batch,
      startDate: values.startDate,
      endDate: values.endDate,
    };
    setIsLoading(true);
    try {
      setIsLoading(true);
      const res = await axios.post(
        "http://localhost:3000/api/v1/academics/add-semester",
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
        <h1 className="font-bold text-lg mb-0">Add Semester</h1>
      </div>

      <div className="bg-slate-100 p-6 rounded-lg">
        <Form layout="vertical" onFinish={handleAddSemester}>
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
            <Select
              placeholder="Select Department"
              onSelect={(val) => fetchBatches(val)}
              allowClear
            >
              {departments.map((department: any) => (
                <Option value={department?.department_id}>
                  {department.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="batch"
            label="Select batch"
            rules={[
              {
                required: true,
                message: "Please select a batch",
              },
            ]}
          >
            <Select placeholder="Select batch" allowClear>
              {batches.map((batch: any) => (
                <Option value={batch?.batch_id}>{batch.name}</Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="name"
            label="Semester Name"
            rules={[
              {
                required: true,
                message: "Please enter the semester name!",
              },
            ]}
          >
            <Input type="text" placeholder="eg: Semester 1" />
          </Form.Item>

          <Form.Item
            name="startDate"
            label="Start Date"
            rules={[
              {
                required: true,
                message: "Please enter the start date!",
              },
            ]}
          >
            {/* <Input type="text" placeholder="eg: 01-01-2020" /> */}
            <DatePicker />
          </Form.Item>

          <Form.Item
            name="endDate"
            label="End Date"
            rules={[
              {
                required: true,
                message: "Please enter the end date!",
              },
            ]}
          >
            {/* <Input type="text" placeholder="eg: 30-06-2020" /> */}
            <DatePicker />
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
