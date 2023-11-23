import { useParams, useNavigate } from "react-router-dom";
import blogService from "../Service/blog.service";
import { useEffect, useState } from "react";

import Header from "./Header";
import Footer from "./Footer";
import { Button } from 'antd';

const DetailBlog = () => {
  const { id } = useParams();
  const [blogs, setBlog] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const result = blogService.read(id);
    console.log(result);
    result.then((blog) => setBlog(blog.data));
  }, [id]);
  const goBack = () => {
    navigate(-1);
  };
  return (
    <div>
      <Header></Header>
      <Button type="link" onClick={goBack}>Go back</Button>
      <div style={{ display: "flex", justifyContent: "space-between", padding:"30px" }}>
        <div>
          <div style={{ fontSize: "30px", textAlign: "center" }}>
            {" "}
            {blogs?.title}
          </div>
          <i style={{fontSize:" 16px"}}>
            Author: {blogs?.author}. Date:{" "}
            {blogs?.created
              ? new Date(blogs?.created).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })
              : ""}
          </i>
          <div style={{fontSize:" 20px", marginTop: "20px", marginBottom: "30px"}}><strong>{blogs?.abstract}</strong></div>
          <div> {blogs?.content}</div>
        </div>

        <img
          alt="example"
          style={{ width: "auto", height: "500px", marginRight:"10px" }}
          src={blogs?.picture}
        />
      </div>

      <Footer></Footer>
    </div>
  );
};

export default DetailBlog;
