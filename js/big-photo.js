import './render-photos';
import { isEscapeKey } from './util.js';

const bigPhotoElement = document.querySelector('.big-picture');
const bigPhotoOpenElement = document.querySelector('.picture__img');
const bigPhotoCloseElement = bigPhotoElement.querySelector('.cancel');

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeUserModal();
  }
};

function openBigPhoto() {
  bigPhotoElement.classList.remove('hidden');

  document.addEventListener('keydown', onDocumentKeydown);
}

bigPhotoOpenElement.addEventListener('click', () => {
  openBigPhoto();
});

function closeUserModal() {
  bigPhotoElement.classList.add('hidden');

  document.removeEventListener('keydown', onDocumentKeydown);
}

bigPhotoCloseElement.addEventListener('click', () => {
  closeUserModal();
});
