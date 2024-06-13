import { Button, Col, Form, Row, Select, Table, Tag } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import moment from "moment";

const columns = [
  {
    key: "attendance_date",
    title: "Date",
    dataIndex: "attendance_date",
    render: (time_stamp: string) => moment(time_stamp).format("DD/MM/YYYY"),
  },
  {
    key: "status",
    title: "Attendance Status",
    dataIndex: "status",
    render: (status: string) =>
      status === "Present" ? (
        <span className="font-bold text-green-500">P</span>
      ) : (
        <span className="font-bold text-red-500">A</span>
      ),
  },
];

type SubjectListType = {
  subject_id: number;
  subject_name: string;
  code: string;
  teacher_name: string;
};

type AttendanceLogType = {
  attendance_date: string;
  status: string;
};

export default function StudentAttendance() {
  const [appliedFilter, setAppliedFilter] = useState("");
  const [subjectsList, setSubjectsList] = useState<SubjectListType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [attendanceLog, setAttendanceLog] = useState<AttendanceLogType[]>([]);

  useEffect(() => {
    fetchSubjects();
  }, []);

  const fetchSubjects = async () => {
    let payload = {
      departmentId: localStorage.getItem("departmentId"),
      semesterId: localStorage.getItem("semesterId"),
    };
    try {
      const res = await axios.post(
        "http://localhost:3000/api/v1/academics/list-subjects",
        payload,
        { withCredentials: true }
      );
      setSubjectsList(res?.data?.subjects);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const fetchSubjectAttendance = async (values: any) => {
    let payload = {
      rollNo: localStorage.getItem("rollNo"),
      subjectId: values.subject,
    };
    try {
      setIsLoading(true);
      const res = await axios.post(
        "http://localhost:3000/api/v1/attendance/subject-attendance",
        payload,
        { withCredentials: true }
      );
      setAttendanceLog(res?.data?.attendance);
      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      console.log(error.message);
    }
  };

  return (
    <div>
      <nav className="my-2">
        <Link
          to="/student/dashboard"
          className="text-blue-500 hover:text-blue-700"
        >
          ← back to dashboard
        </Link>
      </nav>
      <Row>
        <Col span={24}>
          <div className="bg-slate-100 rounded-lg border mt-6 px-6 grid grid-cols-2">
            <div className="my-4">
              <Form layout="vertical" onFinish={fetchSubjectAttendance}>
                <Row gutter={20}>
                  <Col span={16}>
                    <Form.Item
                      label="Select Subject"
                      name="subject"
                      rules={[
                        {
                          required: true,
                          message: "Please select a subject!",
                        },
                      ]}
                    >
                      <Select placeholder="Select Subject" allowClear>
                        {subjectsList.map((subject) => (
                          <Select.Option value={subject.subject_id}>
                            {subject.subject_name}
                          </Select.Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col span={4}>
                    <Form.Item>
                      <Button
                        type="primary"
                        className="mt-[30px] px-6"
                        htmlType="submit"
                      >
                        Submit
                      </Button>
                    </Form.Item>
                  </Col>
                </Row>
              </Form>
            </div>

            {/* <div className="my-4">
              <h1 className="font-bold text-lg mb-4">Overall Attendance</h1>
               <p>Subject: {classDetails?.subject_name}</p>
              <p>Total Classes: {classDetails?.total_classes}</p>
              <p>Present Classes: {classDetails?.total_present}</p>
              <p>Absent Classes: {classDetails?.total_absent}</p>
            </div> */}
          </div>
        </Col>

        <Col span={12} className="my-6">
          <Form layout="vertical">
            <Row gutter={20}>
              <Col span={12}>
                <Form.Item label="Filter by status" name="status">
                  <Select
                    placeholder="Select status"
                    options={[
                      { label: "Present", value: "Present" },
                      { label: "Absent", value: "Absent" },
                    ]}
                    onChange={(value) => setAppliedFilter(value)}
                  />
                </Form.Item>
              </Col>
            </Row>
          </Form>

          {appliedFilter.length != 0 && (
            <div>
              <p className="mb-3">Applied Filter:</p>
              <Tag closable={true} onClose={() => setAppliedFilter("")}>
                {appliedFilter}
              </Tag>
            </div>
          )}
        </Col>

        <Col span={24} className="mt-1 mb-6">
          <Table
            columns={columns}
            dataSource={attendanceLog}
            loading={isLoading}
          />
        </Col>
      </Row>
    </div>
  );
}
