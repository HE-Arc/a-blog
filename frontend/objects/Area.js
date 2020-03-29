import endpoints from "../configs/endpoints";

export default class Area {
  constructor(data = {}) {
    this.id = parseInt(data.id);
    this.name = data.name;
  }

  static endpoint(id = false) {
    let endpoint = endpoints.areas;
    return id ? `${endpoint}/${id}` : endpoint;
  }

  static objectName() {
    return "Zone de traitement";
  }
}
