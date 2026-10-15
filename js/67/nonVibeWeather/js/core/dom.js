const FORBIDDEN_PROPS = new Set(['innerHTML', 'outerHTML']);

// No raw-HTML path on purpose: API-sourced strings must only ever become text nodes.
export function h(tag, props = {}, ...children) {
  const el = document.createElement(tag);

  for (const [name, value] of Object.entries(props)) {
    if (value == null || value === false) continue;
    if (FORBIDDEN_PROPS.has(name)) throw new Error(`h(): "${name}" is not allowed`);

    if (name.startsWith('on') && typeof value === 'function') {
      el.addEventListener(name.slice(2).toLowerCase(), value);
    } else if (name === 'class') {
      el.className = value;
    } else {
      el.setAttribute(name, value === true ? '' : String(value));
    }
  }

  el.append(...children.flat().filter((c) => c != null && c !== false));
  return el;
}

export function setText(el, text) {
  if (el.textContent !== text) el.textContent = text;
}
