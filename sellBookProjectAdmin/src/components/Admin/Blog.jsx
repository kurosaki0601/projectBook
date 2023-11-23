import { useEffect, useState } from "react";
import blogService from "../../Service/blog.service";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import Layout from "../../layout/layout";
import { useFormik } from "formik";
import * as yup from "yup";

import { Input, Table } from "antd";
import { Button, Modal } from "antd";

const Blog = () => {
  const [blog, setBlog] = useState([]);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [editingBlog, seteditingBlog] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");


  useEffect(() => {
    async function fetchData() {
      try {
        const result = await blogService.search({ page: 1, perPage: 30 });
        console.log(result.data.items);
        setBlog(result.data.items);
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, []);
  const formik = useFormik({
    initialValues: {
      title: "",
      author: "",
      date: "",
      abstract: "",
      content: "",
    },
    validationSchema: yup.object({
      title: yup.string().required("Please enter name of blog!"),
      author: yup.string().required("Required"),
      abstract: yup.string().required("Required"),
      date: yup.date().required("Required"),
      content: yup.string().required("Required"),
    }),
    onSubmit: async (values) => {
      try {
        setConfirmLoading(true);
        setTimeout(() => {
          setOpen(false);
          setConfirmLoading(false);
        }, 2000);

        await blogService.create(values);
        window.location.reload();
      } catch (err) {
        console.log(err);
      }
    },
  });
  const showModal = () => {
    setOpen(true);
  };
  const onEditBlog = (record) => {
    setIsEditing(true);
    seteditingBlog({ ...record });
  };
  const resetEditing = () => {
    setIsEditing(false);
    seteditingBlog(null);
  };
  const filteredBlog = blog.filter((search) =>
  search.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const onDelete = async (id) => {
    Modal.confirm({
      title: "Are you sure detele this?",
      okText: "Yes",
      okType: "danger",
      onOk: async () => {
        await blogService.delete(id);
        window.location.reload();
      },
    });
  };
  const handleCancel = () => {
    setOpen(false);
  };


  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Abstract",
      dataIndex: "abstract",
      key: "abstract",
    },
    {
      title: "Author",
      dataIndex: "author",
      key: "author",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Picture",
      dataIndex: "picture",
      key: "picture",
      render:(record) => (
        <img style={{
          width: "300px",
          height: "180px",
        }} src={record} alt="" />
      )
    },

    {
      key: "actions",
      title: "Actions",
      render: (record) => {
        return (
          <>
            <EditOutlined
            onClick={() => {
              onEditBlog(record);
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
              placeholder="Search by title"
              onChange={(event) => {
                setSearchTerm(event.target.value);
              }}
            />
          </div>
        </div>
        <div className="dash-content">
          <Button type="primary" onClick={showModal}>
            Add Blog
          </Button>
          <Modal
            title="Add Blog"
            open={open}
            onOk={formik.handleSubmit}
            confirmLoading={confirmLoading}
            onCancel={handleCancel}
          >
            <form onSubmit={formik.handleSubmit}>
              <div>
                <div>
                  <label>Add Title</label>
                </div>
                <Input
                  type="text"
                  id="title"
                  name="title"
                  value={formik.values.title}
                  onChange={formik.handleChange}
                />
                {formik.errors.title && formik.touched.title && (
                  <p className={"form-error"}>{formik.errors.title}</p>
                )}
              </div>
              <div>
                <div>
                  <label>Add Author</label>
                </div>
                <Input
                  type="text"
                  id="author"
                  name="author"
                  value={formik.values.author}
                  onChange={formik.handleChange}
                />
                {formik.errors.author && formik.touched.author && (
                  <p className={"form-error"}>{formik.errors.author}</p>
                )}
              </div>
              <div>
                <div>
                  <label>Add Date</label>
                </div>
                <Input
                  type="date"
                  id="date"
                  name="date"
                  value={formik.values.date}
                  onChange={formik.handleChange}
                />
                {formik.errors.date && formik.touched.date && (
                  <p className={"form-error"}>{formik.errors.date}</p>
                )}
              </div>
              <div>
                <div>
                  <label>Add Abstract</label>
                </div>
                <Input
                  type="text"
                  id="abstract"
                  name="abstract"
                  value={formik.values.abstract}
                  onChange={formik.handleChange}
                />
                {formik.errors.abstract && formik.touched.abstract && (
                  <p className={"form-error"}>{formik.errors.abstract}</p>
                )}
              </div>
              <div>
                <div>
                  <label>Add Content</label>
                </div>
                <Input
                  type="text"
                  name="content"
                  id="content"
                  value={formik.values.content}
                  onChange={formik.handleChange}
                />
                {formik.errors.content && formik.touched.content && (
                  <p className={"form-error"}>{formik.errors.content}</p>
                )}
              </div>
            </form>
          </Modal>
          <Table dataSource={filteredBlog} columns={columns} />
          <Modal
              title="Edit Blog"
              open={isEditing}
              okText="Save"
              onCancel={() => {
                resetEditing();
              }}
              onOk={() => {
                blogService
                  .update(editingBlog.id, {
                    title: editingBlog.title,
                    abstract: editingBlog.abstract,
                    author: editingBlog.author,
                    
                    
                  })
                  .then(() => {
                    (pre) => {
                      return pre.map((Blog) => {
                        if (Blog.id === editingBlog.id) {
                          return editingBlog;
                        } else {
                          return Blog;
                        }
                      });
                    };
                    window.location.reload();
                    resetEditing();
                  });
              }}
            >
              <label> Title</label>
              <Input
                value={editingBlog?.title}
                onChange={(e) => {
                  seteditingBlog((pre) => {
                    return { ...pre, title: e.target.value };
                  });
                }}
              />
              <div>
                <label>Abstract</label>
                <div>
                  <Input
                    value={editingBlog?.abstract}
                    onChange={(e) => {
                      seteditingBlog((pre) => {
                        return { ...pre, abstract: e.target.value };
                      });
                    }}
                  />
                </div>
              </div>
              <div>
                <label>Author</label>
                <div>
                  <Input  
                    value={editingBlog?.author}
                    onChange={(e) => {
                      seteditingBlog((pre) => {
                        return { ...pre, author: e.target.value };
                      });
                    }}
                  />
                </div>
              </div>
              
            
              
           
            </Modal>
        </div>
      </section>
    </div>
  );
};

export default Blog;
