import { createElement } from '../utils/create-element.js';

function createStat(label) {
  const value = createElement('span', { className: 'stat__value' });

  const element = createElement('p', {
    className: 'stat',
    children: [createElement('span', { className: 'stat__label', text: label }), value],
  });

  return { element, value };
}

export function createStats(pairsTotal) {
  const moves = createStat('Ходы');
  const pairs = createStat('Пары');

  const element = createElement('div', {
    className: 'stats',
    attrs: { 'aria-live': 'polite' },
    children: [moves.element, pairs.element],
  });

  function update({ movesCount, pairsFound }) {
    moves.value.textContent = String(movesCount);
    pairs.value.textContent = `${pairsFound} из ${pairsTotal}`;
  }

  update({ movesCount: 0, pairsFound: 0 });

  return { element, update };
}
