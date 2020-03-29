import { CheckBoxField, ImageField, SelectField, TextField, TextArea } from "./Field";
import fields from "../../Fields";

export default class BaseForm {
  constructor(attrs) {
    this.store = attrs.store;
    this.entity = attrs.entity;
    if (attrs.exclude && attrs.exclude.length) {
      attrs.fields = attrs.fields.filter(i => !attrs.exclude.includes(i))
    }
    this.textFields = this.initTextFields(fields.getFields(attrs.fields));
    this.textAreas = this.initTextAreas(fields.getFields(attrs.fields));
    this.checkBoxes = this.initCheckBoxes(fields.getFields(attrs.fields));
    this.selectFields = this.initSelectFields(fields.getFields(attrs.fields));
    this.imageFields = this.initImageFields(fields.getFields(attrs.fields));

    if (attrs.fields.includes("areas")) {
      this.getField("areas").items = attrs.store.state.areas.data;
    }
    if (attrs.fields.includes("specialties")) {
      this.getField("specialties").items = attrs.store.state.specialties.data;
    }
    if (attrs.fields.includes("category")) {
      this.getField("category").items = attrs.store.state.categories.data;
    }
    if (attrs.fields.includes("group")) {
      this.getField("group").items = attrs.store.state.groups.data;
    }
  }

  get isDirty() {
    return this.flatFieldsList.filter(i => i.isDirty).length > 0;
  }

  get isValid() {
    return this.flatFieldsList.filter(i => !i.isValid).length === 0;
  }

  get flatFieldsList() {
    return [
      ...this.textFields,
      ...this.textAreas,
      ...this.checkBoxes,
      ...this.imageFields,
      ...this.selectFields
    ];
  }

  createFormData() {
    let data = {};
    this.flatFieldsList
      .filter(field => field.isDirty)
      .forEach(field => (data[field.field] = field.value));

    this.selectFields
      .filter(i => i.isDirty)
      .forEach(i => (data[i.field] = i.idList));

    return data;
  }

  createForm() {
    let formData = new FormData();
    let fields = Object.getOwnPropertyNames(this.createFormData());
    fields.forEach(field => formData.append(field, data[field]));
    return formData;
  }

  initTextFields(fields) {
    let filtered = fields.filter(i => i.type == "textField");
    return this.initGeneric(filtered, TextField);
  }

  initTextAreas(fields) {
    let filtered = fields.filter(i => i.type == "textArea");
    return this.initGeneric(filtered, TextArea);
  }

  initCheckBoxes(fields) {
    let filtered = fields.filter(i => i.type == "checkBox");
    return this.initGeneric(filtered, CheckBoxField);
  }

  initSelectFields(fields) {
    let filtered = fields.filter(i => i.type == "select");
    return this.initGeneric(filtered, SelectField);
  }

  initImageFields(fields) {
    let filtered = fields.filter(i => i.type == "image");
    return this.initGeneric(filtered, ImageField);
  }

  initGeneric(fields, FieldObject) {
    let list = [];
    for (let field of fields) {
      field["value"] = this.entity ? this.entity[field.field] : "";
      list.push(new FieldObject(field));
    }
    return list;
  }

  getField(field) {
    return this.flatFieldsList.find(i => i.field == field);
  }
}
