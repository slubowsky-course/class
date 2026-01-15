import $ from 'jquery';
import DOMPurify from 'dompurify';

const title = $('#title');
const content = $('#content');

export default function setPage(page) {
  title.html(DOMPurify.sanitize(page.title));

  const c =
    typeof page.content === 'string'
      ? DOMPurify.sanitize(page.content)
      : page.content;

  content.html(c);
}

/*setPage({ title: "Blog List", content: "This is the content" });*/
