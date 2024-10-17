import './render-photos';
import { isEscapeKey } from './util.js';
import { clearComments, renderComments } from './render-comments.js';

const bigPictureElement = document.querySelector('.big-picture'); //шаблон для большого поста
const bigPictureImgElement = document
  .querySelector('.big-picture__img')
  .querySelector('img'); //нода для отображения выбранной по клику фотографии
const likesCountElement = bigPictureElement.querySelector('.likes-count'); //элемент с кол-вом лайков

const commentCaptionElement =
  bigPictureElement.querySelector('.social__caption'); //элемент с описанием фотографии

const bigPictureCancel = bigPictureElement.querySelector(
  '.big-picture__cancel'
); //Кнопка для выхода из полноэкранного просмотра изображения

const onBigPictureCancelClick = (evt) => {
  evt.preventDefault();
  closeBigPicture();
};
const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
};

function closeBigPicture() {
  clearComments();
  bigPictureElement.classList.add('hidden');
  bigPictureCancel.removeEventListener('click', onBigPictureCancelClick);
  document.removeEventListener('keydown', onDocumentKeydown);
}

const openBigPicture = (posts, pictureId) => {
  const currentPhoto = posts.find((photo) => photo.id === Number(pictureId));

  bigPictureImgElement.src = currentPhoto.url; //присвоили большой картинке ссылку
  likesCountElement.textContent = currentPhoto.likes; //присвоили большой картинке лайки
  commentCaptionElement.textContent = currentPhoto.description;

  //комментарии
  renderComments(currentPhoto.comments);

  bigPictureElement.classList.remove('hidden');
  bigPictureCancel.addEventListener('click', onBigPictureCancelClick);
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
};

export { openBigPicture };
