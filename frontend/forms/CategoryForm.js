import BaseForm from './abstract/BaseForm';

const defaultFields = [
  'name',
  'description',
  'published',
];

export default class CategoryForm extends BaseForm {
  constructor(attrs) {
    super({
      store: attrs.store,
      exclude: attrs.exclude,
      fields: attrs.fields ? attrs.fields : defaultFields,
      entity: attrs.entity ? attrs.entity : false,
    });
  }
}
