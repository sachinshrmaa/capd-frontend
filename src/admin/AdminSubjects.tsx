import { Button, Col, Row, Table, message, Form, Select } from "antd";
import { useEffect, useState } from "react";
import { PlusCircleOutlined } from "@ant-design/icons";
import axios from "axios";

const { Option } = Select;

const columns = [
  {
    title: "Subject Name",
    dataIndex: "subject_name",
    key: "name",
  },
  {
    title: "Subject Code",
    dataIndex: "code",
    key: "code",
  },
  {
    title: "Assigned Teacher",
    dataIndex: "teacher_name",
    key: "teacher_name",
    // render: (record: any) => (
    //   <span>{record.teacher_name === null ? "-" : record.teacher_name} </span>
    // ),
  },
  {
    title: "Action",
    key: "action",
    // render: (text, record) => <Button>Edit</Button>,
  },
];

export default function AdminSubjects() {
  const [notification, notificationHolder] = message.useMessage();
  const [isLoading, setIsLoading] = useState(false);
  const [subjectsList, setSubjectsList] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [semesters, setSemesters] = useState([
    {
      name: "Semester 7",
    },
    {
      name: "Semester 6",
    },
  ]);

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

  const fetchSubjects = async (e: any) => {
    setIsLoading(true);
    let payload = {
      department: e.department,
      semester: e.semester,
    };
    try {
      const res = await axios.post(
        "http://localhost:3000/api/v1/academics/list-subjects",
        payload,
        { withCredentials: true }
      );
      setSubjectsList(res?.data?.subjects);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      notification.error({
        type: "error",
        content: "Couldn't fetch subjects! Please try again.",
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
            <h1 className="font-bold text-lg mb-0">Subjects</h1>
            <div>
              <Button type="primary" className="flex items-center h-10">
                <PlusCircleOutlined className="text-lg mr-1" />
                Add Subjects
              </Button>
            </div>
          </div>
        </Col>

        <Col span={24}>
          <Form onFinish={fetchSubjects} layout="vertical">
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
                      <Option value={department?.name}>
                        {department.name}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={6} className="pr-2">
                <Form.Item
                  label="Semester"
                  name="semester"
                  rules={[
                    {
                      required: true,
                      message: "Please select a semester",
                    },
                  ]}
                >
                  <Select placeholder="Select Semester" allowClear>
                    {semesters.map((semester: any) => (
                      <Option value={semester.name}>{semester.name}</Option>
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
            dataSource={subjectsList}
            loading={isLoading}
          />
        </Col>
      </Row>
    </div>
  );
}
