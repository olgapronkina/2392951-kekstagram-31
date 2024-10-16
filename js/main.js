import { createPosts } from './post-generator.js';
import { renderPhotos } from './render-photos.js';
import { uploadForm, initUploadModal } from './upload-photo-form.js';
import { pristine, addValidatingInputs } from './form-validation.js';
import './customazing-size-photo.js';
import './effects-slider.js';
import { getData } from './api.js';
import { closePhotoEditor } from './upload-photo-form.js';
import { openBigPicture } from './big-photo.js';

const picturesContainer = document.querySelector('.pictures');
const posts = createPosts(); //создаёт пост
renderPhotos(posts);

// Принимает Данные с сервера
getData().then((photos) => {
  //  Создает фотографии на странице
  renderPhotos(photos);

  // добавить Модальное окно с выбранной фотографией
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
