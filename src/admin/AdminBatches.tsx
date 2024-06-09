import { Button, Col, Row, Table } from "antd";
import { useEffect, useState } from "react";
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

export default function AdminBatches() {
  const [isLoading, setIsLoading] = useState(false);
  const [batchesList, setBatchesList] = useState([]);

  useEffect(() => {
    fetchBatches();
  }, []);

  const fetchBatches = async () => {
    setIsLoading(true);
    setBatchesList([]);
    setIsLoading(false);
  };

  return (
    <div>
      <Row>
        <Col span={24} className="py-3">
          <div className="flex justify-between">
            <h1 className="font-bold text-lg mb-0">Batches</h1>
            <div>
              <Button type="primary" className="flex items-center h-10">
                <PlusCircleOutlined className="text-lg mr-1" />
                Add Batches
              </Button>
            </div>
          </div>
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
