import { Form, Button, message, Input, Table } from "antd";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import Papa from "papaparse";

const columns = [
  {
    title: "Roll No.",
    dataIndex: "rollNo",
    key: "rollNo",
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Department Id",
    dataIndex: "departmentId",
    key: "departmentId",
  },
  {
    title: "Batch Id",
    dataIndex: "batchId",
    key: "batchId",
  },
  {
    title: "Semester Id",
    dataIndex: "semesterId",
    key: "semesterId",
  },
  // {
  //   title: "Action",
  //   key: "action",
  //   render: (text, record) => <Button>Edit</Button>,
  // },
];

export default function AddStudents() {
  const [students, setStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileUpload = (e: any) => {
    const file = e.target.files[0];
    Papa.parse(file, {
      header: true,
      complete: (results: any) => {
        setStudents(results.data);
      },
    });
  };

  const handleAddStudents = async () => {
    try {
      setIsLoading(true);
      const res = await axios.post(
        "https://capd-backend.onrender.com/api/v1/students/add-students",
        students,
        { withCredentials: true }
      );
      console.log(res.data);
      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      console.log(error.message);
      message.error(`Could not upload students.`);
    }
  };

  return (
    <div>
      <div className="mt-2 mb-6">
        <h1 className="font-bold text-lg mb-0">Add Students</h1>
      </div>

      <div className="bg-slate-100 p-6 rounded-lg">
        <Form layout="vertical" onFinish={handleAddStudents}>
          <Form.Item
            name="students"
            label="Upload Students"
            rules={[
              {
                required: true,
                message: "Please upload students",
              },
            ]}
          >
            <Input
              type="file"
              name="file"
              accept=".csv"
              onChange={handleFileUpload}
            />
          </Form.Item>
          <div className="flex gap-4">
            <Form.Item>
              <Link to="/admin/students">
                <Button type="primary" danger>
                  Cancel
                </Button>
              </Link>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" loading={isLoading}>
                Import Students
              </Button>
            </Form.Item>
          </div>
        </Form>
      </div>

      <div className="my-6">
        {students.length > 0 && (
          <>
            <p className="mb-4 text-md font-bold">Students Data</p>
            <Table dataSource={students} columns={columns} pagination={false} />
          </>
        )}
      </div>
    </div>
  );
}
