import ErgoEntity from './abstract/ErgoEntity';
import ErgoForm from './forms/ErgoForm';
import endpoints from "../configs/endpoints";

export default class Ergo extends ErgoEntity {
  constructor(data = {}) {
    super(data);
    this.id = data.id;
    this.group = data.group;
    this.first_name = data.first_name || "";
    this.last_name = data.last_name || "";
    this.is_moderator = data.is_moderator || false;
    this.is_pending_moderator = data.is_pending_moderator || false;
    this.public = data.public
  }

  static getForm(store, entity = false) {
    return new ErgoForm(store, entity);
  }

  static endpoint(id=false) {
    let endpoint = endpoints.ergos;
    return id ? `${endpoint}/${id}` : endpoint;
  }

  static objectName() {
    return "Ergothérapeute";
  }

  static deleteDialogOptions(data) {
    return {
      type: "warning",
      detail: `Effacer "${data.name}" ?`,
      dispatch: { action: `ergos/delete`, arg: data.id }
    };
  }

}

