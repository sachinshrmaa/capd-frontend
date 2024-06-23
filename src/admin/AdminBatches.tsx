import { useEffect, useState } from "react";
import { MoreOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { Button, Col, Row, Table, Form, Select } from "antd";
import axios from "axios";
import { Link } from "react-router-dom";

const { Option } = Select;

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Start Year",
    dataIndex: "start_year",
    key: "start_year",
  },
  {
    title: "End Year",
    dataIndex: "end_year",
    key: "end_year",
  },
  {
    title: "Action",
    key: "action",
    render: () => (
      <Button type="text">
        <MoreOutlined/>
      </Button>
    ),
  },
];

export default function AdminBatches() {
  const [isLoading, setIsLoading] = useState(false);
  const [batchesList, setBatchesList] = useState([]);
  const [departments, setDepartments] = useState([]);

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
      console.log(error);
    }
  };

  const fetchBatches = async (e: any) => {
    let payload = {
      department: e.department,
    };
    try {
      setIsLoading(true);
      const res = await axios.post(
        "http://localhost:3000/api/v1/academics/list-batches",
        payload,
        { withCredentials: true }
      );
      setBatchesList(res?.data?.batches);
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
          <div className="flex justify-between">
            <h1 className="font-bold text-lg mb-0">Batches</h1>
            <div>
              <Link to="/admin/batches/add">
                <Button type="primary" className="flex items-center h-10">
                  <PlusCircleOutlined className="text-lg mr-1" />
                  Add Batches
                </Button>
              </Link>
            </div>
          </div>
        </Col>

        <Col span={24}>
          <Form onFinish={fetchBatches} layout="vertical">
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
                  <Select placeholder="Select Department" allowClear>
                    {departments.map((department: any) => (
                      <Option value={department?.department_id}>
                        {department.name}
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
            dataSource={batchesList}
            loading={isLoading}
          />
        </Col>
      </Row>
    </div>
  );
}
