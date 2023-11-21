import categoryService from "../../Service/category.service";
import { useEffect, useState } from "react";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Button, Table, Modal, Input } from "antd";
import { useFormik } from "formik";
import * as yup from "yup";
import Layout from "../../layout/layout";

const Category = () => {
  const [category, setCategory] = useState([]);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await categoryService.search({ page: 1, perPage: 30 });
        console.log(result.data.items);
        setCategory(result.data.items);
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, []);
  const showModal = () => {
    setOpen(true);
  };
  const onEditCategory = (record) => {
    setIsEditing(true);
    setEditingCategory({ ...record });
  };
  const resetEditing = () => {
    setIsEditing(false);
    setEditingCategory(null);
  };
  const handleCancel = () => {
    setOpen(false);
  };
  const onDelete = async (id) => {
    Modal.confirm({
      title: "Are you sure detele this?",
      okText: "Yes",
      okType: "danger",
      onOk: async () => {
        await categoryService.delete(id);
        window.location.reload();
      },
    });
  };
  const formik = useFormik({
    initialValues: {
      name: "",
    },
    validationSchema: yup.object({
      name: yup.string().required("Please enter name of category!"),
    }),
    onSubmit: async (values) => {
      try {
        setConfirmLoading(true);
        setTimeout(() => {
          setOpen(false);
          setConfirmLoading(false);
        }, 2000);

        await categoryService.create(values);
        window.location.reload();
      } catch (err) {
        console.log(err);
      }
    },
  });
  const filteredCategories = category.filter((search) =>
  search.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      key: "actions",
      title: "Actions",
      render: (record) => {
        return (
          <>
            <EditOutlined
              onClick={() => {
                onEditCategory(record);
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

  return (
    <div>
      <Layout />
      <section className="dashboard">
        <div className="top">
          <div className="search-box">
            <i className="fa-solid fa-magnifying-glass"></i>
            <input
              type="text"
              placeholder="Search by name category"
              onChange={(event) => {
                setSearchTerm(event.target.value);
              }}
            />
          </div>
        </div>
        <div className="dash-content">
          <Button type="primary" onClick={showModal}>
            Add Category
          </Button>
          <Modal
            title="Title"
            open={open}
            onOk={formik.handleSubmit}
            confirmLoading={confirmLoading}
            onCancel={handleCancel}
          >
            <form onSubmit={formik.handleSubmit}>
              <div>
                <div>
                  <label>Add Name</label>
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
            </form>
          </Modal>
          <Table dataSource={filteredCategories} columns={columns} />
          <Modal
            title="Edit user"
            open={isEditing}
            okText="Save"
            onCancel={() => {
              resetEditing();
            }}
            onOk={() => {
              categoryService
                .update(editingCategory.id, {
                  name: editingCategory.name,
                })
                .then(() => {
                  (pre) => {
                    return pre.map((Category) => {
                      if (Category.id === editingCategory.id) {
                        return editingCategory;
                      } else {
                        return Category;
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
              value={editingCategory?.name}
              onChange={(e) => {
                setEditingCategory((pre) => {
                  return { ...pre, name: e.target.value };
                });
              }}
            />
          </Modal>
        </div>
      </section>
    </div>
  );
};

export default Category;
