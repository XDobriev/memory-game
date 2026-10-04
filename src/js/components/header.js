import { createButton, createElement } from '../utils/create-element.js';

export function createHeader({ onNewGame, onShowLeaderboard }) {
  const title = createElement('h1', { className: 'header__title', text: 'Memory' });

  const newGameButton = createButton('Новая игра', {
    className: 'button--primary',
    onClick: onNewGame,
  });

  const leaderboardButton = createButton('Таблица лидеров', {
    className: 'button--ghost',
    onClick: onShowLeaderboard,
  });

  const controls = createElement('div', {
    className: 'header__controls',
    children: [newGameButton, leaderboardButton],
  });

  return createElement('header', {
    className: 'header',
    children: [
      createElement('div', { className: ['header__inner', 'container'], children: [title, controls] }),
    ],
  });
}
