import { useEffect, useState } from "react";
import CustomerService from "../Service/customer.service";

function useUserInfo() {
  const [userInfo, setUserInfo] = useState(null);

  const isAuthenticated = CustomerService.isAuthenticated();

  useEffect(() => {
    CustomerService.getCustomerInfo().then((result) => {
      setUserInfo(result.data);
    });
  }, [isAuthenticated]);

  return userInfo;
}

export default useUserInfo;
