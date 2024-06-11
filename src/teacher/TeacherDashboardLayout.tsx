import { Outlet, useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import {
  BookOutlined,
  DashboardOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Col, Menu, Row } from "antd";

export default function TeacherDashboardLayout() {
  const navigate = useNavigate();
  const items = [
    {
      key: "1",
      label: <span className="hidden sm:inline">Dashboard</span>,
      icon: <DashboardOutlined />,
    },
    {
      key: "2",
      label: <span className="hidden sm:inline">Subjects</span>,
      icon: <BookOutlined />,
    },
    {
      key: "3",
      label: <span className="hidden sm:inline">Teacher Guardian</span>,
      icon: <UserOutlined />,
    },
  ];

  const handleNavigation = (e: any) => {
    if (e.key === "1") {
      navigate("/teacher/dashboard");
    } else if (e.key === "2") {
      navigate("/teacher/subjects");
    } else if (e.key === "3") {
      navigate("/teacher/guardian");
    }
  };

  return (
    <div>
      <NavBar />
      <div className="container mx-auto">
        <Row gutter={15}>
          <Col span={5} className="py-4 hidden md:block">
            <Menu
              onClick={handleNavigation}
              style={{
                width: "100%",
                height: "100vh",
              }}
              mode="vertical"
              items={items}
              defaultSelectedKeys={["1"]}
              defaultOpenKeys={["1"]}
            />
          </Col>

          <Col span={19} className="py-4 hidden md:block">
            <Outlet />
          </Col>

          <Col span={24} className="py-4 block md:hidden">
            <Outlet />
          </Col>
        </Row>
      </div>

      <div className="text-white border-t pt-2 fixed bottom-0 left-0 right-0 shadow-xl block md:hidden mx-auto">
        <Menu
          onClick={handleNavigation}
          mode="horizontal"
          style={{
            width: "100%",
            margin: "auto",
            display: "flex",
            justifyContent: "space-between",
          }}
          items={items}
          defaultSelectedKeys={["1"]}
          defaultOpenKeys={["1"]}
        />
      </div>
    </div>
  );
}
