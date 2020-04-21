import rules from "../forms/abstract/rules.js";

class Fields {
  constructor() {
    this.fields = [
      {
        type: "textField",
        field: "title",
        label: "Titre",
        size: 12,
        rules: [rules.req]
      },
      {
        type: "textField",
        field: "last_name",
        label: "Nom",
        size: 6,
        rules: [rules.req]
      },
      {
        type: "textField",
        field: "first_name",
        label: "Prénom",
        size: 6,
        rules: [rules.req]
      },
      {
        type: "textField",
        field: "name",
        label: "Nom",
        size: 6,
        rules: [rules.req, rules.max(64)],
        counter: 64
      },
      {
        type: "textField",
        field: "name_complement",
        label: "Complément",
        size: 6,
        rules: [rules.max(64)],
        counter: 64
      },
      {
        type: "textField",
        field: "moderator",
        label: "Modérateur",
        size: 6,
        rules: []
      },
      {
        type: "textField",
        field: "email",
        label: "Email",
        icon: "mdi-email-outline",
        size: 6,
        rules: [rules.req, rules.email]
      },
      {
        type: "textField",
        field: "phone",
        label: "Téléphone",
        icon: "mdi-phone",
        size: 6,
        rules: [rules.num, rules.len(10)]
      },
      {
        type: "textField",
        field: "website",
        label: "Site web",
        icon: "mdi-web",
        size: 12,
        rules: []
      },
      {
        type: "textField",
        field: "address",
        label: "Rue",
        icon: "",
        size: 9,
        rules: []
      },
      {
        type: "textField",
        field: "number",
        label: "Numéro",
        icon: "",
        size: 3,
        rules: [],
        // fieldType: "number"
      },
      {
        type: "textField",
        field: "zip_code",
        label: "Code postal",
        icon: "mdi-mailbox-open-up-outline",
        size: 6,
        rules: [],
        fieldType: "number"
      },
      {
        type: "textField",
        field: "city",
        label: "Ville",
        icon: "mdi-city-variant-outline",
        size: 6,
        rules: []
      },
      {
        type: "textField",
        field: "password",
        label: "Mot de passe",
        size: 12,
        rules: [rules.req]
      },
      {
        type: "checkBox",
        field: "at_home",
        label: "À domicile",
        size: 3,
        rules: []
      },
      {
        type: "checkBox",
        field: "ambulatory",
        label: "Ambulatoire",
        size: 3,
        rules: []
      },
      {
        type: "checkBox",
        field: "is_moderator",
        label: "Modérateur",
        size: 3,
        rules: []
      },
      {
        type: "checkBox",
        field: "public",
        label: "Publique",
        size: 3,
        rules: []
      },
      {
        type: "checkBox",
        field: "published",
        label: "Visible",
        size: 4,
        rules: []
      },
      {
        type: "checkBox",
        field: "highlighted",
        label: "Highlight",
        size: 4,
        rules: []
      },
      {
        type: "select",
        field: "areas",
        label: "Zones de traitement",
        icon: "mdi-map",
        size: 12,
        many: true,
        rules: []
      },
      {
        type: "select",
        field: "specialties",
        label: "Spécialité",
        icon: "mdi-brain",
        size: 6,
        many: true,
        // rules: []
        rules: []
      },
      {
        type: "select",
        field: "group",
        label: "Association",
        size: 6,
        many: false,
        rules: []
      },
      {
        type: "textArea",
        field: "description",
        label: "Description",
        size: 12,
        rules: [rules.max(520)],
        counter: 520
      },
      {
        type: "select",
        field: "category",
        label: "Catégorie",
        size: 6,
        many: false,
        rules: [rules.req]
      },

      {
        type: "image",
        field: "image",
        label: "Image",
        size: 12,
        rules: [rules.req]
      }
    ];
  }
  getFields(fieldsList) {
    return this.fields.filter(field => fieldsList.includes(field.field));
  }
}

const fields = new Fields();
export default fields;
