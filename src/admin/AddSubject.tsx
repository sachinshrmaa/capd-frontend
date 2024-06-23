import { Button, Form, Input, Select, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const { Option } = Select;

export default function AddSubject() {
  const navigate = useNavigate();
  const [notification, notificationHolder] = message.useMessage();
  const [departments, setDepartments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [batches, setBatches] = useState([]);
  const [semesters, setSemesters] = useState([]);

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

  const fetchSemesters = async (dept: number) => {
    let payload = {
      department: dept,
    };
    try {
      const res = await axios.post(
        "http://localhost:3000/api/v1/academics/list-semesters",
        payload,
        { withCredentials: true }
      );
      setSemesters(res?.data?.semesters);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddSubject = async (values: any) => {
    let payload = {
      name: values.name,
      code: values.code,
      departmentId: values.departmentId,
      semesterId: values.semesterId,
    };
    setIsLoading(true);
    try {
      setIsLoading(true);
      const res = await axios.post(
        "http://localhost:3000/api/v1/academics/add-subject",
        payload,
        { withCredentials: true }
      );
      console.log(res);
      notification.success({
        type: "success",
        content: "Subject added successfully!",
      });
      setTimeout(() => {
        navigate("/admin/subjects");
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
        <h1 className="font-bold text-lg mb-0">Add Subject</h1>
      </div>

      <div className="bg-slate-100 p-6 rounded-lg">
        <Form layout="vertical" onFinish={handleAddSubject}>
          <Form.Item
            name="departmentId"
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
              onSelect={(val) => {
                fetchBatches(val);
                fetchSemesters(val);
              }}
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
            name="batchId"
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
            name="semesterId"
            label="Select semester"
            rules={[
              {
                required: true,
                message: "Please select a semester",
              },
            ]}
          >
            <Select placeholder="Select semester" allowClear>
              {semesters.map((semester: any) => (
                <Option value={semester.semester_id}>{semester.name}</Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="name"
            label="Subject Name"
            rules={[
              {
                required: true,
                message: "Please enter the subject name!",
              },
            ]}
          >
            <Input type="text" placeholder="eg: Maths" />
          </Form.Item>

          <Form.Item
            name="code"
            label="Subject code"
            rules={[
              {
                required: true,
                message: "Please enter the subject code!",
              },
            ]}
          >
            <Input type="text" placeholder="eg: BTCO-UG-301" />
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
