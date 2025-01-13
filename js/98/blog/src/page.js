import $ from 'jquery';
import DOMPurify from 'dompurify';

const subtitleElem = $('#subtitle');
const contentElem = $('#content');

export default function setPage(page) {
  subtitleElem.html(DOMPurify.sanitize(page.title));

  const content = typeof page.content === 'string' ? DOMPurify.sanitize(page.content) : page.content;
  contentElem.html(content);
}

/*setPage({ title: 'Joes Blog', content: 'This is the first content' });*/
