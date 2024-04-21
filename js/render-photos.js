const templatePicture = document
  .querySelector('#picture')
  .content.querySelector('.picture');
const picturesList = document.querySelector('.pictures');
const photoFragment = document.createDocumentFragment();

const renderPhotos = (photos) => {
  photos.forEach((photo) => {
    const { url, description, likes, comments } = photo;
    const image = templatePicture.querySelector('.picture__img');
    const imageClone = image.cloneNode(true);
    imageClone.src = url;
    imageClone.alt = description;
    templatePicture.querySelector('.picture__likes').textContent = likes;
    templatePicture.querySelector('.picture__comments').textContent =
      comments.length;
    photoFragment.appendChild(imageClone);
  });
  picturesList.appendChild(photoFragment);
};

export { renderPhotos };
