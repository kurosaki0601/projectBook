import LoginStyle from "../../styles/Auth.module.css";
import { useFormik } from "formik";
import * as yup from "yup";
import AdminService from "../../Service/admin.service";
import { AUTH_TOKEN } from "../../utils/constants";
import {  useNavigate } from "react-router-dom";
import { useState } from "react";


const Login = () => {
  const [loginError, setLoginError] = useState(null);
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: yup.object({
      email: yup
        .string()
        .required("Email is required")
        .email("Incorrect email format"),
      password: yup
        .string()
        .required("Password is required")
        .min(8, "Password must be at least 8 characters")
        .max(24, "Password must be at least 24 characters"),
    }),
    onSubmit: async (values) => {
      try{
        const result = await AdminService.signIn({
          identity: values.email,
          password: values.password,
        });
        localStorage.setItem(AUTH_TOKEN, result.data.token);
        navigate("/admin/customers");
      }catch(error){
        setLoginError('Login unsuccessful. Please check your login information again.');
      }
      
    },
  });

  return (
    <div className={LoginStyle.container}>
      <div className={`${LoginStyle.login} ${LoginStyle.form}`}>
        <header>Login</header>
        <form onSubmit={formik.handleSubmit}>
          <input
            type="text"
            name="email"
            placeholder="Enter your email"
            value={formik.values.email}
            onChange={formik.handleChange}
          />
          {formik.errors.email && formik.touched.email && (
            <div className={LoginStyle.error}> {formik.errors.email}</div>
          )}

          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formik.values.password}
            onChange={formik.handleChange}
          />
          {formik.errors.password && formik.touched.password && (
            <div className={LoginStyle.error}> {formik.errors.password}</div>
          )}

          {loginError && <div className={LoginStyle.error}>{loginError}</div>}
         <button className={LoginStyle.buttonLogin}>Login</button>
        </form>
        
      </div>
    </div>
  );
};

export default Login;
