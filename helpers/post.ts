import { isDev } from './env'
import { FirebasePost } from '../types/post'

export const canShowPost = (post: FirebasePost) => {
  if (isDev()) {
    return true
  }

  return !post.draft
}

const cases = [2, 0, 1, 1, 1, 2]
// words: '1 заметка', '2 заметки', '5 заметок'
export const getWord = (count, words) => {
  if (Array.isArray(words) && words.length !== 3) {
    console.error('Должен быть массив из 3 слов')
    return ''
  }
  return words[count % 100 > 4 && count % 100 < 20 ? 2 : cases[count % 10 < 5 ? count % 10 : 5]]
}

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
]
const halfAnHour = 1000 * 60 * 30
const oneHour = halfAnHour * 2
const oneHourAndHalf = oneHour + halfAnHour

export const formatDate = (dateAndTime = '') => {
  if (!dateAndTime.length) {
    return ''
  }

  const date = new Date(Date.parse(dateAndTime))
  const currentDate = new Date()
  const day = date.getDate()
  const month = date.getMonth()
  const year = date.getFullYear()
  const valueDifference = currentDate.valueOf() - date.valueOf()

  if (currentDate.getFullYear() !== year) {
    return `${day} ${months[month]} ${year}`
  }

  if (currentDate.getDate() !== day) {
    return `${day} ${months[month]}`
  }

  if (valueDifference < halfAnHour) {
    return 'Сейчас'
  }

  if (valueDifference < oneHour) {
    return 'Полчаса назад'
  }

  if (valueDifference < oneHourAndHalf) {
    return 'Час назад'
  }

  return 'Сегодня'
}
