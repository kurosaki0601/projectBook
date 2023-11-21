
import "../styles/Customer.css"
import admin from "../assets/admin.jpg"
import { Link } from "react-router-dom";
import AdminService from "../Service/admin.service";


const Layout = () => {
    const signOut = async () => {
        await AdminService.signOut();
        localStorage.removeItem("AUTH_TOKEN");       
      };

    return (
        <div>
            <nav>
        <div className="logo-name">
            <div className="logo-image">
              <img src={admin} alt="" />
            </div>
            <span className="logo_name">Admin Page</span>
        </div>
        <div className="menu-items">
            <ul className="nav-links">
                <li ><Link to="/admin/customers" >
                <i className="fa-solid fa-user"></i>
                    <span className="link-name">Accout Manager</span>
                </Link></li>
                <li><Link to="/admin/category">
                <i className="fa-solid fa-bars"></i>
                    <span className="link-name">Category Manager</span>
                </Link></li>
                <li><Link to="/admin/book">
                <i className="fa-solid fa-book"></i>
                    <span className="link-name">Book Manager</span>
                </Link></li>
                
                <li><Link to="/admin/order" >
                <i className="fa-solid fa-cart-shopping"></i>
                    <span className="link-name">Order Manager</span>
                </Link></li>
                <li><Link to="/admin/blog" >
                <i className="fa-solid fa-blog"></i>
                    <span className="link-name">Blog Manager</span>
                </Link></li>
                
                
            </ul>
            
            <ul className="logout-mode">
                <li><Link to="/login">
                <i className="fa-solid fa-right-from-bracket"></i>
                    <span className="link-name" onClick={signOut}>Logout</span>
                </Link></li>
                
            </ul>
        </div>
    </nav>
        </div>
    );
};

export default Layout;