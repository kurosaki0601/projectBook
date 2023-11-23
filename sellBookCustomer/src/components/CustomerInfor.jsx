import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "./Header";
import { Container } from "react-bootstrap";
import CustomerService from "../Service/customer.service";
import { Tabs } from "antd";
import { Button, Modal } from "antd";
import { Form } from "antd";
import { Input } from "antd";
import { message } from "antd";
import orderService from "./../Service/order.service";
import useUserInfo from "../hooks/useUserInfo";
import { Card } from "antd";

const CustomerInfor = () => {
  const { id } = useParams();
  const [user, setUser] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [order, setOrder] = useState([]);
  const userInfo = useUserInfo();
  const resetEditing = () => {
    setIsEditing(false);
    setEditingUser(null);
  };
  const onEditUser = (record) => {
    setIsEditing(true);
    setEditingUser({ ...record });
  };
  useEffect(() => {
    CustomerService.getCustomerInfo(id)
      .then((result) => {
        console.log(result.data);
        setUser(result.data);
      })
      .catch((error) => console.error(error));
  }, [id]);

  const onFinish = (values) => {
    const { oldPassword, password, passwordConfirm } = values;
    if (!user) {
      console.log("No user is being edited!");
      return;
    }

    if (password !== passwordConfirm) {
      console.log("New passwords do not match!");
      return;
    }
    CustomerService.update(user.id, {
      oldPassword: oldPassword,
      password: password,
      passwordConfirm: passwordConfirm,
    })
      .then(() => {
        console.log("Password updated successfully!");
        message.success("Password updated successfully!");
      })
      .catch((error) => {
        console.error(error);
        message.error(`Please check your current password`);
      });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  useEffect(() => {
    async function fetchData() {
      try {
        const result = await orderService.list();
        const userEmail = userInfo?.email;

        if (userEmail) {
          const filteredItems = result.data.items.filter((item) => {
            return item.expand.userId.email === userEmail;
          });
          setOrder(filteredItems);
          console.log(filteredItems);
        }
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, [userInfo?.email]);
  const items = [
    {
      key: "1",
      label: "Information of User",
      children: (
        <div style={{ display: "flex", marginTop: "20px" }}>
          <img
            alt="avatar error"
            src={user?.avatar}
            style={{ width: "auto", height: "400px" }}
          />
          <div style={{ wordWrap: "break-word", marginLeft:"20px" }}>
            <p>
              <strong>Email:</strong> {user?.email}
            </p>
            <p>
              <strong>Name:</strong> {user?.name}
            </p>
            <p>
              <strong>Phone:</strong> {user?.phone}
            </p>
            <p>
              <strong>Address:</strong> {user?.address}
            </p>
            <Button
              onClick={() => {
                onEditUser(user);
              }}
            >
              Edit
            </Button>
            <Modal
              title="Edit user"
              open={isEditing}
              okText="Save"
              onCancel={() => {
                resetEditing();
              }}
              onOk={() => {
                CustomerService.update(editingUser.id, {
                  name: editingUser.name,
                  phone: editingUser.phone,
                  address: editingUser.address,
                  avatar: editingUser.avatar,
                }).then(() => {
                  (pre) => {
                    return pre.map((User) => {
                      if (User.id === editingUser.id) {
                        return editingUser;
                      } else {
                        return User;
                      }
                    });
                  };
                  message.success("User saved successfully");
                  setTimeout(() => {
                    window.location.reload();
                  }, 2000);
                  resetEditing();
                });
              }}
            >
              <label> Name</label>
              <Input
                value={editingUser?.name}
                onChange={(e) => {
                  setEditingUser((pre) => {
                    return { ...pre, name: e.target.value };
                  });
                }}
              />
              <div>
                <label>Phone</label>
                <div>
                  <Input
                    value={editingUser?.phone}
                    onChange={(e) => {
                      setEditingUser((pre) => {
                        return { ...pre, phone: e.target.value };
                      });
                    }}
                  />
                </div>
              </div>
              <div>
                <label>Address</label>
                <div>
                  <Input
                    value={editingUser?.address}
                    onChange={(e) => {
                      setEditingUser((pre) => {
                        return { ...pre, address: e.target.value };
                      });
                    }}
                  />
                </div>
              </div>
              <div>
                <label>Link avatar</label>
                <div>
                  <Input
                    value={editingUser?.avatar}
                    onChange={(e) => {
                      setEditingUser((pre) => {
                        return { ...pre, avatar: e.target.value };
                      });
                    }}
                  />
                </div>
              </div>
              
            </Modal>
          </div>
        </div>
      ),
    },
    //Tab 2
    {
      key: "2",
      label: "Edit Password",
      children: (
        <Form
          name="Edit Password"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          style={{ marginTop: "30px", maxWidth: 600 }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Current password"
            name="oldPassword"
            rules={[
              {
                required: true,
                message: "Please input current password!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            label="New Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input new password!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            label="Password Again"
            name="passwordConfirm"
            rules={[
              {
                required: true,
                message: "Please input password again!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      ),
    },
    {
      key: "3",
      label: "View Order",
      children: (
        <div>
          {order.map((order) => (
            <Card
              key={order.id}
              title={order.expand.bookId.name}
              style={{
                marginTop: "20px",
                width: "100%",
                backgroundColor: "lightgreen",
              }}
            >
              <div style={{ display: "flex" }}>
                <img
                  src={order.expand.bookId.picture}
                  style={{ width: "auto", height: "200px" }}
                  alt="no picture"
                />
                <div style={{ marginLeft: "20px" }}>
                  <p>
                    <strong>Quantity:</strong> {order.quantityOrder}
                  </p>
                  <p>
                    <strong>Price:</strong> {order.totalPrice}
                  </p>
                  <p>
                    <strong>Date created:</strong>{" "}
                    {order.created
                      ? new Date(order.created).toLocaleDateString("en-US", {
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                        })
                      : ""}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      ),
    },
  ];

  return (
    <div style={{backgroundColor: "lightgray"}}>
      <Header></Header>
      <Container>  
      <Tabs defaultActiveKey="1" centered items={items} /></Container>
    
    </div>
  );
};

export default CustomerInfor;
