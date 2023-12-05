import { Button } from "react-bootstrap";
import headerStyle from "../styles/HeaderFooter.module.css";
import { Link, useNavigate } from "react-router-dom";
import { AUTH_TOKEN } from "../utils/constants";
import { useEffect, useState } from "react";
import CustomerService from "../Service/customer.service";
import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";

const Header = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [user, setUser] = useState("");

  const token = localStorage.getItem(AUTH_TOKEN);
  useEffect(() => {
    const result = CustomerService.getCustomerInfo();
    result.then((result) => {
      setUserName(result.data.name);
      setUser(result.data);
    });
  }, []);
  const LogOut = () => {
    CustomerService.signOut();
    navigate("/login");
  };
  return (
    <div style={{ backgroundColor: "white" }}>
      {token ? (
        <div className={headerStyle.header}>
          {" "}
          <Link to={"/home"} style={{ textDecoration: "none" }}>
            <div className={headerStyle.iconHeader}>Book Store</div>
          </Link>
          <div style={{ display: "flex", alignItems: "center" }}>
            <Link
              to={`/customers/Infor/${user.id}`}
              style={{ textDecoration: "none" }}
            >
              {" "}
              <div style={{ marginLeft: "10px" }}>
                <Avatar
                  style={{ backgroundColor: "#87d068" }}
                  icon={<UserOutlined />}
                />
                {userName}
              </div>
            </Link>
            <i onClick={LogOut} className="fa-solid fa-right-from-bracket"></i>
          </div>
        </div>
      ) : (
        <div className={headerStyle.header}>
          <Link to={"/home"} style={{ textDecoration: "none" }}>
            <div className={headerStyle.iconHeader}>Book Store</div>
          </Link>

          <div className={headerStyle.login}>
            <Link to="/login" style={{ textDecoration: "none" }}>
              <Button>Login</Button>
            </Link>{" "}
            <Link to="/register" style={{ textDecoration: "none" }}>
              <Button>Register</Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
