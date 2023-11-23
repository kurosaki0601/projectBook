
import {  useState } from 'react';
import blogService from './../Service/blog.service';
import { Container } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import homeStyle from "../styles/Home.module.css";
import { Col } from 'react-bootstrap';
import { Card } from 'antd';
import { Link } from 'react-router-dom';
import { Pagination } from 'antd';
import { useEffect } from 'react';
const Blog = () => {
    const [blogs, setBlog] = useState([]);
    const [total, setTotal] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);

    const handlePageChange = (page) => {
      setCurrentPage(page);

      fetchData(page);
    }
    useEffect(() => {
        async function fetchData() {
          try {
            const result = await blogService.search({ page: 1, perPage: 6 });
            console.log(result.data.totalPages);
            setBlog(result.data.items);
            setTotal(result.data.totalPages);
          } catch (err) {
            console.log(err);
          }
        }
        fetchData();
      }, []);
    
    const fetchData = async (page) => {
      try {
        const result = await blogService.search({ page: page, perPage: 6 });
        setBlog(result.data.items);
       
        
      } catch (err) {
        console.log(err);
      }
    }
    return (
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
                 src={blog.picture}
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
     
   </Row>
   <Pagination current={currentPage} onChange={handlePageChange} total={total*10} />  
        </Container>
    );
};

export default Blog;