import ErgoEntity from './abstract/ErgoEntity';
import GroupForm from './forms/GroupForm';
import endpoints from "../configs/endpoints";

export default class Group extends ErgoEntity {
  constructor(data = {}) {
    super(data);
    this.id = parseInt(data.id);
    // this.moderator = data.moderator;
    this.moderator = data.moderator_ergo;
    this.name_complement = data.name_complement;
  }

  static getForm(store, entity = false) {
    return new GroupForm(store, entity);
  }

  static form(entity = false) {
    return new GroupForm(entity)
  }

  static endpoint(id = false) {
    let endpoint = endpoints.groups;
    return id ? `${endpoint}/${id}` : endpoint;
  }

  static objectName() {
    return "Association";
  }

  static deleteDialogOptions(data) {
    return {
      type: "warning",
      detail: `Effacer "${data.name}" ?`,
      dispatch: { action: `groups/delete`, arg: data.id }
    };
  }
}
