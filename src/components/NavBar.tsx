import { Dropdown } from "antd";
import { LogoutOutlined, UserOutlined } from "@ant-design/icons";
import Link from "antd/es/typography/Link";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
import useUserContext from "../context/useUserContext";

export default function NavBar() {
  // const navigate = useNavigate();
  const { user } = useUserContext();

  const handleLogout = async () => {};

  const items = [
    {
      key: "1",
      label: <span>{user && user.name}</span>,
      icon: <UserOutlined className="mr-2" />,
    },
    {
      key: "2",
      label: <Link onClick={handleLogout}>Logout</Link>,
      icon: <LogoutOutlined />,
    },
  ];

  return (
    <div className="bg-slate-900 py-4">
      <nav className="container mx-auto flex justify-between items-center">
        <img
          src="/images/logo.png"
          alt="SIST logo"
          className="h-10 w-160 md:h-14 md:w-200"
        />
        <div>
          <Dropdown
            menu={{
              items,
            }}
            placement="bottom"
            arrow
          >
            <Link className="text-white rounded-full bg-slate-500 p-3 inline-flex items-center justify-center">
              <UserOutlined className="text-white text-md md:text-2xl" />
            </Link>
          </Dropdown>
        </div>
      </nav>
    </div>
  );
}
