import { useEffect, useState } from "react";
import { useFormik } from "formik";
import userService from "../../Service/customer.service";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Table, Button, Modal } from "antd";
import Layout from "../../layout/layout";
import * as yup from "yup";
import Input from "antd/es/input/Input";

const Customer = () => {
  const [customer, setCustomer] = useState([]);
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [emailerror, setEmailError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const showModal = () => {
    setOpen(true);
  };
  const onEditUser = (record) => {
    setIsEditing(true);
    setEditingUser({ ...record });
  };
  const resetEditing = () => {
    setIsEditing(false);
    setEditingUser(null);
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      password: "",
      passwordConfirm: "",
      email: "",
      emailVisibility: true,
    },
    validationSchema: yup.object({
      name: yup.string().required("Please enter name of username!"),
      email: yup
        .string()
        .required("Email is required")
        .email("Incorrect email format"),
      passwordConfirm: yup
        .string()
        .required("Password is required")
        .min(8, "Password must be at least 8 characters")
        .max(24, "Password must be at least 24 characters")
        .oneOf([yup.ref("password"), null], "Passwords must match"),
      password: yup
        .string()
        .required("Password is required")
        .min(8, "Password must be at least 8 characters")
        .max(24, "Password must be at least 24 characters"),
    }),
    onSubmit: async (values) => {
      try {
        if (emailerror != null) {
          setConfirmLoading(true);
          setTimeout(() => {
            setOpen(false);
            setConfirmLoading(false);
          }, 2000);
        }

        await userService.create(values);
        window.location.reload();
      } catch (e) {
        setEmailError("Email already exists");
      }
    },
  });

  const handleCancel = () => {
    setOpen(false);
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await userService.search({ page: 1, perPage: 30 });
        console.log(result.data.items);
        setCustomer(result.data.items);
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, []);
  const columns = [
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Phone Number",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Avatar",
      dataIndex: "avatar",
      key: "avatar",
      render: (record) => (
        <img
          style={{
            width: "300px",
            height: "180px",
          }}
          src={record}
          alt=""
        />
      ),
    },
    {
      key: "actions",
      title: "Actions",
      render: (record) => {
        return (
          <>
            <EditOutlined
              onClick={() => {
                onEditUser(record);
              }}
            />

            <DeleteOutlined
              onClick={() => {
                onDelete(record.id);
              }}
              style={{ color: "red", marginLeft: 12 }}
            />
          </>
        );
      },
    },
  ];
  const filteredCustomer = customer.filter((search) =>
    search.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const onDelete = async (id) => {
    Modal.confirm({
      title: "Are you sure detele this?",
      okText: "Yes",
      okType: "danger",
      onOk: async () => {
        await userService.delete(id);
        window.location.reload();
      },
    });
  };
  return (
    <div>
      <Layout />
      <section className="dashboard">
        <div className="top">
          <div className="search-box">
            <i className="fa-solid fa-magnifying-glass"></i>
            <input
              type="text"
              placeholder="Search by name"
              onChange={(event) => {
                setSearchTerm(event.target.value);
              }}
            />
          </div>
        </div>

        <div className="dash-content">
          <Button type="primary" onClick={showModal}>
            Add Customer
          </Button>
          <Modal
            title="Add Customer"
            open={open}
            onOk={formik.handleSubmit}
            confirmLoading={confirmLoading}
            onCancel={handleCancel}
          >
            <form onSubmit={formik.handleSubmit}>
              <div>
                <div>
                  <label>Add Customer</label>
                </div>
                <Input
                  type="text"
                  name="name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                />
                {formik.errors.name && formik.touched.name && (
                  <p className={"form-error"}>{formik.errors.name}</p>
                )}
              </div>
              <div style={{ marginTop: "10px" }}>
                <div>
                  <label>Email</label>
                </div>
                <Input
                  type="email"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                />
                {formik.errors.email && formik.touched.email && (
                  <p className={"form-error"}>{formik.errors.email}</p>
                )}
              </div>
              <div style={{ marginTop: "10px" }}>
                <div>
                  <label>Password</label>
                </div>
                <Input
                  type="password"
                  name="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                />
                {formik.errors.password && formik.touched.password && (
                  <p className={"form-error"}>{formik.errors.password}</p>
                )}
              </div>
              <div style={{ marginTop: "10px" }}>
                <div>
                  <label>Password confirm</label>
                </div>
                <Input
                  type="password"
                  name="passwordConfirm"
                  value={formik.values.passwordConfirm}
                  onChange={formik.handleChange}
                />
                {formik.errors.passwordConfirm &&
                  formik.touched.passwordConfirm && (
                    <p className={"form-error"}>
                      {formik.errors.passwordConfirm}
                    </p>
                  )}
                {emailerror && <p className={"form-error"}>{emailerror}</p>}
              </div>
            </form>
          </Modal>
          <Table dataSource={filteredCustomer} columns={columns} />
        </div>
        <Modal
          title="Edit user"
          open={isEditing}
          okText="Save"
          onCancel={() => {
            resetEditing();
          }}
          onOk={() => {
            userService
              .update(editingUser.id, {
                name: editingUser.name,
                phone: editingUser.phone,
                address: editingUser.address,
              })
              .then(() => {
                (pre) => {
                  return pre.map((User) => {
                    if (User.id === editingUser.id) {
                      return editingUser;
                    } else {
                      return User;
                    }
                  });
                };
                window.location.reload();
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
      </section>
    </div>
  );
};

export default Customer;
