import endpoints from "../configs/endpoints";

export default class External {
  constructor(data = {}) {
    this.id = data.id;
    this.email = data.email;
    this.description = data.description;
  }

  static endpoint(id = false) {
    let endpoint = endpoints.externals;
    return id ? `${endpoint}/${id}` : endpoint;
  }

  static objectName() {
    return "Externe";
  }

  static createForm(data) {
    let formData = new FormData();
    let fields = Object.getOwnPropertyNames(data);
    fields.forEach(i => formData.append(i, data[i]));
    return formData;
  }

  static deleteDialogOptions(data) {
    return {
      type: "warning",
      detail: `Supprimer "${data.email}" ?`,
      dispatch: { action: `externals/delete`, arg: data.id }
    };
  }
}
