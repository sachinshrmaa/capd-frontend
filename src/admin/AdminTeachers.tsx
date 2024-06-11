import { Button, Col, Form, Row, Select, Table, message } from "antd";
import { useEffect, useState } from "react";
import { PlusCircleOutlined } from "@ant-design/icons";
import axios from "axios";

const { Option } = Select;

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Contact",
    dataIndex: "email",
    key: "email",
  },
  // {
  //   title: "Action",
  //   key: "action",
  //   // render: (text, record) => <Button>Edit</Button>,
  // },
];

export default function AdminTeachers() {
  const [notification, notificationHolder] = message.useMessage();
  const [isLoading, setIsLoading] = useState(false);
  const [teachersList, setTeachersList] = useState([]);
  const [departments, setDepartments] = useState([]);

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

  const fetchTeachers = async (e: any) => {
    setIsLoading(true);
    let payload = {
      department: e.department,
    };
    try {
      const res = await axios.post(
        "http://localhost:3000/api/v1/teachers/list-teachers",
        payload,
        { withCredentials: true }
      );
      setTeachersList(res?.data?.teachers);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      notification.error({
        type: "error",
        content: "Couldn't fetch teachers! Please try again.",
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
            <h1 className="font-bold text-lg mb-0">Teachers</h1>
            <div>
              <Button type="primary" className="flex items-center h-10">
                <PlusCircleOutlined className="text-lg mr-1" />
                Add Teachers
              </Button>
            </div>
          </div>
        </Col>

        <Col span={24}>
          <Form onFinish={fetchTeachers} layout="vertical">
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
                      <Option value={department.name}>{department.name}</Option>
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
            dataSource={teachersList}
            loading={isLoading}
          />
        </Col>
      </Row>
    </div>
  );
}
