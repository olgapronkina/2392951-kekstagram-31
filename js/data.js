const DEBOUNCE_DELAY_DEFAULT = 500;

const POST_DESCRIPTIONS = [
  'Какая красота!',
  'Be happy',
  'Сыыыырр',
  'This is my outfit for today',
  'С семьёй',
  'Отпуск!!!',
];

const COMMENT_NAMES = [
  'Кира',
  'Платон',
  'Артём',
  'Глеб',
  'Максим',
  'Алёна',
  'Таисия',
  'Тимофей',
  'Анастасия',
  'Андрей ',
];

const COMMENT_MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const POST_COUNT = 25;

const RangeIDs = {
  MIN: 1,
  MAX: 25,
};

const RangeIDComment = {
  MIN: 1,
  MAX: 1000,
};

const RangePhotoIds = {
  MIN: 1,
  MAX: 25,
};

const RangeLikes = {
  MIN: 15,
  MAX: 200,
};

const countOfComments = {
  MIN: 0,
  MAX: 30,
};

const RangeAvatarIds = {
  MIN: 1,
  MAX: 6,
};

const FILTER = {
  default: 'filter-default',
  random: 'filter-random',
  discussed: 'filter-discussed',
};

const MAX_PICTURES_COUNT = 10;

const SORTFUNC = {
  random: () => 0.5 - Math.random(),
  discussed: (a, b) => b.comments.length - a.comments.length,
};

const ALERT_SHOW_TIME = 5000;

const HASHTAG_MAX_COUNT = 5;
const MAX_HASHTAG_SYMBOLS = 20;
const COMMENT_MAX_LENGTH = 140;

export {
  POST_DESCRIPTIONS,
  COMMENT_NAMES,
  COMMENT_MESSAGES,
  POST_COUNT,
  RangeIDs,
  RangeIDComment,
  RangePhotoIds,
  RangeLikes,
  countOfComments,
  RangeAvatarIds,
  FILTER,
  MAX_PICTURES_COUNT,
  SORTFUNC,
  ALERT_SHOW_TIME,
  HASHTAG_MAX_COUNT,
  MAX_HASHTAG_SYMBOLS,
  COMMENT_MAX_LENGTH,
  DEBOUNCE_DELAY_DEFAULT,
};
