import endpoints from "../configs/endpoints";
import CategoryForm from './forms/CategoryForm';

export default class Category {
  constructor(data = {}) {
    this.id = parseInt(data.id);
    this.name = data.name;
    this.description = data.description;
    this.weight = data.weight;
    this.created_at = data.created_at;
    this.published = data.published;
  }

  static getForm(store, entity = false) {
    return new CategoryForm(store, entity);
  }

  static endpoint(id=false) {
    let endpoint = endpoints.categories;
    return id ? `${endpoint}/${id}` : endpoint;
  }

  static objectName() {
    return "Catégorie";
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
      detail: `Effacer "${data.name}" ?`,
      dispatch: { action: `categories/delete`, arg: data.id }
    };
  }
}
