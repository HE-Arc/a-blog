import endpoints from "../configs/endpoints";

export default class Mailinglist {
  constructor(data = {}) {
    this.id = data.id;
    this.name = data.name;
    this.count = data.active_subscribers_count;

  }

  static endpoint(id = false) {
    let endpoint = endpoints.mailinglists;
    return id ? `${endpoint}/${id}` : endpoint;
  }

  static objectName() {
    return "Mailinglist";
  }

  static createForm(data) {
    let formData = new FormData();
    let fields = Object.getOwnPropertyNames(data);
    fields.forEach(i => formData.append(i, data[i]));
    return formData;
  }
}
