import { useEffect, useState } from "react";
import bookService from "../../Service/book.service";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Input, Table } from "antd";
import Layout from "../../layout/layout";
import { Button, Modal } from "antd";
import { useFormik } from "formik";
import * as yup from "yup";
import categoryService from "../../Service/category.service";

const Book = () => {
  const [book, setBook] = useState([]);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [categorys,setCategorys] = useState([])
  const [isEditing, setIsEditing] = useState(false);
  const [editingBook, setEditingBook] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  useEffect(() => {
    async function fetchData() {
      try {
        const result = await bookService.list({ page: 1, perPage: 30 });
        console.log(result.data.items);
        setBook(result.data.items);
        result.data.items.forEach((item) => {
          item.categoryName = item.expand.category.name;
        });
        
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, []);
  useEffect(()=>{
    async function fetchDataCategory(){
      try{
        const resultCategory = await categoryService.search({page: 1, perPage: 30});
        setCategorys(resultCategory.data.items);
      }catch(err){
        console.log(err);
      }
    }
    fetchDataCategory()
  },[])
  const formik = useFormik({
    initialValues: {
      name: "",
      author: "",
      abstract: "",
      quantity: "",
      price: "",
      category: "",
    },
    validationSchema: yup.object({
      name: yup.string().required("Please enter name of category!"),
      author: yup.string().required("Required"),
      abstract: yup.string().required("required"),
      quantity: yup.string().required("Required"),
      price: yup.string().required("Required"),
      category: yup.string().required("Required")
    }),
    onSubmit: async (values) => {
      try {
        setConfirmLoading(true);
        setTimeout(() => {
          setOpen(false);
          setConfirmLoading(false);
        }, 2000);

        await bookService.create(values);
        window.location.reload();
      } catch (err) {
        console.log(err);
      }
    },
  });
  const filteredBook = book.filter((search) =>
  search.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const showModal = () => {
    setOpen(true);
  };
  const onEditBook = (record) => {
    setIsEditing(true);
    setEditingBook({ ...record });
  };
  const resetEditing = () => {
    setIsEditing(false);
    setEditingBook(null);
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
        await bookService.delete(id);
        window.location.reload();
      },
    });
  };
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
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
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Category",
      dataIndex: "categoryName",
      key: "categoryName",
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
              onEditBook(record);
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
              placeholder="Search by book name"
              onChange={(event) => {
                setSearchTerm(event.target.value);
              }}
            />
          </div>
        </div>
        <div className="dash-content">
          <Button type="primary" onClick={showModal}>
            Add Book
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
                  id="name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                />
                {formik.errors.name && formik.touched.name && (
                  <p className={"form-error"}>{formik.errors.name}</p>
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
                  <label>Add Abstract</label>
                </div>
                <Input
                  type="text"
                  name="abstract"
                  id="abstract"
                  value={formik.values.abstract}
                  onChange={formik.handleChange}
                />
                {formik.errors.abstract && formik.touched.abstract && (
                  <p className={"form-error"}>{formik.errors.abstract}</p>
                )}
              </div>
              <div>
                <div>
                  <label>Add Quantity</label>
                </div>
                <Input
                  type="text"
                  id="quantity"
                  name="quantity"
                  value={formik.values.quantity}
                  onChange={formik.handleChange}
                />
                {formik.errors.quantity && formik.touched.quantity && (
                  <p className={"form-error"}>{formik.errors.quantity}</p>
                )}
              </div>
              <div>
                <div>
                  <label>Add Price</label>
                </div>
                <Input
                  type="text"
                  id="price"
                  name="price"
                  value={formik.values.price}
                  onChange={formik.handleChange}
                />
                {formik.errors.price && formik.touched.price && (
                  <p className={"form-error"}>{formik.errors.price}</p>
                )}
              </div>
              <div style={{ marginTop: "10px" }}>
                <div>
                  <label>Category</label>
                </div>
                {/* <Input
                    type="text"
                    name="Category"
                    value={formik.values.category}
                    onChange={formik.handleChange}
                  /> */}
                <select
                  name="category"
                  id="category"
                  value={formik.values.category}
                  onChange={formik.handleChange}
                >
                  <option value="" disabled selected hidden>
                    Select Category
                  </option>
                  {categorys.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
                {formik.errors.category && formik.touched.category && (
                  <p className={"form-error"}>{formik.errors.category}</p>
                )}
              </div>
            
            </form>
          </Modal>
          <Table dataSource={filteredBook} columns={columns} />
          <Modal
              title="Edit book"
              open={isEditing}
              okText="Save"
              onCancel={() => {
                resetEditing();
              }}
              onOk={() => {
                bookService
                  .update(editingBook.id, {
                    name: editingBook.name,
                    abstract: editingBook.abstract,
                    author: editingBook.author,
                    quantity: editingBook.quantity,
                    price: editingBook.price  ,
                    category: editingBook.category,
                  })
                  .then(() => {
                    (pre) => {
                      return pre.map((Book) => {
                        if (Book.id === editingBook.id) {
                          return editingBook;
                        } else {
                          return Book;
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
                value={editingBook?.name}
                onChange={(e) => {
                  setEditingBook((pre) => {
                    return { ...pre, name: e.target.value };
                  });
                }}
              />
              <div>
                <label>Abstract</label>
                <div>
                  <Input
                    value={editingBook?.abstract}
                    onChange={(e) => {
                      setEditingBook((pre) => {
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
                    value={editingBook?.author}
                    onChange={(e) => {
                      setEditingBook((pre) => {
                        return { ...pre, author: e.target.value };
                      });
                    }}
                  />
                </div>
              </div>
              <div>
                <label>Quantity</label>
                <div>
                  <Input  
                    value={editingBook?.quantity}
                    onChange={(e) => {
                      setEditingBook((pre) => {
                        return { ...pre, quantity : e.target.value };
                      });
                    }}
                  />
                </div>
              </div>
              <div>
                <label>Price</label>
                <div>
                  <Input  
                    value={editingBook?.price}
                    onChange={(e) => {
                      setEditingBook((pre) => {
                        return { ...pre, price: e.target.value };
                      });
                    }}
                  />
                </div>
              </div>
              <div>
              <label>Category</label>
              <div>
                <select
                  name="category"
                  id="category"
                  value={editingBook?.category}
                  onChange={(e) => {
                    setEditingBook((pre) => {
                      return { ...pre, category: e.target.value };
                    });
                  }}
                >
                  <option value="" disabled selected hidden>
                    Select Category
                  </option>
                  {categorys.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            </Modal>
        </div>
      </section>
    </div>
  );
};

export default Book;
