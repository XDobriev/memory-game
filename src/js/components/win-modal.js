import { createButton, createElement } from '../utils/create-element.js';
import { pluralize } from '../utils/pluralize.js';

export function showWinModal(modal, { moves, onNewGame }) {
  const result = createElement('p', {
    className: 'win__result',
    children: [
      'Все пары найдены за ',
      createElement('strong', { text: `${moves} ${pluralize(moves, ['ход', 'хода', 'ходов'])}` }),
    ],
  });

  const newGameButton = createButton('Новая игра', {
    className: 'button--primary',
    onClick: () => {
      modal.close();
      onNewGame();
    },
  });

  const closeButton = createButton('Закрыть', {
    className: 'button--ghost',
    onClick: () => modal.close(),
  });

  modal.open({
    title: 'Победа!',
    body: [result],
    actions: [newGameButton, closeButton],
  });
}
