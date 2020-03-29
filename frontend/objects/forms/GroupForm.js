import BaseForm from './abstract/BaseForm';

const defaultFields = [
  "name",
  "name_complement",
  "moderator",
  "email",
  "phone",
  "website",
  "address",
  "number",
  "zip_code",
  "city",
  "at_home",
  "ambulatory",
  "areas",
  "specialties"
];

export default class GroupForm extends BaseForm {
  constructor(attrs) {
    super({
      store: attrs.store,
      exclude: attrs.exclude,
      fields: attrs.fields ? attrs.fields : defaultFields,
      entity: attrs.entity ? attrs.entity : false,
    });
  }
}
