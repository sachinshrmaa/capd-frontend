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
  const [filteredLogs, setFilteredLogs] = useState<AttendanceLogType[]>([]);

  useEffect(() => {
    fetchSubjects();
  }, []);

  const handleFilter = (value: string) => {
    if (value === "Present") {
      const filteredData = attendanceLog.filter((log) => {
        return log.status === "Present";
      });
      setFilteredLogs(filteredData);
      console.log("present", filteredData);
    } else {
      const filteredData = attendanceLog.filter((log) => {
        return log.status === "Absent";
      });
      console.log("absent", filteredData);
      setFilteredLogs(filteredData);
    }
  };

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
          <div className="bg-slate-100 rounded-lg border mt-4 py-6 px-6 grid grid-cols-2 gap-10 items-start">
            <Form
              layout="vertical"
              onFinish={fetchSubjectAttendance}
              className="grid grid-cols-3 items-end gap-4"
            >
              <div className="col-span-2">
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
              </div>

              <div>
                <Form.Item>
                  <Button type="primary" className="px-6" htmlType="submit">
                    Submit
                  </Button>
                </Form.Item>
              </div>
            </Form>

            <div>
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
                        onChange={(value) => {
                          setAppliedFilter(value);
                          handleFilter(value);
                        }}
                        allowClear
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
            </div>
          </div>
        </Col>

        <Col span={24} className="my-8">
          <Table
            columns={columns}
            dataSource={appliedFilter.length > 0 ? filteredLogs : attendanceLog}
            loading={isLoading}
          />
        </Col>
      </Row>
    </div>
  );
}
