
import { useParams } from 'react-router-dom';
import blogService from '../Service/blog.service';
import { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import Header from './Header';
const DetailBlog = () => {
    const {id} = useParams();
    const [blogs, setBlog] = useState([]);
    useEffect(() => {
        const result = blogService.read(id);
       console.log(result);
       result.then(blog => setBlog(blog.data));
    },[id]);
    return (
        <Container>
            <Header></Header>
            
            <img
                    alt="example"
                    src={`http://127.0.0.1:8090/api/files/blog/${blogs?.id}/${blogs?.picture}?thumb=100x300`}
            />
            <div>Title: {blogs?.title}</div>
            <div>Author: {blogs?.author}</div>
            <div>Abstract: {blogs?.abstract}</div>
            <div>Content: {blogs?.content}</div>
           
        </Container>
    );
};

export default DetailBlog;