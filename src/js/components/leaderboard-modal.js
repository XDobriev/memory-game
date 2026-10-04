import { createButton, createElement } from '../utils/create-element.js';
import { formatDate, getResults } from '../leaderboard.js';

function createRow(cells, cellTag = 'td') {
  return createElement('tr', {
    children: cells.map((text) => createElement(cellTag, { text: String(text) })),
  });
}

function createTable(results) {
  const head = createElement('thead', {
    children: [createRow(['Место', 'Ходы', 'Дата'], 'th')],
  });

  const body = createElement('tbody', {
    children: results.map((result, index) =>
      createRow([index + 1, result.moves, formatDate(result.date)]),
    ),
  });

  return createElement('table', { className: 'leaderboard', children: [head, body] });
}

export function showLeaderboardModal(modal) {
  const results = getResults();

  const content = results.length
    ? createTable(results)
    : createElement('p', { className: 'leaderboard__empty', text: 'Пока нет результатов' });

  const closeButton = createButton('Закрыть', {
    className: 'button--ghost',
    onClick: () => modal.close(),
  });

  modal.open({
    title: 'Таблица лидеров',
    body: [content],
    actions: [closeButton],
  });
}
