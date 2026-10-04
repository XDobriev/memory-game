import { CARD_IMAGES, PAIRS_COUNT } from './data/cards.js';
import { shuffle } from './utils/shuffle.js';

// How long a mismatched pair stays face up (task allows 700–1500 ms).
const MISMATCH_DELAY = 1000;

function createDeck() {
  const deck = CARD_IMAGES.flatMap((image) => [image, image]);

  return shuffle(deck).map((image) => ({ ...image, isOpen: false, isMatched: false }));
}

export function createGame({ board, stats, onWin }) {
  const state = {
    cards: [],
    selected: [],
    moves: 0,
    pairsFound: 0,
    isLocked: false,
    isFinished: false,
    closeTimerId: null,
  };

  function updateStats() {
    stats.update({ movesCount: state.moves, pairsFound: state.pairsFound });
  }

  function setLocked(isLocked) {
    state.isLocked = isLocked;
    board.setLocked(isLocked);
  }

  function start() {
    clearTimeout(state.closeTimerId);

    state.cards = createDeck();
    state.selected = [];
    state.moves = 0;
    state.pairsFound = 0;
    state.isFinished = false;
    state.closeTimerId = null;
    setLocked(false);

    board.render(state.cards);
    updateStats();
  }

  function closeMismatched() {
    state.selected.forEach((index) => {
      state.cards[index].isOpen = false;
      board.close(index);
    });

    state.selected = [];
    state.closeTimerId = null;
    setLocked(false);
  }

  function finish() {
    state.isFinished = true;
    onWin({ moves: state.moves });
  }

  function checkPair() {
    const [first, second] = state.selected.map((index) => state.cards[index]);

    if (first.name !== second.name) {
      setLocked(true);
      state.closeTimerId = setTimeout(closeMismatched, MISMATCH_DELAY);
      return;
    }

    state.selected.forEach((index) => {
      state.cards[index].isMatched = true;
      board.markMatched(index);
    });

    state.selected = [];
    state.pairsFound += 1;

    if (state.pairsFound === PAIRS_COUNT) {
      finish();
    }
  }

  function handleCardClick(index) {
    const card = state.cards[index];

    if (!card || state.isFinished || state.isLocked || card.isOpen || card.isMatched) {
      return;
    }

    card.isOpen = true;
    board.open(index, card.label);
    state.selected.push(index);

    if (state.selected.length < 2) {
      return;
    }

    state.moves += 1;
    checkPair();
    updateStats();
  }

  return { start, handleCardClick };
}
