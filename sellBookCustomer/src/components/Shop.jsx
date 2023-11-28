import { useEffect, useState } from "react";
import bookService from "./../Service/book.service";
import categoryService from "../Service/category.service";
import shopStyle from "../styles/Shop.module.css";
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";
import { Input, Button, Pagination } from "antd";
import { Link } from "react-router-dom";
import { Card } from "antd";
import homeStyle from "../styles/Home.module.css";

const Shop = () => {
  const [books, setBook] = useState([]);
  const [categories, setCategory] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  useEffect(() => {
    async function fetchData() {
      try {
        let result;
        if (searchTerm) {
          result = await bookService.searchName(searchTerm);
        } else {
          result = await bookService.list({ page: currentPage, perPage: 8 });
        }
        setBook(result.data.items);
        setTotalItems(result.data.totalPages);
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, [searchTerm, currentPage]);
  useEffect(() => {
    async function fetchData() {
      try {
        const result = await categoryService.search({ page: 1, perPage: 8 });

        setCategory(result.data.items);
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, []);

  const handleChange = async (id, isChecked) => {
    if (isChecked) {
      setSelectedCategory(id);
      try {
        const result = await bookService.filter(id);
        setBook(result.data.items);
      } catch (err) {
        console.log(err);
      }
    } else {
      setSelectedCategory(null);
      try {
        const result = await bookService.list({ page: 1, perPage: 8 });
        setBook(result.data.items);
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div className={shopStyle.container}>
      <Row>
        <Col md={2} className={shopStyle.category}>
          <strong style={{ fontSize: "24px" }}>Category</strong>
          {categories.map((category) => (
            <Row key={category.id} style={{ backgroundColor: "white" }}>
              <Col>
                <input
                  type="checkbox"
                  name="category"
                  onChange={(e) => handleChange(category.id, e.target.checked)}
                  checked={selectedCategory === category.id}
                  style={{
                    display:
                      selectedCategory && selectedCategory !== category.id
                        ? "none"
                        : "inline",
                  }}
                />
                <p
                  style={{
                    display:
                      selectedCategory && selectedCategory !== category.id
                        ? "none"
                        : "inline",
                  }}
                >
                  {category.name}
                </p>
              </Col>
            </Row>
          ))}
        </Col>

        <Col md={10}>
          <Input
            placeholder="Search by Title"
            onChange={(e) => setSearchTerm(e.target.value)}
          ></Input>
          <Row className={homeStyle.cardTotal}>
            {books.map((book) => (
              <Col md={3} key={book.id} className={homeStyle.card}>
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
                  <Link
                    to={`/customers/detail/${book.id}`}
                    style={{ textDecoration: "none" }}
                  >
                    <p className={homeStyle.bookName}> Title: {book.name}</p>

                    <p>Author: {book.author}</p>
                    <p> Price: {book.price} $</p>
                    <p>Quantity: {book.quantity}</p>

                    <Button>Buy</Button>
                  </Link>
                </Card>
              </Col>
            ))}
            <Pagination
              current={currentPage}
              total={totalItems * 10}
              onChange={handlePageChange}
            />
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default Shop;
