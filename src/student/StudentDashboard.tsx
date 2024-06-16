import { Bar } from "@ant-design/charts";
import {
  CloseCircleOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { Button, Col, Row, Spin } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

type StudentOverallAttendanceType = {
  subjectName: string;
  subjectAttendance: number;
};

export default function StudentDashboard() {
  const [studentAttendance, setStudentAttendance] = useState<
    StudentOverallAttendanceType[]
  >([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchStudentOverallAttendance();
  }, []);

  const config = {
    data: studentAttendance,
    xField: "subjectName",
    yField: "subjectAttendance",
    colorField: "subjectName",
  };

  const fetchStudentOverallAttendance = async () => {
    let payload = {
      rollNo: localStorage.getItem("rollNo"),
      semesterId: localStorage.getItem("semesterId"),
    };
    try {
      setIsLoading(true);
      const res = await axios.post(
        "http://localhost:3000/api/v1/attendance/overall-attendance",
        payload,
        { withCredentials: true }
      );

      let tempData: any = [];

      res?.data?.attendance?.forEach((subject: any) => {
        let newData = {
          subjectName: subject.name,
          subjectAttendance:
            ((subject.total_classes - subject.absent_classes) /
              subject.total_classes) *
            100,
        };
        tempData.push(newData);
      });

      console.log(tempData);
      setStudentAttendance(tempData);
      setIsLoading(false);
    } catch (error: any) {
      console.log(error);
      setIsLoading(false);
    }
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
              <p>Roll No: {localStorage.getItem("rollNo")}</p>
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
            {isLoading ? (
              <Spin className="mt-6" />
            ) : (
              <div className="col-span-1 border rounded-lg">
                <Bar {...config} />
              </div>
            )}

            <div className="col-span-1 border p-6 rounded-lg">
              <h1 className="font-semibold mb-6">Improvement Suggestions</h1>
              {isLoading ? (
                <Spin className="my-6" />
              ) : (
                studentAttendance.map((sub) => {
                  if (sub.subjectAttendance < 50) {
                    return (
                      <div className="border rounded-lg bg-red-200 py-5 px-4 my-4 flex items-center gap-3">
                        <CloseCircleOutlined className="text-2xl text-slate-700" />
                        <p>
                          You have very low attendance in{" "}
                          <b>{sub.subjectName}</b>.
                        </p>
                      </div>
                    );
                  } else if (sub.subjectAttendance < 75) {
                    return (
                      <div className="border rounded-lg bg-orange-100 py-5 px-4 my-4 flex items-center gap-3">
                        <ExclamationCircleOutlined className="text-2xl text-slate-700" />
                        <p>
                          You have low attendance in <b>{sub.subjectName}</b>.
                        </p>
                      </div>
                    );
                  }
                })
              )}
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
}
