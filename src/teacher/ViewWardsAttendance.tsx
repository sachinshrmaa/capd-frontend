import { Col, Row, Table } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";

type AttendanceLogType = {
  roll_no: string;
  name: string;
  absent_count: number;
  present_count: number;
  total_count: number;
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
    title: "Total Absent Sessions",
    dataIndex: "absent_count",
  },
  {
    title: "Total Present Sessions",
    dataIndex: "present_count",
  },
  {
    title: "Total Sessions",
    dataIndex: "total_count",
  },
];

export default function ViewWardsAttendance() {
  const [isLoading, setIsLoading] = useState(false);
  const [attendanceLog, setAttendanceLog] = useState<AttendanceLogType[]>([]);

  useEffect(() => {
    fetchWardsAttendance();
  }, []);

  const fetchWardsAttendance = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_API_URL}/teachers/list-wards-attendance`,
        { withCredentials: true }
      );

      const tempAttendanceLog: AttendanceLogType[] = res?.data?.attendance.map(
        (item: any) => {
          return {
            roll_no: item.roll_no,
            name: item.name,
            absent_count: item.absent_count,
            present_count: item.present_count,
            total_count: Number(item.absent_count) + Number(item.present_count),
          };
        }
      );

      setAttendanceLog(tempAttendanceLog);
      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      console.log(error.message);
    }
  };

  return (
    <div>
      <Row>
        <Col span={24} className="py-3">
          <h1 className="font-bold text-lg mb-0">View Wards Attendance</h1>
        </Col>

        <Col span={24} className="my-6">
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
