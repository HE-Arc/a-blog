import BaseForm from "./abstract/BaseForm";

const defaultFields = [
  "title",
  "description",
  "category",
  "image",
  "published",
  "highlighted"
];

export default class ArticleForm extends BaseForm {
  constructor(attrs) {
    super({
      store: attrs.store,
      exclude: attrs.exclude,
      fields: attrs.fields ? attrs.fields : defaultFields,
      entity: attrs.entity ? attrs.entity : false,
    });
  }
}
