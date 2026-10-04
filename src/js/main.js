import { createElement } from './utils/create-element.js';
import { createHeader } from './components/header.js';
import { createStats } from './components/stats.js';
import { createBoard } from './components/board.js';
import { createModal } from './components/modal.js';
import { showWinModal } from './components/win-modal.js';
import { showLeaderboardModal } from './components/leaderboard-modal.js';
import { createGame } from './game.js';
import { saveResult } from './leaderboard.js';
import { PAIRS_COUNT } from './data/cards.js';

const app = createElement('div', { className: 'app' });
const modal = createModal({ root: app });
const stats = createStats(PAIRS_COUNT);

// The handler runs only on a real click, when `game` is already defined.
const board = createBoard({
  onCardClick: (index) => game.handleCardClick(index),
});

const game = createGame({
  board,
  stats,
  onWin: ({ moves }) => {
    saveResult(moves);
    showWinModal(modal, { moves, onNewGame: game.start });
  },
});

const header = createHeader({
  onNewGame: game.start,
  onShowLeaderboard: () => showLeaderboardModal(modal),
});

const main = createElement('main', {
  className: ['main', 'container'],
  children: [stats.element, board.element],
});

app.append(header, main);
document.body.append(app);
game.start();
