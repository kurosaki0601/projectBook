import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import bookService from "../Service/book.service";
import Header from "./Header";
import { Container } from 'react-bootstrap';
import detailStyle from"../styles/Detail.module.css"

const Details = () => {
    const {id} = useParams();
    const [book, setBook] = useState();
    useEffect(() => {
        const result = bookService.read(id);
       console.log(result);
       result.then(book => setBook(book.data));
    },[id]);

    return (
        <Container>
            <Header></Header>
            <div className={detailStyle.divdetail}>
            <img
                    alt="example"
                    src={`http://127.0.0.1:8090/api/files/book/${book?.id}/${book?.picture}?thumb=100x300`}
            />
            <div>
            <div><strong>Title:</strong> {book?.name}</div>
            <div>Author: {book?.author}</div>
            <div>Abstract: {book?.abstract}</div>
            <div>Quantity: {book?.quantity}</div>
            <div>Price: {book?.price}</div>
            <div>Category: {book?.category}</div>
            </div>
            </div>
        </Container>
    );
};

export default Details;