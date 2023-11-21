import BaseService from "./base.service";
import http from "./services.js";

class bookExtend extends BaseService {
  list(filter = null) {
    return http.get(`/api/collections/${this.name}/records?expand=category`, {
      params: filter,
    });
  }
  filter(id) {
    return http.get(
      `/api/collections/${this.name}/records?filter=(category = "${id}")`
    );
  }
  searchName(value) {
    return http.get(
      `/api/collections/${this.name}/records?filter=(name ~ "${value}")`
    );
  }
}

const bookService = new bookExtend("book");

export default bookService;
