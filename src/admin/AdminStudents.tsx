import { Button, Col, Form, Row, Select, Table, message } from "antd";
import { useEffect, useState } from "react";
import { PlusCircleOutlined } from "@ant-design/icons";
import axios from "axios";
import { Link } from "react-router-dom";

const { Option } = Select;

const columns = [
  {
    title: "Roll No.",
    dataIndex: "roll_no",
    key: "roll_number",
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Semester",
    dataIndex: "semester",
    key: "semester",
  },
  // {
  //   title: "Action",
  //   key: "action",
  //   render: (text, record) => <Button>Edit</Button>,
  // },
];

export default function AdminStudents() {
  const [notification, notificationHolder] = message.useMessage();
  const [isLoading, setIsLoading] = useState(false);
  const [departments, setDepartments] = useState([]);
  const [batches, setBatches] = useState([]);
  const [studentsList, setStudentsList] = useState([]);
  const [studentDetails, setStudentDetails] = useState({
    department: "",
    batch: "",
  });

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
      notification.error({
        type: "error",
        content: "Couldn't fetch departments! Please try again.",
      });
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

  const fetchStudents = async () => {
    setIsLoading(true);
    let payload = {
      department: studentDetails.department,
      batch: studentDetails.batch,
    };
    try {
      const res = await axios.post(
        "http://localhost:3000/api/v1/students/list-students",
        payload,
        { withCredentials: true }
      );
      setStudentsList(res?.data?.students);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      notification.error({
        type: "error",
        content: "Couldn't fetch students! Please try again.",
      });
      console.log(error);
    }
  };

  return (
    <div>
      {notificationHolder}
      <Row>
        <Col span={24} className="py-3">
          <div className="flex justify-between">
            <h1 className="font-bold text-lg mb-0">Students</h1>
            <div>
              <Link to="/admin/students/add">
                <Button type="primary" className="flex items-center h-10">
                  <PlusCircleOutlined className="text-lg mr-1" />
                  Add Student
                </Button>
              </Link>
            </div>
          </div>
        </Col>

        <Col span={24}>
          <Form onFinish={fetchStudents} layout="vertical">
            <Row gutter={16}>
              <Col span={6} className="pr-2">
                <Form.Item
                  label="Department"
                  name="department"
                  rules={[
                    {
                      required: true,
                      message: "Please select a department",
                    },
                  ]}
                >
                  <Select
                    placeholder="Select Department"
                    onChange={(value) => {
                      setStudentDetails({
                        ...studentDetails,
                        department: value,
                      });
                      fetchBatches(value);
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
              </Col>
              <Col span={6} className="pr-2">
                <Form.Item
                  label="Batch"
                  name="batch"
                  rules={[
                    {
                      required: true,
                      message: "Please select a batch",
                    },
                  ]}
                >
                  <Select
                    placeholder="Select Batch"
                    onChange={(value) =>
                      setStudentDetails({
                        ...studentDetails,
                        batch: value,
                      })
                    }
                    allowClear
                  >
                    {batches.map((batch: any) => (
                      <Option value={batch.name}>{batch.name}</Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>

              <Col span={6} className="pr-2">
                <Form.Item>
                  <Button type="primary" htmlType="submit" className="mt-7">
                    Submit
                  </Button>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Col>

        <Col span={24} className="mt-6">
          <Table
            columns={columns}
            dataSource={studentsList}
            loading={isLoading}
          />
        </Col>
      </Row>
    </div>
  );
}
