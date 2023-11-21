
import SlideShow from "./SlideShow";
import { useEffect, useState } from "react";
import bookService from "./../Service/book.service";
import { Button, Card, Input } from "antd";
import { Row, Col, Container } from "react-bootstrap";
import "../styles/Home.module.css";
import homeStyle from "../styles/Home.module.css";
import { Link } from "react-router-dom";
import blogService from './../Service/blog.service';

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
      <h1 className={homeStyle.bookStore} >Featured books in the store</h1>
      <Container>
      <Row className={homeStyle.cardTotal}>
     
        {books.map((book) => {
          return (
            <Col md={3} key={book.id} className={homeStyle.card}>
              <Card
                hoverable
                style={{ width: "100%" }}
                cover={
                  <img
                    alt="example"
                    src={`http://127.0.0.1:8090/api/files/book/${book.id}/${book.picture}?thumb=100x300`}
                  />
                }
              >
                <Link to={`/customers/detail/${book.id}`} style={{ textDecoration: 'none' }}>
                  <p className={homeStyle.bookName}> Title: {book.name}</p>
                </Link>
                <p>Author: {book.author}</p>
                <p> Price: {book.price} $</p>
                <p>Quantity: {book.quantity}</p>
                <Input
                  className={homeStyle.inputQuantity}
                  type="number"
                  value={0} 
                  
                />
                <Button>Buy</Button>
              </Card>
            </Col>
          );
        })}
       <div className={homeStyle.more} onClick={onMoreClick}>More than</div>
      </Row>
      </Container>

      <h1 className={homeStyle.bookStore} >Blog</h1>
      <Container>
      <Row className={homeStyle.cardTotal}>
       
        {blogs.map((blog) => {
          return (
            <Col md={4} key={blog.id} className={homeStyle.card}>
              <Card
                hoverable
                style={{ width: "100%" }}
                cover={
                  <img
                    alt="example"
                    src={`http://127.0.0.1:8090/api/files/blog/${blog.id}/${blog.picture}?thumb=100x300`}
                  />
                }
              >
                <Link to={`/customers/blog/${blog.id}`} style={{ textDecoration: 'none' }}>
                  <p className={homeStyle.bookName}> Title: {blog.title}</p>
                </Link>
                <p>Author: {blog.author}</p>
                <p>Abstract: {blog.abstract} </p>
              </Card>
            </Col>
          );
        })}
         <div className={homeStyle.more} onClick={onMoreClickBlog}>More than</div>
      </Row>
      </Container>
    
    </div>
  );
};

export default Home;
