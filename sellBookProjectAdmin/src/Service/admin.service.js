import http from "./services";
import { AUTH_TOKEN } from "../utils/constants";
import jwt_decode from "jwt-decode";

const AdminService = {
  signUp(data) {
    return http.post("/api/collections/admin/records", data);
  },
  signIn(data) {
    return http.post("/api/collections/admin/auth-with-password", data);
  },
  signOut() {
    localStorage.setItem(AUTH_TOKEN, "");
    return Promise.resolve();
  },
  isAuthenticated() {
    let authToken = localStorage.getItem(AUTH_TOKEN);
    if (authToken) {
      const data = jwt_decode(authToken);
      return data.exp * 1000 > new Date().getTime();
    }
    return false;
  },
  getAdminInfo() {
    let adminId = null;
    let authToken = localStorage.getItem(AUTH_TOKEN);
    if (authToken) {
      const data = jwt_decode(authToken);
      adminId = data.id;
    }
    if (adminId) {
      return http.get(`/api/collections/admin/records/${adminId}`);
    }
    return Promise.reject(null);
  },
};

export default AdminService;
