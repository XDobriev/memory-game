// pluralize(5, ['ход', 'хода', 'ходов']) -> 'ходов'
export function pluralize(count, [one, few, many]) {
  const lastTwo = Math.abs(count) % 100;
  const last = lastTwo % 10;

  if (lastTwo > 10 && lastTwo < 20) {
    return many;
  }

  if (last === 1) {
    return one;
  }

  if (last >= 2 && last <= 4) {
    return few;
  }

  return many;
}
