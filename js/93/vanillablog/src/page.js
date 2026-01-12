import $ from 'jquery';

const title = $('#title');
const content = $('#content');

export default function setPage(page) {
  title.html(page.title);
  content.html(page.content);
}

/*setPage({ title: "Blog List", content: "This is the content" });*/
