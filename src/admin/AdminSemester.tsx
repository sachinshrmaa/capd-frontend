import { useEffect, useState } from "react";
import { MoreOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { Button, Col, Row, Table, Form, Select } from "antd";
import axios from "axios";
import { Link } from "react-router-dom";
import moment from "moment";

const { Option } = Select;

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Start Date",
    dataIndex: "start_date",
    key: "start_year",
    render: (time_stamp: string) => moment(time_stamp).format("DD/MM/YYYY"),
  },
  {
    title: "End Date",
    dataIndex: "end_date",
    key: "end_year",
    render: (time_stamp: string) => moment(time_stamp).format("DD/MM/YYYY"),
  },
  {
    title: "Action",
    key: "action",
    render: () => (
      <Button type="text">
        <MoreOutlined />
      </Button>
    ),
  },
];

export default function AdminSemester() {
  const [isLoading, setIsLoading] = useState(false);
  const [departments, setDepartments] = useState([]);
  const [semesters, setSemesters] = useState([]);

  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_API_URL}/academics/list-departments`,
        { withCredentials: true }
      );
      setDepartments(res?.data?.departments);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchSemesters = async (e: any) => {
    setIsLoading(true);
    let payload = {
      department: e.department,
    };
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_API_URL}/academics/list-semesters`,
        payload,
        { withCredentials: true }
      );
      setSemesters(res?.data?.semesters);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      //   notification.error({
      //     type: "error",
      //     content: "Couldn't fetch semsters! Please try again.",
      //   });
      console.log(error);
    }
  };

  return (
    <div>
      <Row>
        <Col span={24} className="py-3">
          <div className="flex justify-between">
            <h1 className="font-bold text-lg mb-0">Semesters</h1>
            <div>
              <Link to="/admin/semesters/add">
                <Button type="primary" className="flex items-center h-10">
                  <PlusCircleOutlined className="text-lg mr-1" />
                  Add Semester
                </Button>
              </Link>
            </div>
          </div>
        </Col>

        <Col span={24}>
          <Form onFinish={fetchSemesters} layout="vertical">
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
                  <Select placeholder="Select Department" allowClear>
                    {departments.map((department: any) => (
                      <Option value={department?.department_id}>
                        {department.name}
                      </Option>
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
          <Table columns={columns} dataSource={semesters} loading={isLoading} />
        </Col>
      </Row>
    </div>
  );
}
