import { Button, Col, Form, Row, Select, Table, Tag } from "antd";
import { useState } from "react";
import { Link } from "react-router-dom";

const columns = [
  {
    key: "timestamp",
    title: "Date",
    dataIndex: "time_stamp",
    // render: (time_stamp:string) => moment(time_stamp).format("DD/MM/YYYY"),
  },
  {
    key: "ispresent",
    title: "Attendance Status",
    dataIndex: "ispresent",
    render: (ispresent: string) =>
      ispresent ? (
        <span className="font-bold text-green-500">P</span>
      ) : (
        <span className="font-bold text-red-500">A</span>
      ),
  },
];

export default function StudentAttendance() {
  const [classDetails, setClassDetails] = useState({
    subject_name: "OS",
    total_classes: 10,
    total_present: 8,
    total_absent: 2,
  });

  const [appliedFilter, setAppliedFilter] = useState("");

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
          <div className="bg-slate-100 rounded-lg border mt-6 px-6 grid grid-cols-2">
            <div className="my-4">
              <Form layout="vertical">
                <Row gutter={20}>
                  <Col span={16}>
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
                      <Select
                        placeholder="Select Subject"
                        // onChange={(value) => setSubject(value)}
                        options={[
                          { label: "Java", value: "BTCS-UG-C001" },
                          { label: "OOPS", value: "BTCS-UG-C002" },
                          { label: "FLAT", value: "BTCS-UG-C003" },
                        ]}
                        allowClear
                      />
                    </Form.Item>
                  </Col>
                  <Col span={4}>
                    <Form.Item>
                      <Button
                        type="primary"
                        className="mt-[30px] px-6"
                        htmlType="submit"
                        // onClick={fetchSubjectAttendanceLog}
                      >
                        Submit
                      </Button>
                    </Form.Item>
                  </Col>
                </Row>
              </Form>
            </div>

            <div className="my-4">
              <h1 className="font-bold text-lg mb-4">Overall Attendance</h1>
              <p>Subject: {classDetails?.subject_name}</p>
              <p>Total Classes: {classDetails?.total_classes}</p>
              <p>Present Classes: {classDetails?.total_present}</p>
              <p>Absent Classes: {classDetails?.total_absent}</p>
            </div>
          </div>
        </Col>

        <Col span={12} className="my-6">
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
                    onChange={(value) => setAppliedFilter(value)}
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
        </Col>

        <Col span={24} className="mt-1 mb-6">
          <Table
            columns={columns}
            dataSource={[]}
            // loading={isLoading}
          />
        </Col>
      </Row>
    </div>
  );
}
