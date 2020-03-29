import BaseForm from './abstract/BaseForm';

const defaultFields = [
  "last_name",
  "first_name",
  "email",
  "phone",
  "website",
  "address",
  "number",
  "zip_code",
  "city",
  "at_home",
  "ambulatory",
  "is_moderator",
  "areas",
  "public",
  "specialties"
];

export default class ErgoForm extends BaseForm {
  constructor(attrs) {
    super({
      store: attrs.store,
      exclude: attrs.exclude,
      fields: attrs.fields ? attrs.fields : defaultFields,
      entity: attrs.entity ? attrs.entity : false,
    });
  }
}
