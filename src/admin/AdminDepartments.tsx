import { useEffect, useState } from "react";
import { MoreOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { Button, Col, Row, Table } from "antd";
import axios from "axios";
import { Link } from "react-router-dom";

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Description",
    dataIndex: "description",
    key: "description",
  },
  {
    title: "Action",
    key: "action",
    render: () => (
      <Button type="text">
        <MoreOutlined />
      </Button>
    ),
  },
];

export default function AdminDepartments() {
  const [isLoading, setIsLoading] = useState(false);
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(
        "http://localhost:3000/api/v1/academics/list-departments",
        { withCredentials: true }
      );
      setDepartments(res?.data?.departments);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  return (
    <div>
      <Row>
        <Col span={24} className="py-3">
          <div className="flex justify-between items-center">
            <h1 className="font-bold text-lg mb-0">Departments</h1>
            <div>
              <Link to="/admin/departments/add">
                <Button type="primary" className="flex items-center h-10">
                  <PlusCircleOutlined className="text-lg mr-1" />
                  Add Department
                </Button>
              </Link>
            </div>
          </div>
        </Col>

        <Col span={24} className="mt-6">
          <Table
            columns={columns}
            dataSource={departments}
            loading={isLoading}
          />
        </Col>
      </Row>
    </div>
  );
}
