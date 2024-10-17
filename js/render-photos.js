const renderPhotos = (photosToRender) => {
  const picturesList = document.querySelector('.pictures');
  const photoFragment = document.createDocumentFragment();

  photosToRender.forEach((photo) => {
    const { id, url, description, likes, comments } = photo;
    const templatePictureClone = document
      .querySelector('#picture')
      .content.querySelector('.picture')
      .cloneNode(true);
    const image = templatePictureClone.querySelector('.picture__img');

    templatePictureClone.dataset.pictureId = id;
    image.src = url;
    image.alt = description;
    templatePictureClone.querySelector('.picture__likes').textContent = likes;
    templatePictureClone.querySelector('.picture__comments').textContent =
      comments.length;
    photoFragment.appendChild(templatePictureClone);
  });

  picturesList.appendChild(photoFragment);
};

export { renderPhotos };
