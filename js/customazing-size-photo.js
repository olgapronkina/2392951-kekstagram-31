const photoEditorOverlay = document.querySelector('.img-upload__overlay');

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

const updateScale = () => {
  const currentScale = currentValue / 100;
  imgPrewiew.style.transform = `scale(${currentScale})`;
  scaleControll.value = `${currentValue}%`;
};

const onSmallerClick = () => {
  if (currentValue > SCALE_STEP) {
    currentValue -= SCALE_STEP;
    updateScale();
  }
};

const onBiggerClick = () => {
  if (currentValue < 100) {
    currentValue += SCALE_STEP;
    updateScale();
  }
};

const resetImgSize = () => {
  currentValue = 100;
  updateScale();
};

smallerButton.addEventListener('click', onSmallerClick);
biggerButton.addEventListener('click', onBiggerClick);
// photoEditorResetBth.addEventListener('click', resetImgSize);

export { resetImgSize };
