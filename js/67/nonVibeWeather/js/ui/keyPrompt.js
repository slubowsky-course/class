import { h, setText } from '../core/dom.js';

export function createKeyPrompt({ credentials, onChange }) {
  const spec = credentials.spec;

  const input = h('input', {
    id: 'key-input',
    type: 'password',
    autocomplete: 'off',
    spellcheck: 'false',
    required: true,
    'aria-describedby': 'key-help key-message',
  });
  const showToggle = h('input', {
    id: 'key-show',
    type: 'checkbox',
    onchange: () => { input.type = showToggle.checked ? 'text' : 'password'; },
  });
  const message = h('p', { id: 'key-message', class: 'dialog-message', role: 'alert' });
  const saveBtn = h('button', { type: 'submit' }, 'Save');
  const anywayBtn = h('button', { type: 'button', hidden: true }, 'Save anyway');
  const removeBtn = h('button', { type: 'button', hidden: true }, 'Remove key');
  const cancelBtn = h('button', { type: 'button', onclick: () => dialog.close() }, 'Cancel');

  const form = h('form', { class: 'dialog-form' },
    h('h2', { id: 'key-title' }, spec.label),
    h('p', { id: 'key-help' }, spec.help, ' ',
      h('a', { href: spec.signupUrl, target: '_blank', rel: 'noopener noreferrer' }, 'Get a free key'),
      '. Use a key you only use here: it is stored in this browser.'),
    h('label', { for: 'key-input' }, spec.label),
    input,
    h('label', { class: 'inline-label', for: 'key-show' }, showToggle, ' Show key'),
    message,
    h('div', { class: 'dialog-actions' }, saveBtn, anywayBtn, removeBtn, cancelBtn));

  const dialog = h('dialog', { 'aria-labelledby': 'key-title' }, form);
  document.body.append(dialog);

  function setBusy(busy) {
    saveBtn.disabled = busy;
    anywayBtn.disabled = busy;
  }

  function explain(result) {
    if (result.reason === 'format') return `That does not look like a valid key (expected ${spec.formatHint}).`;
    if (result.reason === 'rejected') {
      return 'The service rejected this key. It may be mistyped, or a new key may not be active yet (activation can take up to a couple of hours).';
    }
    return result.error?.message ?? 'Could not check the key. Please try again.';
  }

  async function submit(force) {
    setBusy(true);
    setText(message, 'Checking key…');
    anywayBtn.hidden = true;
    const result = await credentials.save(input.value, { force });
    setBusy(false);

    if (result.ok) {
      dialog.close();
      onChange();
      return;
    }
    setText(message, explain(result));
    anywayBtn.hidden = result.reason !== 'rejected';
  }

  form.addEventListener('submit', (event) => { event.preventDefault(); submit(false); });
  anywayBtn.addEventListener('click', () => submit(true));
  removeBtn.addEventListener('click', () => {
    credentials.clear();
    dialog.close();
    onChange();
  });
  dialog.addEventListener('close', () => { input.value = ''; });

  return {
    open() {
      input.value = '';
      input.type = 'password';
      showToggle.checked = false;
      setText(message, '');
      anywayBtn.hidden = true;
      removeBtn.hidden = !credentials.hasKey();
      setBusy(false);
      dialog.showModal();
      input.focus();
    },
  };
}
