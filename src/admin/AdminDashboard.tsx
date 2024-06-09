import { BookOutlined, GroupOutlined, UserOutlined } from "@ant-design/icons";
import { Col, Row, Spin } from "antd";
import { useState, useEffect } from "react";

type PlatformStatsType = {
  total_students: number;
  total_teachers: number;
  total_subjects: number;
  total_batches: number;
};

export default function AdminDashboard() {
  const [platformStats, setPlatformStats] = useState<PlatformStatsType>();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchPlatformStats();
  }, []);

  const fetchPlatformStats = async () => {
    setIsLoading(true);
    setPlatformStats({
      total_students: 0,
      total_teachers: 0,
      total_subjects: 0,
      total_batches: 0,
    });
    setIsLoading(false);
  };

  return (
    <div>
      <Col span={24} className="py-3">
        <h1 className="font-bold text-lg mb-0">Admin Dashboard</h1>
      </Col>

      {isLoading ? (
        <div className="text-center my-8">
          <Spin />
        </div>
      ) : (
        <Row gutter={26}>
          <Col span={12}>
            <div className="bg-slate-700 rounded-lg text-white p-6 flex items-center">
              <h1 className="px-6 py-10 pr-14 text-2xl font-bold">
                {platformStats?.total_students}
              </h1>
              <div>
                <UserOutlined className="text-3xl font-bold mb-3" />
                <p className="text-lg">Total Students</p>
              </div>
            </div>
          </Col>

          <Col span={12}>
            <div className="bg-slate-700 rounded-lg text-white p-6 flex items-center">
              <h1 className="px-6 py-10 pr-14 text-2xl font-bold">
                {platformStats?.total_teachers}
              </h1>
              <div>
                <UserOutlined className="text-3xl font-bold mb-3" />
                <p className="text-lg">Total Teachers</p>
              </div>
            </div>
          </Col>

          <Col span={12}>
            <div className="bg-slate-700 rounded-lg text-white p-6 flex items-center mt-6">
              <h1 className="px-6 py-10 pr-14 text-2xl font-bold">
                {platformStats?.total_subjects}
              </h1>
              <div>
                <BookOutlined className="text-3xl font-bold mb-3" />
                <p className="text-lg">Total Subjects</p>
              </div>
            </div>
          </Col>

          <Col span={12}>
            <div className="bg-slate-700 rounded-lg text-white p-6 flex items-center mt-6">
              <h1 className="px-6 py-10 pr-14 text-2xl font-bold">
                {platformStats?.total_batches}
              </h1>
              <div>
                <GroupOutlined className="text-3xl font-bold mb-3" />
                <p className="text-lg">Total Batches</p>
              </div>
            </div>
          </Col>
        </Row>
      )}
    </div>
  );
}
