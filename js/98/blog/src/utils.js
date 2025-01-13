import DOMPurify from 'dompurify';
import $ from 'jquery';

export function createElement(content) {
  const sanitizedContent = DOMPurify.sanitize(content);
  return $(sanitizedContent);
}
