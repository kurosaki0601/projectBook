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
  searchPrice(priceRange) {
    const [minPrice, maxPrice] = priceRange;
    return http.get(
      `/api/collections/${this.name}/records?filter=(price>=${minPrice} %26%26 price<=${maxPrice})`
    );
  }
}

const bookService = new bookExtend("book");

export default bookService;
