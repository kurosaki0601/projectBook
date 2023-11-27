import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import bookService from "../Service/book.service";
import Header from "./Header";

import detailStyle from "../styles/Detail.module.css";
import { Button, Input } from "antd";
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
  useEffect(() => {
    const result = bookService.read(id);
    result.then((book) => setBook(book.data));
  }, [id]);
  const goBack = () => {
    navigate(-1);
  };

  const formik = useFormik({
    initialValues: {
      quantityOrder: "1",
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
      try {
        await orderService.create(order);

        // location.reload();
      } catch (err) {
        console.log(err);
      }
    },
  });

  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const submitComment = async (e) => {
    e.preventDefault();
    try {
      const commentData = {
        content: newComment,
        bookId: id,
        userId: userInfo?.id,
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
  useEffect(() => {
    fetchData();
  }, [id]);

  return (
    <div style={{ backgroundColor: "lightgray" }}>
      <Header></Header>
      <Button type="link" onClick={goBack}>
        Go back
      </Button>
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
      <div>
        {comments.map((comment) => (
          <div key={comment.id}>
            <p>{comment.content}</p>
            <p>{comment.expand.userId.email}</p>
            <p>{comment.date}</p>
          </div>
        ))}
      </div>
      <div>
        <form onSubmit={submitComment}>
          <textarea
            name="comment"
            id="comment"
            cols="30"
            rows="10"
            value={newComment}
            onChange={handleCommentChange}
          ></textarea>
          <button type="submit">Comment</button>
        </form>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default Details;
