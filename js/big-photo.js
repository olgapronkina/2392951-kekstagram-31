import './render-photos';
import { isEscapeKey } from './util.js';

const bigPictureElement = document.querySelector('.big-picture'); //шаблон для большого поста
const bigPictureImgElement = document
  .querySelector('.big-picture__img')
  .querySelector('img'); //нода для отображения выбранной по клику фотографии
const likesCountElement = bigPictureElement.querySelector('.likes-count'); //элемент с кол-вом лайков
const socialCommentsNode = bigPictureElement.querySelector('.social__comments'); //нода со списком комментов
const socialCommentTemplate =
  socialCommentsNode.querySelector('.social__comment'); //шаблон коментариев
const socialShownComments = bigPictureElement.querySelector(
  '.social__comment-shown-count'
);
const socialTotalComments = bigPictureElement.querySelector(
  '.social__comment-total-count'
);

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
  bigPictureElement.classList.add('hidden');
  bigPictureCancel.removeEventListener('click', onBigPictureCancelClick);
  document.removeEventListener('keydown', onDocumentKeydown);
}

const openBigPicture = (posts, pictureId) => {
  const currentPhoto = posts.find((photo) => photo.id === Number(pictureId));
  const socialCommentsFragment = document.createDocumentFragment();

  bigPictureImgElement.src = currentPhoto.url; //присвоили большой картинке ссылку
  likesCountElement.textContent = currentPhoto.likes; //присвоили большой картинке лайки
  socialCommentsNode.innerHTML = '';
  socialShownComments.textContent = currentPhoto.comments.length;
  socialTotalComments.textContent = currentPhoto.comments.length;

  //комментарии
  currentPhoto.comments.forEach((comment) => {
    const socialCommentNode = socialCommentTemplate.cloneNode(true);

    socialCommentNode.querySelector('.social__picture').src = comment.avatar;
    socialCommentNode.querySelector('.social__picture').alt = comment.name;
    socialCommentNode.querySelector('.social__text').textContent =
      comment.message;
    socialCommentsFragment.appendChild(socialCommentNode);
  });

  socialCommentsNode.appendChild(socialCommentsFragment);
  commentCaptionNode.textContent = currentPhoto.description;
  commentsCountNode.classList.add('hidden');
  commentsLoaderNode.classList.add('hidden');

  bigPictureElement.classList.remove('hidden');
  bigPictureCancel.addEventListener('click', onBigPictureCancelClick);
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
};

export { openBigPicture };
