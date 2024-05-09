import { createPosts } from './post-generator.js';
import { renderPhotos } from './render-photos.js';
import { openBigPicture } from './big-photo.js';

const picturesContainer = document.querySelector('.pictures');
const posts = createPosts(); //создаёт пост
renderPhotos(posts);

picturesContainer.addEventListener('click', (evt) => {
  const currentImageClone = evt.target.closest('.picture'); //обработчик действует при клике на ссылку или все ее дочерние элементы

  if (currentImageClone) {
    evt.preventDefault();
    openBigPicture(posts, currentImageClone.dataset.pictureId);
  }
});
