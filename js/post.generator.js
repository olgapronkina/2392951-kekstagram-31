import {
  getRandomInteger,
  createUniqueIdsGenerator,
  getRandomArrayElement,
} from './util.js';
import {
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
} from './data.js';

const generateId = createUniqueIdsGenerator(RangeIDs.MIN, RangeIDs.MAX);

const generateIdComments = createUniqueIdsGenerator(
  RangeIDComment.MIN,
  RangeIDComment.MAX
);

const generatePhotoId = createUniqueIdsGenerator(
  RangePhotoIds.MIN,
  RangePhotoIds.MAX
);

const generateAvatarId = createUniqueIdsGenerator(
  RangeAvatarIds.MIN,
  RangeAvatarIds.MAX
);

const generatePhotoUrl = () => `photos/${generatePhotoId()}.jpg`;

const generateAvatarUrl = () => `img/avatar-${generateAvatarId()}.svg`;

const createComment = () => ({
  id: generateIdComments(),
  avatar: generateAvatarUrl(),
  message: `${getRandomArrayElement(COMMENT_MESSAGES)} ${getRandomArrayElement(
    COMMENT_MESSAGES
  )}`,
  name: getRandomArrayElement(COMMENT_NAMES),
});

const createPost = () => ({
  id: generateId(),
  url: generatePhotoUrl(),
  description: getRandomArrayElement(POST_DESCRIPTIONS),
  likes: getRandomInteger(RangeLikes.MIN, RangeLikes.MAX),
  comments: Array.from(
    { length: getRandomInteger(countOfComments.MIN, countOfComments.MAX) },
    createComment
  ),
});

const createPosts = () => Array.from({ length: POST_COUNT }, createPost);

export { createPosts };
