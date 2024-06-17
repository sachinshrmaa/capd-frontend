import { Button, Col, Form, Row, Select, Table, Tag, message } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";

type SubjectListType = {
  subject_name: string;
  code: string;
  semester: string;
};

type AttendanceLogType = {
  roll_no: string;
  name: string;
  attendance_percentage: number;
};

const columns = [
  {
    title: "Roll No",
    dataIndex: "roll_no",
  },
  {
    title: "Name",
    dataIndex: "name",
  },
  {
    title: "Attendance",
    dataIndex: "attendance_percentage",
    render: (text: any) => (
      <Tag color={text >= 75 ? "green" : "red"} key={text}>{`${text.toFixed(
        2
      )}%`}</Tag>
    ),
  },
];

export default function ViewSubjectAttendance() {
  const [notification, notificationHolder] = message.useMessage();
  const [appliedFilter, setAppliedFilter] = useState("");
  const [subjectsList, setSubjectsList] = useState<SubjectListType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [attendanceLog, setAttendanceLog] = useState<AttendanceLogType[]>([]);

  const [filteredLogs, setFilteredLogs] = useState<AttendanceLogType[]>([]);

  useEffect(() => {
    fetchSubjects();
  }, []);

  const handleFilter = (value: string) => {
    if (value === "eligible") {
      const filteredData = attendanceLog.filter((log) => {
        return log.attendance_percentage >= 75;
      });
      setFilteredLogs(filteredData);
      console.log("ele", filteredData);
    } else {
      const filteredData = attendanceLog.filter((log) => {
        return log.attendance_percentage < 75;
      });
      console.log("non ele", filteredData);
      setFilteredLogs(filteredData);
    }
  };

  const fetchSubjects = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(
        "http://localhost:3000/api/v1/teachers/list-teacher-subjects",
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

  const fetchSubjectAttendance = async (e: any) => {
    let payload = {
      subjectCode: e.subject,
    };
    try {
      setIsLoading(true);
      const res = await axios.post(
        "http://localhost:3000/api/v1/attendance/subject-overall-attendance",
        payload,
        { withCredentials: true }
      );

      let tempData: any = [];

      res?.data?.attendance?.forEach((student: any) => {
        let newData = {
          roll_no: student.roll_no,
          name: student.name,
          attendance_percentage: Number(
            ((student.total_classes - student.absent_classes) /
              student.total_classes) *
              100
          ),
        };
        tempData.push(newData);
      });

      setAttendanceLog(tempData);
      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      console.log(error.message);
    }
  };

  return (
    <div>
      {notificationHolder}

      <Row>
        <Col span={24} className="py-3">
          <h1 className="font-bold text-lg mb-0">View Subject Attendance</h1>
        </Col>

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
                  <Select placeholder="Select Subject">
                    {subjectsList.map((subject) => (
                      <Select.Option value={subject.code}>
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
                <Form.Item label="Filter by status" name="status">
                  <Select
                    placeholder="Select status"
                    options={[
                      { label: "Eligible", value: "eligible" },
                      { label: "Not-Eliglible", value: "notEliglible" },
                    ]}
                    onSelect={(value) => {
                      setAppliedFilter(value);
                      handleFilter(value);
                    }}
                  />
                </Form.Item>
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

        <Col span={24} className="my-6">
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
