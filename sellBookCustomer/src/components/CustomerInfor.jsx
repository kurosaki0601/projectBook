import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "./Header";
import { Container } from "react-bootstrap";
import CustomerService from "../Service/customer.service";
import { Tabs } from "antd";
import { Button, Modal } from "antd";
import { Form } from "antd";
import { Input } from "antd";
import { message } from 'antd';

const CustomerInfor = () => {
  const { id } = useParams();
  const [user, setUser] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

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
    const {oldPassword,  password, passwordConfirm } = values;
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
            message.success('Password updated successfully!');
        })
        .catch((error) => {
            console.error(error)
            message.error(`Please check your current password`);
        });
};


  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const items = [
    {
      key: "1",
      label: "Information of User",
      children: (
        <div style={{ display: "flex", marginTop: "20px" }}>
          <img
            alt="avatar error"
            src={`http://127.0.0.1:8090/api/files/users/${user?.id}/${user?.avatar}?thumb=100x300`}
            style={{ width: "auto", height: "450px" }}
          />
          <div style={{ wordWrap: "break-word" }}>
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
                  message.success("User saved successfully")
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
      children: <div>Xem sản phẩm</div>,
    },
  ];

  return (
    <Container>
      <Header></Header>
      <Tabs defaultActiveKey="1" centered items={items} />
    </Container>
  );
};

export default CustomerInfor;
