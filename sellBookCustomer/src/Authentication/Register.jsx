import { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";

import registerStyle from "../styles/Auth.module.css";
import * as yup from "yup";


import { useFormik } from "formik";
import Header from "./../components/Header";
import { Input } from "antd";
import userService from "../Service/customer.service";



const Register = () => {
  const navigate = useNavigate();
  const [emailerror, setEmailError] = useState(null);

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      passwordConfirm: "",
      emailVisibility:true,
    },
    validationSchema: yup.object({
      username: yup
        .string()
        .required("Required!")
        .min(6, "Minimum6 characters"),

      email: yup.string().required("Required!").email("Invalid email format"),
      password: yup
        .string()
        .required("Required!")
        .min(8, "Minimum 8 characters"),
        passwordConfirm: yup
        .string()
        .required("Required!")
        .min(8, "Minimum 8 characters")
        .oneOf([yup.ref("password"), null], "Passwords must match"),
    }),
    onSubmit: async (values) => {
     
      try {
        await userService.signUp(values); 
        
            navigate("/login");
       
      } catch (e) {
        setEmailError("Email already exists");
      }
    },
  });

  return (
    <div>
      <Header />
      <div className={registerStyle.containerRegister}>
        <div className={registerStyle.wrapper}>
          <h2>Sign up</h2>
          <form onSubmit={formik.handleSubmit}>
            <div className={registerStyle.inputbox}>
              <input
                id="username"
                type="text"
                name="username"
                onChange={formik.handleChange}
                value={formik.values.username}
                placeholder="Enter user name"
             
              />
              {formik.errors.username && formik.touched.username && (
                <p className={registerStyle.error}>
                  {formik.errors.username}
                </p>
              )}
            </div>
            <div className={registerStyle.inputbox}>
              <input
                id="email"
                type="email"
                name="email"
                onChange={formik.handleChange}
                value={formik.values.email}
                placeholder="Enter your email"
               
              />

              {formik.errors.email && formik.touched.email && (
                <p className={registerStyle.error}>{formik.errors.email}</p>
              )}
            </div>
            <div className={registerStyle.inputbox}>
              <Input
                id="password"
                type="password"
                name="password"
                onChange={formik.handleChange}
                value={formik.values.password}
                placeholder="Create password"
               
              />

              {formik.errors.password && formik.touched.password && (
                <p className={registerStyle.error}>
                  {formik.errors.password}
                </p>
              )}
            </div>
            <div className={registerStyle.inputbox}>
              <Input
                id="passwordConfirm"
                type="password"
                name="passwordConfirm"
                onChange={formik.handleChange}
                value={formik.values.passwordConfirm}
                placeholder="Enter password agains"
              
              />

              {formik.errors.passwordConfirm && formik.touched.passwordConfirm && (
                <p className={registerStyle.error}>
                  {formik.errors.passwordConfirm}
                </p>
              )}
                {emailerror && <p className={registerStyle.error}>{emailerror}</p>}
            </div>

            <div style={{height: "36px"}}>
              <Input type="Submit" value="Sign up" />
            </div>
            <div className={registerStyle.text}>
              <h3>
                Already have an account? <Link to="/login">Login now</Link>
              </h3>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
