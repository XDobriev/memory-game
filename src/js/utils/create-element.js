/**
 * Small wrapper around document.createElement.
 *
 * @param {string} tag
 * @param {object} [options]
 * @param {string|string[]} [options.className]
 * @param {string} [options.text]
 * @param {object} [options.attrs] - plain attributes (aria-*, type, src...)
 * @param {Array<Node|string>} [options.children]
 * @returns {HTMLElement}
 */
export function createElement(tag, { className, text, attrs, children } = {}) {
  const element = document.createElement(tag);

  if (className) {
    const classes = Array.isArray(className) ? className : [className];
    element.classList.add(...classes);
  }

  if (text !== undefined) {
    element.textContent = text;
  }

  if (attrs) {
    Object.entries(attrs).forEach(([name, value]) => {
      element.setAttribute(name, value);
    });
  }

  if (children) {
    element.append(...children);
  }

  return element;
}

export function createButton(text, { className, attrs, onClick } = {}) {
  const button = createElement('button', {
    className: ['button', ...[].concat(className ?? [])],
    text,
    attrs: { type: 'button', ...attrs },
  });

  if (onClick) {
    button.addEventListener('click', onClick);
  }

  return button;
}
