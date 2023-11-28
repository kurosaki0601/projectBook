import SlideShow from "./SlideShow";
import { useEffect, useState } from "react";
import bookService from "./../Service/book.service";
import { Button, Card } from "antd";
import { Row, Col, Container } from "react-bootstrap";
import "../styles/Home.module.css";
import homeStyle from "../styles/Home.module.css";
import { Link } from "react-router-dom";
import blogService from "./../Service/blog.service";

// eslint-disable-next-line react/prop-types
const Home = ({ onMoreClick, onMoreClickBlog }) => {
  const [books, setBook] = useState([]);
  const [blogs, setBlog] = useState([]);
  useEffect(() => {
    async function fetchData() {
      try {
        const result = await bookService.list({ page: 1, perPage: 8 });

        setBook(result.data.items);
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, []);
  useEffect(() => {
    async function fetchData() {
      try {
        const result = await blogService.search({ page: 1, perPage: 6 });

        setBlog(result.data.items);
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, []);

  return (
    <div className={homeStyle.container}>
      <SlideShow></SlideShow>
      <h1 className={homeStyle.bookStore}>Featured books in the store</h1>
      <Container>
        <Row className={homeStyle.cardTotal}>
          {books.map((book) => {
            return (
              <Col md={3} key={book.id} className={homeStyle.card}>
                <Link
                  to={`/customers/detail/${book.id}`}
                  style={{ textDecoration: "none" }}
                >
                  <Card
                    style={{ height: "100%" }}
                    hoverable
                    cover={
                      <img
                        alt="example"
                        src={book.picture}
                        style={{ height: "320px" }}
                      />
                    }
                  >
                    <p className={homeStyle.bookName}> Title: {book.name}</p>

                    <p>Author: {book.author}</p>
                    <p> Price: {book.price} $</p>
                    <p>Quantity: {book.quantity}</p>

                    <Button>Buy</Button>
                  </Card>
                </Link>
              </Col>
            );
          })}
          <div className={homeStyle.more} onClick={onMoreClick}>
            More than
          </div>
        </Row>
      </Container>

      <h1 className={homeStyle.bookStore}>Blog</h1>
      <Container>
        <Row className={homeStyle.cardTotal}>
          {blogs.map((blog) => {
            return (
              <Col md={4} key={blog.id} className={homeStyle.card}>
                <Link
                  to={`/customers/blog/${blog.id}`}
                  style={{ textDecoration: "none" }}
                >
                  <Card
                    hoverable
                    style={{ height: "100%" }}
                    cover={
                      <img
                        alt="example"
                        src={blog.picture}
                        style={{ height: "320px" }}
                      />
                    }
                  >
                    <p className={homeStyle.bookName}> Title: {blog.title}</p>

                    <p>Author: {blog.author}</p>
                    <p>Abstract: {blog.abstract} </p>
                  </Card>
                </Link>
              </Col>
            );
          })}
          <div className={homeStyle.more} onClick={onMoreClickBlog}>
            More than
          </div>
        </Row>
      </Container>
    </div>
  );
};

export default Home;
