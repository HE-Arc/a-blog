
class Helpers {

  static range = (a, b) => [...Array(b || a).keys()].splice(b ? a : 0);
  static randint = (max) => Math.floor(Math.random() * Math.floor(max));

  static shuffleArray(array) {
    let x, y;
    for (let i = array.length - 1; i > 0; i--) {
      x = Math.floor(Math.random() * (i + 1));
      y = array[i];
      array[i] = array[x];
      array[x] = y;
    }
    return array;
  }

  static slugify(string) {
    const x = "àáäâãåăæąçćčđèéėëêęǵḧìíïîįłḿǹńňñòóöôœøṕŕřßśšșťțùúüûǘůűūųẃẍÿýźžż·/_,:;'";
    const v = "aaaaaaaaacccdeeeeeeghiiiiilmnnnnooooooprrssssttuuuuuuuuuwxyyzzz-------";
    const reg = new RegExp(x.split("").join("|"), "g");
    return string
      .toString()
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(reg, c => v.charAt(x.indexOf(c)))
      .replace(/&/g, "-and-")
      .replace(/[^\w\-]+/g, "")
      .replace(/\-\-+/g, "-")
      .replace(/^-+/, "")
      .replace(/-+$/, "");
  }

  static textElementsColor(theme) {
      const elements = ["p", "li", "blockquote"];
      let color = theme.dark ? "#fff" : "#757575";
      elements.forEach(el => {
        try {
          Array.from(document.getElementsByTagName(el)).forEach(el => {
            el.style.setProperty("color", color);
          });
        } catch (e) {
          null;
        }
      });
  }

  static dateFr(rawDate) {
    let d = new Date(rawDate);
    const ye = new Intl.DateTimeFormat("fr", { year: "numeric" }).format(d);
    const mo = new Intl.DateTimeFormat("fr", { month: "long" }).format(d);
    const da = new Intl.DateTimeFormat("fr", { day: "2-digit" }).format(d);
    return `${da} ${mo} ${ye}`;
  }

}


export default Helpers;
