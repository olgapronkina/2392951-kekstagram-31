import './render-photos';
import { isEscapeKey } from './util.js';
import { clearComments, renderComments } from './render-comments.js';

const bigPictureElement = document.querySelector('.big-picture'); //шаблон для большого поста
const bigPictureImgElement = document
  .querySelector('.big-picture__img')
  .querySelector('img'); //нода для отображения выбранной по клику фотографии
const likesCountElement = bigPictureElement.querySelector('.likes-count'); //элемент с кол-вом лайков

// const socialShownComments = bigPictureElement.querySelector(
//   '.social__comment-shown-count'
// );
// const socialTotalComments = bigPictureElement.querySelector(
//   '.social__comment-total-count'
// );

const commentCaptionNode = bigPictureElement.querySelector('.social__caption'); //элемент с описанием фотографии
const commentsCountNode = bigPictureElement.querySelector(
  '.social__comment-count'
);
const commentsLoaderNode = bigPictureElement.querySelector('.comments-loader'); //Кнопка для загрузки новой порции комментариев
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
  commentCaptionNode.textContent = currentPhoto.description;

  //комментарии
  renderComments(currentPhoto.comments);

  bigPictureElement.classList.remove('hidden');
  bigPictureCancel.addEventListener('click', onBigPictureCancelClick);
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
};

export { openBigPicture };
