import BaseForm from './abstract/BaseForm';

const defaultFields = [
  "last_name",
  "first_name",
  "picture",
];

export default class UserForm extends BaseForm {
  constructor(attrs) {
    super({
      store: attrs.store,
      exclude: attrs.exclude,
      fields: attrs.fields ? attrs.fields : defaultFields,
      entity: attrs.entity ? attrs.entity : false,
    });
  }
}
