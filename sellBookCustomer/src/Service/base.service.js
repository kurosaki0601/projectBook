import http from "./services";

class BaseService {
  name = "";

  constructor(name) {
    this.name = name;
  }

  search(filter = null) {
    return http.get(`/api/collections/${this.name}/records`, {
      params: filter,
    });
  }

  read(id) {
    return http.get(`/api/collections/${this.name}/records/${id}`);
  }

  create(data) {
    return http.post(`/api/collections/${this.name}/records`, data);
  }

  update(id, data) {
    return http.patch(`/api/collections/${this.name}/records/${id}`, data);
  }

  delete(id) {
    return http.delete(`/api/collections/${this.name}/records/${id}`);
  }
}

export default BaseService;
