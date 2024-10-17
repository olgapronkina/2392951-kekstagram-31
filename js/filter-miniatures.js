import { debounce } from './util.js';
import { renderPhotos } from './render-photos.js';
import { FILTER, MAX_PICTURES_COUNT, SORTFUNC } from './data.js';

let photos = []; // массив фотографий, который будет заполнен после загрузки
const imageFilterBlock = document.querySelector('.img-filters');
const ACTIVE_BUTTON_CLASS = 'img-filters__button--active';

// показать блок фильтров
const showImageFilterBlock = () => {
  imageFilterBlock.classList.remove('img-filters--inactive');
};

// const clearPhotos = () => {
//   const picturesList = document.querySelector('.pictures');
//   picturesList.innerHTML = ''; // очистка предыдущих фото
// };

const clearPhotos = () => {
  const picturesList = document.querySelector('.pictures');
  const picturesListElements = picturesList.querySelectorAll('.picture');
  picturesListElements.forEach((photo) => {
    photo.remove();
  }); // очистка предыдущих фото
};

const debounceRender = debounce((filteredPictures) => {
  clearPhotos();
  renderPhotos(filteredPictures);
}, 500);

function onFilterChange(evt) {
  const targetButton = evt.target;
  const activeButton = document.querySelector(`.${ACTIVE_BUTTON_CLASS}`);
  if (!targetButton.matches('button')) {
    return;
  }

  if (activeButton === targetButton) {
    return; // если кликнуть по уже активной кнопке, ничего не должно происходить
  }

  activeButton.classList.remove(ACTIVE_BUTTON_CLASS);
  targetButton.classList.add(ACTIVE_BUTTON_CLASS);

  const currentFilter = targetButton.getAttribute('id');
  applyFilters(currentFilter);
}

// cортировка по кол-ву комментариев
const sortByDiscussed = (photosArray) =>
  photosArray.slice().sort(SORTFUNC.discussed);

// 10 случайных фотографий
const getRandomPhotos = (photosArray) => {
  const shuffledPhotos = photosArray.sort(SORTFUNC.random);
  return shuffledPhotos.slice(0, MAX_PICTURES_COUNT);
};

function applyFilters(currentFilter) {
  let filteredPictures = [];

  switch (currentFilter) {
    case FILTER.default:
      filteredPictures = photos; // фотки в первоначальном порядке
      break;
    case FILTER.random:
      filteredPictures = getRandomPhotos(photos); // 10 случайных фотографий
      break;
    case FILTER.discussed:
      filteredPictures = sortByDiscussed(photos); // сортировка по комментариям
      break;
  }

  debounceRender(filteredPictures);
}

function configFilter(photosData) {
  showImageFilterBlock();
  imageFilterBlock.addEventListener('click', onFilterChange);
  photos = photosData;
}

export { configFilter };
