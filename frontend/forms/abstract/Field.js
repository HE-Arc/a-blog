class Field {
  constructor(type, attrs) {
    this.type = type;
    this.size = attrs.size;
    this.icon = attrs.icon;
    this.field = attrs.field;
    this.label = attrs.label;
    this.rules = attrs.rules;
    this.cache = attrs.value;
    this.value = attrs.value;
    this.fieldType = attrs.fieldType;
    this.required = !!attrs.rules.find(i => i.name === "req");
    this.disabled = false;
  }

  get isDirty() {
    return this.value !== this.cache;
  }

  get isValid() {
    if (!this.value && this.required) return false;
    if (!this.isDirty) return true;
    return !this.rules.filter(i => typeof i(this.value) === "string").length;
  }
}

class TextField extends Field {
  constructor(attrs) {
    super("TextField", attrs);
    this.counter = attrs.counter || null;
  }
}

class TextArea extends Field {
  constructor(attrs) {
    super("TextArea", attrs);
    this.counter = attrs.counter;
  }
}

class CheckBoxField extends Field {
  constructor(attrs) {
    super("CheckBoxField", attrs);
  }
}

class ImageField extends Field {
  constructor(attrs) {
    super("ImageField", attrs);
  }
}

class SelectField extends Field {
  constructor(attrs) {
    super("SelectField", attrs);
    this.items = attrs.items;
    this.many = attrs.many;
  }

  get idList() {
    if (this.many) {
      let filtered = this.items.filter(i => this.value.includes(i.name));
      return filtered.map(i => i.id);
    } else {
      return parseInt(this.items.find(i => i.name === this.value).id);
    }
  }
}

export { TextField, TextArea, CheckBoxField, ImageField, SelectField };
