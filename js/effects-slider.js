const imgUploadWrapper = document.querySelector('.img-upload__wrapper');
const effectList = imgUploadWrapper.querySelector('.effects__list');
const imgPreview = imgUploadWrapper.querySelector('.img-upload__preview');
const effectSlider = imgUploadWrapper.querySelector('.effect-level__slider');
const effectLevel = imgUploadWrapper.querySelector('.img-upload__effect-level');
const effectLevelValue = imgUploadWrapper.querySelector('.effect-level__value');
const effectNone = imgUploadWrapper.querySelector('#effect-none');

// const photoEditorResetBth = document.querySelector('#upload-cancel');

noUiSlider.create(effectSlider, {
  start: [0],
  connect: 'lower',
  range: {
    min: [0],
    max: [1],
  },
});

// когда происходит обновление слайдера его новое значение записывается в переменную effectLevelValue
effectSlider.noUiSlider.on('update', () => {
  effectLevelValue.value = effectSlider.noUiSlider.get();
});

effectLevel.classList.add('hidden');

const onEffectChange = (evt) => {
  const effect = evt.target.value;
  if (effect === 'none') {
    imgPreview.style.filter = 'none'; // фильтр сбрасывается
    effectLevel.classList.add('hidden');
    effectSlider.setAttribute('disabled', true);
    effectSlider.noUiSlider.set(0); // устанавливается значение слайдера на 0
  } else {
    effectLevel.classList.remove('hidden');
    effectSlider.removeAttribute('disabled');
  }

  switch (effect) {
    case 'chrome':
    case 'sepia':
      effectSlider.noUiSlider.updateOptions({
        start: 0,
        step: 0.1,
        range: {
          min: 0,
          max: 1,
        },
      });
      break;
    case 'marvin':
      effectSlider.noUiSlider.updateOptions({
        start: 0,
        step: 1,
        range: {
          min: 0,
          max: 100,
        },
      });
      break;
    case 'phobos':
      effectSlider.noUiSlider.updateOptions({
        start: 0,
        step: 0.1,
        range: {
          min: 0,
          max: 3,
        },
      });
      break;
    case 'heat':
      effectSlider.noUiSlider.updateOptions({
        start: 1,
        step: 0.1,
        range: {
          min: 1,
          max: 3,
        },
      });
      break;
  }
};

// меняется эффект при изменении выбора
effectList.addEventListener('change', onEffectChange);

// применяется эффекта при изменении слайдера
effectSlider.noUiSlider.on('update', () => {
  const adjustedEffect = effectList.querySelector('input:checked').value;
  switch (adjustedEffect) {
    case 'chrome':
      imgPreview.style.filter = `grayscale(${effectSlider.noUiSlider.get()})`;
      break;
    case 'sepia':
      imgPreview.style.filter = `sepia(${effectSlider.noUiSlider.get()})`;
      break;
    case 'marvin':
      imgPreview.style.filter = `invert(${effectSlider.noUiSlider.get()}%)`;
      break;
    case 'phobos':
      imgPreview.style.filter = `blur(${effectSlider.noUiSlider.get()}px)`;
      break;
    case 'heat':
      imgPreview.style.filter = `brightness(${effectSlider.noUiSlider.get()})`;
      break;
  }
});

const resetImgFilter = () => {
  imgPreview.style.filter = 'none';
  effectSlider.noUiSlider.set(0);
  effectLevel.classList.add('hidden');
  effectSlider.setAttribute('disabled', true);
  effectNone.checked = true;
};

// photoEditorResetBth.addEventListener('click', resetImgFilter);
export { resetImgFilter };
