const cases = [2, 0, 1, 1, 1, 2];
// words: '1 заметка', '2 заметки', '5 заметок'
export const getWord = (count, words) => {
  if (Array.isArray(words) && words.length !== 3) {
    console.error('Должен быть массив из 3 слов');
    return '';
  }
  return words[
    (count % 100 > 4 && count % 100 < 20)
      ? 2
      : cases[(count % 10 < 5)
      ? count % 10
      : 5
        ]];
};
