import { PlusCircleOutlined } from "@ant-design/icons";
import { Button, Col, Row, Table } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const columns = [
  {
    title: "Student Name",
    dataIndex: "student_name",
    key: "student_name",
  },
  {
    title: "Roll No",
    dataIndex: "roll_no",
    key: "roll_no",
  },
  {
    title: "Semester",
    dataIndex: "sem_name",
    key: "sem_name",
  },
];

type WardsListType = {
  student_name: string;
  roll_no: string;
  sem_name: string;
};

export default function TeacherGuardian() {
  const [wards, setWards] = useState<WardsListType[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchWards();
  }, []);

  const fetchWards = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(
        "https://capd-backend.onrender.com/api/v1/teachers/list-teacher-wards",
        { withCredentials: true }
      );
      setWards(res?.data?.wards);
      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      console.log(error);
    }
  };

  return (
    <Row>
      <Col span={24} className="py-3">
        <div className="flex justify-between items-center">
          <h1 className="font-bold text-lg mb-0">Teacher Wards</h1>
          <div>
            <Link to="/teacher/wards/add">
              <Button type="primary" className="flex items-center h-10">
                <PlusCircleOutlined className="text-lg mr-1" />
                Add Wards
              </Button>
            </Link>
          </div>
        </div>
      </Col>

      <Col span={24} className="mt-4">
        <Table columns={columns} dataSource={wards} loading={isLoading} />
      </Col>
    </Row>
  );
}
