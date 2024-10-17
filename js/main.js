import { createPosts } from './post-generator.js';
import { renderPhotos } from './render-photos.js';
import { openBigPicture } from './big-photo.js';
import { uploadForm, initUploadModal } from './upload-photo-form.js';
import { pristine, addValidatingInputs } from './form-validation.js';
import './customazing-size-photo.js';
import './effects-slider.js';
import { getData } from './api.js';
import { closePhotoEditor } from './upload-photo-form.js';
const picturesContainer = document.querySelector('.pictures');
import { configFilter } from './filter-miniatures.js';

const posts = createPosts(); //создаёт пост
renderPhotos(posts);

// принятие данные с сервера
getData().then((photos) => {
  renderPhotos(photos);
  configFilter(photos); // инициализация фильтров
});

uploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const isValid = pristine.validate();

  if (!isValid) {
    evt.preventDefault();
  }
});

addValidatingInputs(closePhotoEditor); // теперь функция будет вызвана

picturesContainer.addEventListener('click', (evt) => {
  const currentImageClone = evt.target.closest('.picture'); //обработчик действует при клике на ссылку или все ее дочерние элементы

  if (currentImageClone) {
    evt.preventDefault();
    openBigPicture(posts, currentImageClone.dataset.pictureId);
  }
});

initUploadModal();
