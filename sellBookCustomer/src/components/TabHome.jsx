
import Footer from "./Footer";
import Header from "./Header";
import { Tabs } from "antd";
import "../styles/Home.module.css";
import homeStyle from "../styles/Home.module.css";
import Home from "./Home";
import Blog from "./Blog";
import Shop from "./Shop";
import {  useState } from "react";

const TabHome = () => {
    const [activeTab, setActiveTab] = useState('1');

  const handleTabChange = (key) => {
    setActiveTab(key);
    window.scrollTo({top: 0, behavior: 'smooth'});
  };
  const items = [
    {
      key: "1",
      label: "Home",
      children: <Home onMoreClick={() => handleTabChange('2')} onMoreClickBlog={() => handleTabChange('3')} ></Home>,
    },
    {
      key: "2",
      label: "Shop",
      children: <Shop></Shop>,
    },
    {
      key: "3",
      label: "Blog",
      children: <Blog></Blog>,
    },
  ];


  return (
    <div className={homeStyle.container}>
      <Header></Header>
      <Tabs style={{backgroundColor: ""}} defaultActiveKey="1" centered items={items} activeKey={activeTab} onChange={setActiveTab}/>
      <Footer></Footer>
    </div>
  );
};

export default TabHome;
