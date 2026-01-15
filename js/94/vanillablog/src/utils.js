import DOMPurify from 'dompurify';
import $ from 'jquery';

export function createElement(text) {
  return $(DOMPurify.sanitize(text));
}

let abortController;
export async function load(url, mapper) {
  if (abortController) {
    abortController.abort();
  }
  abortController = new AbortController();

  let content;

  try {
    const response = await fetch(url, { signal: abortController.signal });

    if (!response.ok) {
      throw new Error(`${response.status} - ${response.statusText}`);
    }

    const data = await response.json();

    content = data.map(datum => mapper(datum));
  } catch (e) {
    if (e.name !== 'abortController') {
      content = [
        `<div class="error">${e.message} - Failed to load ${url}</div>`,
      ];
    }
  }

  return content;
}
