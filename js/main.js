import { createPosts } from './post-generator.js';
import { renderPhotos } from './render-photos.js';
import { openBigPicture } from './big-photo.js';
import { uploadForm, initUploadModal } from './upload-photo-form.js';
import { pristine } from './form-validation.js';
import './customazing-size-photo.js';
import './effects-slider.js';

const picturesContainer = document.querySelector('.pictures');
const posts = createPosts(); //создаёт пост
renderPhotos(posts);

uploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const isValid = pristine.validate();

  if (!isValid) {
    evt.preventDefault();
  }
});

picturesContainer.addEventListener('click', (evt) => {
  const currentImageClone = evt.target.closest('.picture'); //обработчик действует при клике на ссылку или все ее дочерние элементы

  if (currentImageClone) {
    evt.preventDefault();
    openBigPicture(posts, currentImageClone.dataset.pictureId);
  }
});

initUploadModal();
