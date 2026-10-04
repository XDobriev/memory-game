import { createElement } from './utils/create-element.js';
import { createHeader } from './components/header.js';
import { createStats } from './components/stats.js';
import { createBoard } from './components/board.js';
import { createModal } from './components/modal.js';
import { showWinModal } from './components/win-modal.js';
import { createGame } from './game.js';
import { PAIRS_COUNT } from './data/cards.js';

const app = createElement('div', { className: 'app' });
const modal = createModal({ root: app });
const stats = createStats(PAIRS_COUNT);
let game = null;

const board = createBoard({
  onCardClick: (index) => game.handleCardClick(index),
});

game = createGame({
  board,
  stats,
  onWin: ({ moves }) => {
    showWinModal(modal, { moves, onNewGame: game.start });
  },
});

const header = createHeader({
  onNewGame: () => game.start(),
  onShowLeaderboard: () => {},
});

const main = createElement('main', {
  className: ['main', 'container'],
  children: [stats.element, board.element],
});

app.append(header, main);
document.body.append(app);
game.start();
