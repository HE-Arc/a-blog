import endpoints from "../configs/endpoints";
import ArticleForm from '../forms/ArticleForm';

export default class Article {
  constructor(data = {}) {
    this.id = parseInt(data.id);
    this.title = data.title;
    this.description = data.description;
    this.body = data.body;
    this.image = data.image;
    this.author = data.author;
    this.category = data.category;
    this.highlighted = data.highlighted;
    this.published = data.published;
    this.weight = data.weight;
    this.created_at = data.created_at;
  }

  static getForm(store, entity = false) {
    return new ArticleForm(store, entity);
  }

  static endpoint(id = false) {
    let endpoint = endpoints.articles;
    return id ? `${endpoint}/${id}` : endpoint;
  }

  static objectName() {
    return "Article";
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
      dispatch: { action: `articles/delete`, arg: data.id }
    };
  }
}
