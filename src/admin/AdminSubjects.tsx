import { Button, Col, Row, Select, Table, Tag } from "antd";
import { useState } from "react";
import { PlusCircleOutlined } from "@ant-design/icons";

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Batch",
    dataIndex: "batch_code",
    key: "batch_code",
  },
  {
    title: "Department",
    dataIndex: "department_name",
    key: "department_name",
  },
  {
    title: "Action",
    key: "action",
    // render: (text, record) => <Button>Edit</Button>,
  },
];

export default function AdminSubjects() {
  const [isLoading, setIsLoading] = useState(false);
  const [subjectsList, setSubjectsList] = useState([]);

  return (
    <div>
      <Row>
        <Col span={24} className="py-3">
          <div className="flex justify-between">
            <h1 className="font-bold text-lg mb-0">Subjects</h1>
            <div>
              <Button type="primary" className="flex items-center h-10">
                <PlusCircleOutlined className="text-lg mr-1" />
                Add Subjects
              </Button>
            </div>
          </div>
        </Col>

        <Col span={24} className="mt-6">
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
