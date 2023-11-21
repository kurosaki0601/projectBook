import { useEffect, useState } from "react";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Input, Modal, Table } from "antd";
import Layout from "../../layout/layout";
import orderService from "../../Service/order.service";

const OrderManager = () => {
  
  const [order, setOrder] = useState([]);
  const [editingOrder, seteditingOrder] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await orderService.list({ page: 1, perPage: 30 });
        console.log(result.data.items);
        setOrder(result.data.items);

        result.data.items.forEach((item) => {
          item.userName = item.expand.userId.name;
          item.orderBook = item.expand.bookId.name;
        });
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, []);

  const onDelete = async (id) => {
    Modal.confirm({
      title: "Are you sure detele this?",
      okText: "Yes",
      okType: "danger",
      onOk: async () => {
        await orderService.delete(id);
        window.location.reload();
      },
    });
  };
  useEffect(() => {
    async function fetchDataCategory() {
      try {
        const result = await orderService.search({ page: 1, perPage: 30 });
        setOrder(result.data.items);
      } catch (err) {
        console.log(err);
      }
    }
    fetchDataCategory();
  }, []);

  const resetEditing = () => {
    setIsEditing(false);
    seteditingOrder(null);
  };
  const onEditBook = (record) => {
    setIsEditing(true);
    seteditingOrder({ ...record });
  };

  const columns = [
    {
      title: "User Name",
      dataIndex: "userName",
      key: "userName",
    },
    {
      title: "Order Book",
      dataIndex: "orderBook",
      key: "orderBook",
    },
    {
      title: "Quantity",
      dataIndex: "quantityOrder",
      key: "quantityOrder",
    },

    {
      title: "Total",
      dataIndex: "totalPrice",
      key: "totalPrice",
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
  const filteredOrder = order.filter((search) =>
    search.expand?.userId?.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <Layout />
      <section className="dashboard">
        <div className="top">
          <div className="search-box">
            <i className="fa-solid fa-magnifying-glass"></i>
            <input
              type="text"
              placeholder="Search by name of order"
              onChange={(event) => {
                setSearchTerm(event.target.value);
              }}
            />
          </div>
        </div>
        <div className="dash-content">
          <Table dataSource={filteredOrder} columns={columns} />
          <Modal
            title="Edit Order"
            open={isEditing}
            okText="Save"
            onCancel={() => {
              resetEditing();
            }}
            onOk={() => {
              orderService
                .update(editingOrder.id, {
                  orderId: editingOrder.orderId,
                  totalPrice: editingOrder.totalPrice,
                })
                .then(() => {
                  (pre) => {
                    return pre.map((Order) => {
                      if (Order.id === editingOrder.id) {
                        return editingOrder;
                      } else {
                        return Order;
                      }
                    });
                  };
                  window.location.reload();
                  resetEditing();
                });
            }}
          >
            <u>User: {editingOrder?.userName}</u>

            <div>
              <label>Total Price</label>
              <div>
                <Input
                  value={editingOrder?.totalPrice}
                  onChange={(e) => {
                    seteditingOrder((pre) => {
                      return { ...pre, totalPrice: e.target.value };
                    });
                  }}
                />
              </div>
            </div>

            <div>
              <label>Order Book</label>
              <div>
                <select
                  name="category"
                  id="category"
                  value={editingOrder?.orderId}
                  onChange={(e) => {
                    const selectedValues = Array.from(
                      e.target.selectedOptions,
                      (option) => option.value
                    );
                    seteditingOrder((pre) => {
                      return { ...pre, orderId: selectedValues };
                    });
                  }}
                  multiple
                >
                  <option value="" disabled selected hidden>
                    Select Order Book
                  </option>
                  {order.map((order) => (
                    <option key={order.id} value={order.id}>
                      {order.bookId}
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

export default OrderManager;
