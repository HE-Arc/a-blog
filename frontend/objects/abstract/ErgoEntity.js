export default class ErgoEntity {
  constructor(data = {}) {
    this.picture = data.picture || "";
    this.description = data.description || "";

    this.name = data.name || "";
    this.phone = data.phone || "";
    this.email = data.email;
    this.website = data.website || "";
    this.address = data.address || "";
    this.number = data.number || "";
    this.zip_code = data.zip_code || "";
    this.city = data.city || "";

    this.specialties = data.specialties || [];
    this.areas = data.areas || [];

    this.at_home = data.at_home || false;
    this.ambulatory = data.ambulatory || false;

    this.mailing_list = data.mailing_list || "";

    this.phoneHtml = ErgoEntity.formatPhone(this.phone);
    this.phonePretty = ErgoEntity.formatPhone(this.phone, true);
  }

  static formatPhone(phone, pretty = false) {
    if (!phone) return "";
    let code = phone.slice(0, 3);
    let a = phone.slice(3, 6);
    let b = phone.slice(6, 8);
    let c = phone.slice(8, 10);
    if (!pretty) {
      return `tel:+41${code.slice(1, 2)}-${a}-${b}-${c}`;
    }
    return `${code}/${a}.${b}.${c}`;
  }

  static createForm(data) {
    let formData = new FormData();
    let fields = Object.getOwnPropertyNames(data);
    fields.forEach(i => formData.append(i, data[i]));
    return formData;
  }
}
