import { photoEditorOverlay } from './upload-photo-form';

const smallerButton = photoEditorOverlay.querySelector(
  '.scale__control--smaller'
);
const biggerButton = photoEditorOverlay.querySelector(
  '.scale__control--bigger'
);
const imgPrewiew = document.querySelector('.img-upload__preview img');
const scaleControll = document.querySelector('.scale__control--value');

const SCALE_STEP = 25;

let currentValue = parseInt(scaleControll.value, 10);

// при нажатии проверяется если настоящее значение(100) больше 25,
// если это так, то настоящее значение уменьшается на 25 (75),
// создается переменная для шкалы и ей придатся значение 0.75,
// далее в стилях находится блок отвечающий за

const onSmallerClick = () => {
  if (currentValue > SCALE_STEP) {
    currentValue = currentValue - SCALE_STEP;
    const currentScale = currentValue / 100;
    imgPrewiew.style.transform = `scale(${currentScale})`;
    scaleControll.value = `${currentValue}%`;
    return currentValue;
  }
  return false;
};

const onBiggerClick = () => {
  if (currentValue < 100) {
    currentValue = currentValue + SCALE_STEP;
    const currentScale = currentValue / 100;

    imgPrewiew.style.transform = `scale(${currentScale})`;
    scaleControll.value = `${currentValue}%`;
    return currentValue;
  }
  return false;
};

smallerButton.addEventListener('click', onSmallerClick);
biggerButton.addEventListener('click', onBiggerClick);
// effectRadioButton.addEventListener('change', addEffects);
