import { numDecline } from './util';
import { sendData } from './api.js';
import { sendDataSuccess, sendDataError } from './alert-message.js';
import { closePhotoEditor } from './upload-photo-form.js';

const SubmitButtonText = {
  IDLE: 'Опубликовать',
  SENDING: 'Публикую...',
};

const HASHTAG_MAX_COUNT = 5;
const MAX_HASHTAG_SYMBOLS = 20;
const COMMENT_MAX_LENGTH = 140;

const ErrorMesseges = {
  HASHTAG_ERROR: 'Хештег не может состоять только из одной решётки',
  MAX_HASHTAG_SIMBOLS: 'Хештег содержит недопустимые символы',
  HASHTAG_SPACE: 'Хештеги должны разделяться пробелами',
  HASHTAG_DUPLICATE: 'Один и тот же хештег не может быть использован дважды',
  COMMENT_LENGTH: 'Длина комментария недолжна быть более 140 символов',
  HASHTAG_FIRST: 'Хештег должен начинаться с #',
};

const photoEditorForm = document.querySelector('.img-upload__form');
const hashtagsInput = photoEditorForm.querySelector('.text__hashtags');
const commentInput = photoEditorForm.querySelector('.text__description');
const buttonSubmit = document.querySelector('#upload-submit');

let errorMessage = '';

const isHashtagValid = (value) => {
  errorMessage = '';

  const inputText = value.toLowerCase().trim();

  if (inputText.length === 0) {
    return true;
  }

  const hashtagArray = inputText.split(/\s+/);

  //массив с правилами для хештегов
  const rules = [
    {
      check: hashtagArray.some((item) => item === '#'),
      error: ErrorMesseges.HASHTAG_ERROR, //хештег не может состоять только из одной решетки
    },

    {
      check: hashtagArray.some((item) => item.slice(1).includes('#')),
      error: ErrorMesseges.HASHTAG_SPACE, //'Хештеги должны разделяться пробелами'
    },

    {
      check: hashtagArray.some((item) => item[0] !== '#'),
      error: ErrorMesseges.HASHTAG_FIRST, //хештег должен начинаться с решетки
    },

    {
      check: new Set(hashtagArray).size !== hashtagArray.length,
      error: ErrorMesseges.HASHTAG_DUPLICATE,
    }, //Один и тот же хештег не может быть использован дважды

    {
      check: hashtagArray.some((item) => item.length > MAX_HASHTAG_SYMBOLS),
      error: `Максимальная длина одного хештега ${MAX_HASHTAG_SYMBOLS} символов, включая решётку`,
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
    const isInvalid = rule.check;
    if (isInvalid) {
      errorMessage = rule.error;
    }
    return !isInvalid;
  });
};

const checkTextareaLength = (value) => value.length <= COMMENT_MAX_LENGTH; // Проверка длины комментария

const pristine = new Pristine(photoEditorForm, {
  classTo: 'img-upload__form',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error',
});

const blockSubmitButton = () => {
  buttonSubmit.disabled = true;
  buttonSubmit.textContent = SubmitButtonText.SENDING;
};

const unblockSubmitButton = () => {
  buttonSubmit.disabled = false;
  buttonSubmit.textContent = SubmitButtonText.IDLE;
};

const addValidatingInputs = (onSuccess) => {
  photoEditorForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    if (pristine.validate()) {
      hashtagsInput.value = hashtagsInput.value.trim().replaceAll(/\s+/g, ' ');
      blockSubmitButton();
      sendData(new FormData(evt.target))
        .then(() => {
          onSuccess();
          closePhotoEditor(); // закрываем редактор
        })
        .then(sendDataSuccess)
        .catch(() => sendDataError())
        .finally(unblockSubmitButton);
    }
  });
};

pristine.addValidator(
  hashtagsInput,
  isHashtagValid,
  () => errorMessage,
  1,
  true
);

pristine.addValidator(
  commentInput,
  checkTextareaLength,
  ErrorMesseges.COMMENT_LENGTH
);

// photoEditorForm.addEventListener('submit', onFormSubmit);

export { pristine, addValidatingInputs };
