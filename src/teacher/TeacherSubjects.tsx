import { Button, Col, Row, Table, message } from "antd";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

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
    title: "Semester",
    dataIndex: "sem",
    key: "sem",
    // render: (record: any) => (
    //   <span>{record.teacher_name === null ? "-" : record.teacher_name} </span>
    // ),
  },
  {
    title: "Action",
    key: "action",
    render: (record: any) => (
      <Link
        to={`log-attendance?subjectId=${record.subject_id}&semId=${record.semester_id}`}
      >
        <Button type="primary">Log attendance</Button>
      </Link>
    ),
  },
];

export default function TeacherSubjects() {
  const [notification, notificationHolder] = message.useMessage();
  const [isLoading, setIsLoading] = useState(false);
  const [subjectsList, setSubjectsList] = useState([]);

  useEffect(() => {
    fetchSubjects();
  }, []);

  const fetchSubjects = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(
        "https://capd-backend.onrender.com/api/v1/teachers/list-teacher-subjects",
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
          <h1 className="font-bold text-lg mb-0">Subjects</h1>
        </Col>

        <Col span={24} className="mt-4">
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
