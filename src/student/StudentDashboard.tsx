import { Bar } from "@ant-design/charts";
import {
  CloseCircleOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { Button, Col, Row } from "antd";
import { useState } from "react";
import { Link } from "react-router-dom";

const dummyData = [
  {
    subject_name: "DCC",
    attendance_percentage: 88,
  },
  {
    subject_name: "DBMS",
    attendance_percentage: 68,
  },
  {
    subject_name: "OOPS",
    attendance_percentage: 78,
  },
  {
    subject_name: "OS",
    attendance_percentage: 40,
  },
];

export default function StudentDashboard() {
  const [studentAttendance, setStudentAttendance] = useState(dummyData);

  const config = {
    data: studentAttendance,
    xField: "subject_name",
    yField: "attendance_percentage",
    colorField: "subject_name",
    // legend: {
    //   color: { size: 100, autoWrap: true, maxRows: 3, cols: 6 },
    // },
  };

  return (
    <div>
      <Row>
        <Col span={24}>
          <h1 className="font-bold text-lg mb-4">Student Dashboard</h1>

          <div className="bg-slate-700 text-white rounded-lg p-6 my-4">
            <h1 className="font-bold">Student Details</h1>
            <div className="mt-3">
              <p>Name: {localStorage.getItem("name")}</p>
              <p>Sem: 8</p>
              <p>Batch: 2020-2024</p>
            </div>
          </div>
        </Col>

        <Col span={24}>
          <div className="flex items-center justify-between mb-4">
            <h1 className="font-bold text-lg">Overall Attendance</h1>

            <Link
              to="/student/attendance"
              className="text-blue-900 hover:text-blue-700 underline"
            >
              <Button type="primary">View Details</Button>
            </Link>
          </div>
        </Col>

        <Col span={24}>
          <div className="grid grid-cols-2 gap-10 mb-8">
            <div className="col-span-1 border rounded-lg">
              <Bar {...config} />
            </div>
            <div className="col-span-1 border p-6 rounded-lg">
              <h1 className="font-semibold mb-6">Improvement Suggestions</h1>
              {studentAttendance.map((sub) => {
                if (sub.attendance_percentage < 50) {
                  return (
                    <div className="border rounded-lg bg-red-200 py-5 px-4 my-4 flex items-center gap-3">
                      <CloseCircleOutlined className="text-2xl text-slate-700" />
                      <p>
                        You have very low attendance in{" "}
                        <b>{sub.subject_name}</b>.
                      </p>
                    </div>
                  );
                } else if (sub.attendance_percentage < 75) {
                  return (
                    <div className="border rounded-lg bg-orange-100 py-5 px-4 my-4 flex items-center gap-3">
                      <ExclamationCircleOutlined className="text-2xl text-slate-700" />
                      <p>
                        You have low attendance in <b>{sub.subject_name}</b>.
                      </p>
                    </div>
                  );
                }
              })}
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
}
