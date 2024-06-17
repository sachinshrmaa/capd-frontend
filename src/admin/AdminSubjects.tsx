import {
  Button,
  Col,
  Row,
  Table,
  message,
  Form,
  Select,
  Dropdown,
  Menu,
} from "antd";
import { useEffect, useState } from "react";
import { MoreOutlined, PlusCircleOutlined } from "@ant-design/icons";
import axios from "axios";
import { Link } from "react-router-dom";
import AssignSubjectTeacher from "./AssignSubjectTeacher";

const { Option } = Select;

export default function AdminSubjects() {
  const [notification, notificationHolder] = message.useMessage();
  const [isLoading, setIsLoading] = useState(false);
  const [subjectsList, setSubjectsList] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [semesters, setSemesters] = useState([]);
  const [assignTeacher, setAssignTeacher] = useState(false);

  const [teachers, setTeachers] = useState([]);
  const [subjectProp, setSubjectProp] = useState({
    subjectId: "",
    subjectName: "",
  });

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
    },
    {
      title: "Action",
      key: "action",
      render: (record: any) => (
        <Dropdown
          overlay={
            <Menu>
              <Menu.Item key="1">
                <Link
                  to="#"
                  onClick={() => {
                    setAssignTeacher(true);
                    setSubjectProp({
                      subjectId: record.subject_id,
                      subjectName: record.subject_name,
                    });
                  }}
                >
                  Assign Teacher
                </Link>
              </Menu.Item>
              <Menu.Item key="2">
                <Link to="/admin/subjects/edit">Edit</Link>
              </Menu.Item>
              <Menu.Item key="3">
                <Link to="/admin/subjects/edit">Delete</Link>
              </Menu.Item>
            </Menu>
          }
          placement="bottomLeft"
          arrow
        >
          <Button type="text">
            <MoreOutlined />
          </Button>
        </Dropdown>
      ),
    },
  ];

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
      notification.error({
        type: "error",
        content: "Couldn't fetch semsters! Please try again.",
      });
      console.log(error);
    }
  };

  const fetchSubjects = async (e: any) => {
    setIsLoading(true);
    let payload = {
      departmentId: e.department,
      semesterId: e.semester,
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

  const fetchTeachers = async (departmentId: number) => {
    let payload = { department: departmentId };
    try {
      const res = await axios.post(
        "http://localhost:3000/api/v1/teachers/list-teachers",
        payload,
        { withCredentials: true }
      );

      setTeachers(res?.data?.teachers);
    } catch (error: any) {
      console.log(error.message);
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
              <Link to="/admin/subjects/add">
                <Button type="primary" className="flex items-center h-10">
                  <PlusCircleOutlined className="text-lg mr-1" />
                  Add Subjects
                </Button>
              </Link>
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
                  <Select
                    placeholder="Select Department"
                    onSelect={(value: any) => {
                      fetchSemesters(value);
                      fetchTeachers(value);
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
                      <Option value={semester.semester_id}>
                        {semester.name}
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
          <Table
            columns={columns}
            dataSource={subjectsList}
            loading={isLoading}
          />
        </Col>
      </Row>
      <AssignSubjectTeacher
        isModalOpen={assignTeacher}
        setIsModalOpen={setAssignTeacher}
        subjectProp={subjectProp}
        teachers={teachers}
      />
    </div>
  );
}
