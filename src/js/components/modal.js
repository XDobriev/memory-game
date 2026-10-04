import { createElement } from '../utils/create-element.js';

let modalCounter = 0;

/**
 * Shared modal shell. Every window (win, leaderboard) only passes its own
 * content; creating the overlay, opening and closing live here.
 *
 * @param {object} options
 * @param {HTMLElement} options.root - page content that becomes inert while the modal is open
 */
export function createModal({ root }) {
  modalCounter += 1;
  const titleId = `modal-title-${modalCounter}`;

  const dialog = createElement('div', {
    className: 'modal',
    attrs: { role: 'dialog', 'aria-modal': 'true', 'aria-labelledby': titleId, tabindex: '-1' },
  });

  const overlay = createElement('div', { className: 'modal-overlay', children: [dialog] });

  let isOpen = false;
  let pressedOnOverlay = false;
  let lastFocused = null;

  function lockScroll() {
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.paddingRight = `${scrollbarWidth}px`;
    document.body.classList.add('scroll-locked');
  }

  function unlockScroll() {
    document.body.classList.remove('scroll-locked');
    document.body.style.paddingRight = '';
  }

  function handleKeydown(event) {
    if (event.key === 'Escape') {
      event.preventDefault();
      close();
    }
  }

  function close() {
    if (!isOpen) {
      return;
    }

    isOpen = false;
    overlay.remove();
    root.inert = false;
    unlockScroll();
    document.removeEventListener('keydown', handleKeydown);

    lastFocused?.focus();
  }

  // Close only when the whole click happened on the backdrop, so selecting
  // text inside the window and releasing the mouse outside keeps it open.
  overlay.addEventListener('mousedown', (event) => {
    pressedOnOverlay = event.target === overlay;
  });

  overlay.addEventListener('click', (event) => {
    if (pressedOnOverlay && event.target === overlay) {
      close();
    }
    pressedOnOverlay = false;
  });

  /**
   * @param {object} content
   * @param {string} content.title
   * @param {Node[]} content.body
   * @param {HTMLButtonElement[]} content.actions
   */
  function open({ title, body = [], actions = [] }) {
    const heading = createElement('h2', {
      className: 'modal__title',
      text: title,
      attrs: { id: titleId },
    });

    dialog.replaceChildren(
      heading,
      createElement('div', { className: 'modal__body', children: body }),
      createElement('div', { className: 'modal__actions', children: actions }),
    );

    if (!isOpen) {
      isOpen = true;
      lastFocused = document.activeElement;
      document.body.append(overlay);
      root.inert = true;
      lockScroll();
      document.addEventListener('keydown', handleKeydown);
    }

    (actions[0] ?? dialog).focus();
  }

  return { open, close };
}
