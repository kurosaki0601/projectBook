import BaseService from "./base.service";
import http from "./services.js";

class commentExtend extends BaseService {
  list(filter = null) {
    return http.get(
      `/api/collections/${this.name}/records?expand=userId,bookId`,
      {
        params: filter,
      }
    );
  }
}

const commentService = new commentExtend("comment");

export default commentService;
