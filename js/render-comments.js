const COUNT_STEP = 5;
let currentCount = 0;
let comments = [];

const bigPictureElement = document.querySelector('.big-picture'); //шаблон для большого поста
const socialCommentsNode = bigPictureElement.querySelector('.social__comments'); //нода со списком комментов
const socialCommentTemplate =
  socialCommentsNode.querySelector('.social__comment'); //шаблон коментов
// const commentsCountNode = bigPictureElement.querySelector(
//   '.social__comment-count'
// );
const commentsLoaderNode = bigPictureElement.querySelector('.comments-loader'); //Кнопка для загрузки новой порции комментов
const socialShownComments = bigPictureElement.querySelector(
  '.social__comment-shown-count'
);
const socialTotalComments = bigPictureElement.querySelector(
  '.social__comment-total-count'
);
socialCommentsNode.innerHTML = '';

const renderNextComments = () => {
  const socialCommentsFragment = document.createDocumentFragment();
  const renderedComments = comments.slice(
    currentCount,
    currentCount + COUNT_STEP
  );
  const renderedCommentsLength = renderedComments.length + currentCount;

  renderedComments.forEach((comment) => {
    const socialCommentNode = socialCommentTemplate.cloneNode(true);

    socialCommentNode.querySelector('.social__picture').src = comment.avatar;
    socialCommentNode.querySelector('.social__picture').alt = comment.name;
    socialCommentNode.querySelector('.social__text').textContent =
      comment.message;
    socialCommentsFragment.appendChild(socialCommentNode);
  });
  socialCommentsNode.appendChild(socialCommentsFragment);
  socialShownComments.textContent = renderedCommentsLength;
  socialTotalComments.textContent = comments.length;

  if (renderedCommentsLength >= comments.length) {
    commentsLoaderNode.classList.add('hidden');
  }
  currentCount += COUNT_STEP;
};

const clearComments = () => {
  currentCount = 0;
  socialCommentsNode.innerHTML = '';
  commentsLoaderNode.classList.remove('hidden');
  commentsLoaderNode.removeEventListener('click', renderNextComments);
};

const renderComments = (currentPhotoComments) => {
  comments = currentPhotoComments;
  renderNextComments();
  commentsLoaderNode.addEventListener('click', renderNextComments);
};

export { clearComments, renderComments };
