import { numDecline } from './util';

const HASHTAG_MAX_COUNT = 5;
const MAX_HASHTAG_SIMBOLS = 20;

// const COMMENT_MAX_LENGTH = 140;

const ErrorMesseges = {
  HASHTAG_ERROR: 'Хеш-тег не может состоять только из одной решётки',
  MAX_HASHTAG_SIMBOLS: 'Хештег содержит недопустимые сибволы',
  HASHTAG_SPACE: 'Хештеги должны разделяться пробелами',
  HASHTAG_DUPLICATE: 'Один и тот же хештег не может быть использован дважды',
  COMMENT_LENGTH: 'Длина комментария недолжна быть более 140 символов',
  HASHTAG_FIRST: 'Хештег должен начинаться с #',
};

// const photoEditorForm = document.querySelector('.img-upload__overlay');
// const hashtagsInput = photoEditorForm.querySelector('.text__hashtags');
// // const commentInput = photoEditorForm.querySelector('.text__description');
// // const createPostButton = photoEditorForm.querySelector('.img-upload__submit');

// const pristine = new Pristine(photoEditorForm, {
//   classTo: 'img-upload__field-wrapper',
//   errorClass: 'img-upload__field-wrappe--invalid',
//   successClass: 'img-upload__field-wrappe--valid',
//   errorTextParent: 'img-upload__field-wrapper',
//   errorTextTag: 'div',
//   errorTextClass: 'img-upload__field-wrapper--error',
// });

let errorMessage = '';
const error = errorMessage;

const isHashtagValid = (value) => {
  // errorMessage = '';

  const inputText = value.toLowerCase().trim();

  const hashtagArray = inputText.split(/\s+/);

  const rules = [
    {
      check: hashtagArray.some((item) => item === '#'),
      error: ErrorMesseges.HASHTAG_ERROR,
    },

    {
      check: hashtagArray.some((item) => item.slice(1).includes('#')),
      error: ErrorMesseges.HASHTAG_SPACE,
    },

    {
      check: hashtagArray.some((item) => item[0] !== '#'),
      error: ErrorMesseges.HASHTAG_FIRST,
    },

    {
      check: hashtagArray.some((item, num, array) =>
        array.indexOf(item, num + 1)
      ),
      error: ErrorMesseges.HASHTAG_DUPLICATE,
    },

    {
      check: hashtagArray.some((item) => item.length > MAX_HASHTAG_SIMBOLS),
      error: `Максимальная длина одного хештега ${MAX_HASHTAG_SIMBOLS} символов, включая решётку`,
    },

    {
      check: hashtagArray.length > HASHTAG_MAX_COUNT,
      error: `Нельзя указать больше ${HASHTAG_MAX_COUNT} ${numDecline(
        HASHTAG_MAX_COUNT,
        'хештега',
        'хештегов',
        'хештегов'
      )} `,
    },

    {
      check: hashtagArray.some((item) => !/#[a-zа-яё0-9]{1,19}$/i.test(item)),
      error: ErrorMesseges.MAX_HASHTAG_SIMBOLS,
    },
  ];

  return rules.every((rule) => {
    const isValid = rule.check;
    if (!isValid) {
      errorMessage = rule.error;
    }
    return isValid;
  });
};

export { error, isHashtagValid };
