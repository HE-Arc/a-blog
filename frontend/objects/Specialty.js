import endpoints from "../configs/endpoints";

export default class Specialty {
  constructor(data = {}) {
    this.id = parseInt(data.id);
    this.name = data.name;
  }

  static endpoint(id = false) {
    let endpoint = endpoints.specialties;
    return id ? `${endpoint}/${id}` : endpoint;
  }

  static objectName() {
    return "Spécialité";
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
      detail: `Effacer "${data.title}" ?`,
      dispatch: { action: `specialties/delete`, arg: data.id }
    };
  }
}
