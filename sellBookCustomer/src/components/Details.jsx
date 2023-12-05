import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import bookService from "../Service/book.service";
import Header from "./Header";

import detailStyle from "../styles/Detail.module.css";
import { Alert, Button, Input } from "antd";
import Footer from "./Footer";
import { useFormik } from "formik";
import * as yup from "yup";
import orderService from "../Service/order.service";
import useUserInfo from "../hooks/useUserInfo";
import commentService from "../Service/comment.service";

const Details = () => {
  const { id } = useParams();
  const [book, setBook] = useState();
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const userInfo = useUserInfo();
  const navigate = useNavigate();
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const result = bookService.read(id);
    result.then((book) => setBook(book.data));
  }, [id]);
  const goBack = () => {
    navigate(-1);
  };

  const formik = useFormik({
    initialValues: {
      quantityOrder: 1,
      totalPrice: "",
    },
    validationSchema: yup.object({
      quantityOrder: yup.string().required("required!"),
      totalPrice: yup.string(),
    }),
    onSubmit: async (values) => {
      const order = {
        userId: userInfo?.id,
        bookId: book?.id,
        quantityOrder: values.quantityOrder,
        totalPrice: values.totalPrice,
      };
      const data = {
        name: book?.name,
        author: book?.author,
        abstract: book,
        quantity: book?.quantity - values.quantityOrder,
        price: book?.price,
        category: book?.category,
        picture: book?.picture,
      };

      if (values.quantityOrder > book?.quantity) {
        window.alert("You cannot purchase more than is available");
      } else {
        await orderService.create(order);
        await bookService.update(book?.id, data);
        setSuccessMessage("Order placed successfully!");
        setTimeout(() => {
          setSuccessMessage("");
        }, 2000);
        const remainingQuantity = book.quantity - values.quantityOrder;
        setBook({ ...book, quantity: remainingQuantity });
      }
    },
  });

  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const submitComment = async (e) => {
    e.preventDefault();
    try {
      const currentDate = new Date();
      const commentData = {
        content: newComment,
        bookId: id,
        userId: userInfo?.id,
        date: currentDate.toISOString(),
      };
      await commentService.create(commentData);
      fetchData();
      setNewComment("");
    } catch (err) {
      console.log(err);
    }
  };

  const fetchData = async () => {
    try {
      const result = await commentService.list();
      if (id) {
        const filteredItems = result.data.items.filter(
          (item) => item.expand.bookId.id === id
        );
        setComments(filteredItems); // Update the comments state
      }
    } catch (err) {
      console.log(err);
    }
  };
  const handleDeleteComment = async (commentId) => {
    try {
      await commentService.delete(commentId);

      const updatedComments = comments.filter(
        (comment) => comment.id !== commentId
      );
      setComments(updatedComments);
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  return (
    <div style={{ backgroundColor: "lightgray" }}>
      <Header></Header>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Button type="link" onClick={goBack}>
          Go back
        </Button>
        {successMessage && (
          <Alert
            style={{ width: "30%" }}
            message={successMessage}
            type="success"
            showIcon
            closable
          />
        )}
      </div>
      <div>
        <div className={detailStyle.divdetail}>
          <img
            style={{ width: "auto", height: "500px" }}
            alt="example"
            src={book?.picture}
          />
          <div style={{ marginLeft: "20px", backgroundColor: "lightgray" }}>
            <div style={{ marginTop: "10px" }}>
              <strong>Title:</strong> {book?.name}
            </div>
            <div style={{ marginTop: "10px" }}>
              <strong>Author:</strong> {book?.author}
            </div>
            <div style={{ marginTop: "10px" }}>
              <strong>Abstract: </strong> {book?.abstract}
            </div>
            <div style={{ marginTop: "10px" }}>
              <strong>Available quantity:</strong> {book?.quantity}
            </div>
            <div style={{ marginTop: "10px" }}>
              <strong>Price:</strong> {book?.price}
            </div>

            <div
              style={{
                marginTop: "10px",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <form action="" onSubmit={formik.handleSubmit}>
                <label htmlFor="quantityOrder">
                  <strong>Quantity</strong>
                </label>{" "}
                <Input
                  style={{ width: "30%" }}
                  type="number"
                  name="quantityOrder"
                  value={formik.values.quantityOrder}
                  onChange={(e) => {
                    const quantityOrder = e.target.value;
                    formik.setFieldValue("quantityOrder", quantityOrder);
                    formik.setFieldValue(
                      "totalPrice",
                      quantityOrder * book?.price
                    );
                  }}
                />
                {formik.errors.quantityOrder &&
                  formik.touched.quantityOrder && (
                    <div style={{ marginTop: "5px" }}>
                      {formik.errors.quantityOrder}
                    </div>
                  )}
                <button style={{ width: "50%" }}>Buy</button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className={detailStyle.comment}>
        {comments.map((comment) => (
          <div key={comment.id}>
            <div className={detailStyle.commentItem}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <p style={{ fontWeight: 600, color: "#fff" }}>
                  {comment.expand.userId.email}
                </p>
                {userInfo?.email === comment.expand.userId.email && (
                  <i
                    style={{ color: "red" }}
                    className="fa-solid fa-trash"
                    onClick={() => handleDeleteComment(comment.id)}
                  ></i>
                )}
              </div>
              <p style={{ color: "#fff" }}>{comment.content}</p>
            </div>
            <p>
              {new Date(comment.date).toLocaleString("en-US", {
                dateStyle: "long",
              })}
            </p>
          </div>
        ))}
      </div>
      {userInfo ? (
        <div style={{}}>
          <form onSubmit={submitComment}>
            <textarea
              name="comment"
              id="comment"
              cols="80"
              rows="3"
              value={newComment}
              onChange={handleCommentChange}
              style={{
                margin: "auto",
                textAlign: "center",
                display: "block",
              }}
            ></textarea>
            <button
              style={{ marginLeft: "29.9%", marginTop: "10px", padding: "8px" }}
              type="submit"
            >
              Comment
            </button>
          </form>
        </div>
      ) : null}
      <Footer></Footer>
    </div>
  );
};

export default Details;
