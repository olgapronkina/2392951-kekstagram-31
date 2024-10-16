import { showDataAlert } from './alert-message.js';

const BASE_URL = 'https://31.javascript.htmlacademy.pro/kekstagram';

const Url = {
  GET: '/data',
  SEND: '/',
};

const getData = () =>
  fetch(`${BASE_URL}${Url.GET}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error();
      }

      return response.json();
    })
    .catch(() => {
      showDataAlert();
    });

const sendData = (formData) =>
  fetch(`${BASE_URL}${Url.SEND}`, {
    method: 'POST',
    body: formData,
  }).then((response) => {
    if (!response.ok) {
      throw new Error('Не удалось отправить форму. Попробуйте ещё раз');
    }
  });

export { getData, sendData };
