import endpoints from "../configs/endpoints";

export default class Newsletter {
  constructor(data = {}) {
    this.id = data.id;
    this.mailing_list = data.mailing_list;
    this.subject = data.subject;
    this.from_email = data.from_email;
    this.text_body = data.text_body;
    this.batch = data.batch;
    this.created_at = data.created_at;
  }

  static endpoint(id = false) {
    let endpoint = endpoints.newsletters;
    return id ? `${endpoint}/${id}` : endpoint;
  }

  static objectName() {
    return "Newsletter";
  }

  static createForm(data) {
    let formData = new FormData();
    let fields = Object.getOwnPropertyNames(data);
    fields.forEach(i => formData.append(i, data[i]));
    return formData;
  }
}
