import { createElement } from './utils/create-element.js';
import { createHeader } from './components/header.js';
import { createStats } from './components/stats.js';
import { createBoard } from './components/board.js';
import { createGame } from './game.js';
import { PAIRS_COUNT } from './data/cards.js';

const stats = createStats(PAIRS_COUNT);
let game = null;

const board = createBoard({
  onCardClick: (index) => game.handleCardClick(index),
});

game = createGame({
  board,
  stats,
  onWin: () => {},
});

const header = createHeader({
  onNewGame: () => game.start(),
  onShowLeaderboard: () => {},
});

const main = createElement('main', {
  className: ['main', 'container'],
  children: [stats.element, board.element],
});

const app = createElement('div', { className: 'app', children: [header, main] });

document.body.append(app);
game.start();
