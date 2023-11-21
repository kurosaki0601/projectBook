import BaseService from "./base.service";
import http from "./services.js";

class orderExtend extends BaseService {
  list(filter = null) {
    return http.get(
      `/api/collections/${this.name}/records?expand=userId,bookId`,
      {
        params: filter,
      }
    );
  }
}

const orderService = new orderExtend("order");

export default orderService;
