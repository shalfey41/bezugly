const months = [
  'января',
  'февраля',
  'марта',
  'апреля',
  'мая',
  'июня',
  'июля',
  'августа',
  'сентября',
  'октября',
  'ноября',
  'декабря',
];
const halfAnHour = 1000 * 60 * 30;
const oneHour = halfAnHour * 2;
const oneHourAndHalf = oneHour + halfAnHour;

export const formatDate = (dateAndTime = '') => {
  if (!dateAndTime.length) {
    return '';
  }

  const date = new Date(Date.parse(dateAndTime));
  const currentDate = new Date();
  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();
  const valueDifference = currentDate.valueOf() - date.valueOf();

  if (currentDate.getFullYear() !== year) {
    return `${day} ${months[month]} ${year}`;
  }

  if (currentDate.getDate() !== day) {
    return `${day} ${months[month]}`;
  }

  if (valueDifference < halfAnHour) {
    return 'Сейчас';
  }

  if (valueDifference < oneHour) {
    return 'Полчаса назад';
  }

  if (valueDifference < oneHourAndHalf) {
    return 'Час назад';
  }

  return 'Сегодня';
};
