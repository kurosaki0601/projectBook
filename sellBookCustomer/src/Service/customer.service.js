import http from "./services";
import { AUTH_TOKEN } from "../utils/constants";
import jwt_decode from "jwt-decode";
import BaseService from "./base.service";
class CustomerExtend extends BaseService {
  signUp(data) {
    return http.post("/api/collections/users/records", data);
  }
  signIn(data) {
    return http.post("/api/collections/users/auth-with-password", data);
  }
  signOut() {
    localStorage.setItem(AUTH_TOKEN, "");
    return Promise.resolve();
  }
  isAuthenticated() {
    let authToken = localStorage.getItem(AUTH_TOKEN);
    if (authToken) {
      const data = jwt_decode(authToken);
      return data.exp * 1000 > new Date().getTime();
    }
    return false;
  }
  getCustomerInfo() {
    let CustomerId = null;
    let authToken = localStorage.getItem(AUTH_TOKEN);
    if (authToken) {
      const data = jwt_decode(authToken);
      CustomerId = data.id;
    }
    if (CustomerId) {
      return http.get(`/api/collections/users/records/${CustomerId}`);
    }
    return Promise.reject(null);
  }
}

const CustomerService = new CustomerExtend("users");

export default CustomerService;
