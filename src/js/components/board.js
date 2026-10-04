import { createElement } from '../utils/create-element.js';

const HIDDEN_LABEL = 'Закрытая карточка';

function createCard(card, index) {
  const image = createElement('img', {
    className: 'card__image',
    attrs: { src: card.src, alt: '', draggable: 'false' },
  });

  const inner = createElement('span', {
    className: 'card__inner',
    children: [
      createElement('span', { className: ['card__face', 'card__face--back'] }),
      createElement('span', { className: ['card__face', 'card__face--front'], children: [image] }),
    ],
  });

  return createElement('button', {
    className: 'card',
    attrs: { type: 'button', 'data-index': index, 'aria-label': HIDDEN_LABEL },
    children: [inner],
  });
}

export function createBoard({ onCardClick }) {
  const element = createElement('div', { className: 'board' });
  let cardElements = [];

  element.addEventListener('click', (event) => {
    const card = event.target.closest('.card');

    if (card && element.contains(card)) {
      onCardClick(Number(card.dataset.index));
    }
  });

  function render(cards) {
    cardElements = cards.map(createCard);
    element.replaceChildren(...cardElements);
  }

  function open(index, label) {
    const card = cardElements[index];
    card.classList.add('card--open');
    card.setAttribute('aria-label', label);
  }

  function close(index) {
    const card = cardElements[index];
    card.classList.remove('card--open');
    card.setAttribute('aria-label', HIDDEN_LABEL);
  }

  function markMatched(index) {
    cardElements[index].classList.add('card--matched');
  }

  function setLocked(isLocked) {
    element.classList.toggle('board--locked', isLocked);
  }

  return { element, render, open, close, markMatched, setLocked };
}
