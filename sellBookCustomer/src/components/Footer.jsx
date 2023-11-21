import { Container } from "react-bootstrap";
import footerStyle from "../styles/HeaderFooter.module.css"

const Footer = () => {
    return (
        <Container className={footerStyle.header}>
          
                <div>
                    <p className={footerStyle.title}>Customer Support</p>
                    <p>Email: bookstore@gmail.com</p>
                    <p>Hotline: 0123 456 789</p>
                </div>
                <div>
                    <p className={footerStyle.title}>Introduction</p>
                    <p>Welcome to Viet Nam</p>
                    <p>Hanoi Capital, Viet Nam</p>
                   
                </div>
                <div>
                    <p className={footerStyle.title}>Social</p>
                    <p><i className="fa-brands fa-facebook"></i> Facebook</p>
                    <p><i className="fa-brands fa-instagram"></i> Instagram</p>
                    <p><i className="fa-brands fa-line"></i> Line</p>
                </div>
        
        </Container>
    );
};

export default Footer;