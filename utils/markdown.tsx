import Mark from "markdown-it";
import hljs from "config/highLight";
import { AddIdForHeadsType } from "./@type";

const mark = new Mark({
  html: true,
  xhtmlOut: true,
  breaks: true,
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return `<pre class="rounded"><code class="hljs ${lang}">${hljs.highlight(lang, str, true).value}</code></pre>`;
      } catch (__) {}
    }
    return '<pre class="rounded"><code class="hljs">' + mark.utils.escapeHtml(str) + "</code></pre>";
  },
});

let addIdForHeads: AddIdForHeadsType;

addIdForHeads = (className) => {
  if (className) {
    const headings = document.querySelector(className).querySelectorAll("h1, h2, h3, h4, h5, h6, h7");
    const headingMap = {};
    Array.prototype.forEach.call(headings, function (heading) {
      const id = heading.id
        ? heading.id
        : heading.textContent
            .trim()
            .toLowerCase()
            .split(" ")
            .join("-")
            .replace(/[!@#$%^&*():]/gi, "")
            .replace(/\//gi, "-");
      headingMap[id] = !isNaN(headingMap[id]) ? ++headingMap[id] : 0;
      if (headingMap[id]) {
        heading.id = id + "-" + headingMap[id];
      } else {
        heading.id = id;
      }
    });
    return !!headings.length;
  }
};

export { mark, addIdForHeads };
