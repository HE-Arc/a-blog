import endpoints from "../configs/endpoints";
import UserForm from '../forms/UserForm';

export default class User {
  constructor(data = {}) {
    this.id = data.id;
    this.email = data.email;
    this.first_name = data.first_name;
    this.last_name = data.last_name;
    this.full_name = data.full_name;
    this.short_name = data.short_name;
    this.picture = data.picture;

  }

  static getForm(store, entity = false) {
    return new UserForm(store, entity);
  }

  static endpoint(id= false) {
    let endpoint = endpoints.users;
    return id ? `${endpoint}/${id}` : endpoint;
  }

  static objectName() {
    return "User";
  }

  static deleteDialogOptions(data) {
    return {
      type: "warning",
      detail: `Effacer "${data.name}" ?`,
      dispatch: { action: `ergos/delete`, arg: data.id }
    };
  }

}

