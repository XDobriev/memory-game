const IMAGES_PATH = 'assets/images';

// Eight unique pictures, every one of them goes on the board twice.
export const CARD_IMAGES = [
  { name: 'sun', label: 'Солнце' },
  { name: 'moon', label: 'Луна' },
  { name: 'star', label: 'Звезда' },
  { name: 'heart', label: 'Сердце' },
  { name: 'leaf', label: 'Лист' },
  { name: 'drop', label: 'Капля' },
  { name: 'bolt', label: 'Молния' },
  { name: 'cherry', label: 'Вишня' },
].map((card) => ({ ...card, src: `${IMAGES_PATH}/${card.name}.svg` }));

export const PAIRS_COUNT = CARD_IMAGES.length;
