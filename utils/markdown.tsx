import Mark from "markdown-it";
import hljs from "config/highLight";

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

export { mark };
