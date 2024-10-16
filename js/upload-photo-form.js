import { isEscapeKey } from './util';
import { resetImgFilter } from './effects-slider';
import { resetImgSize } from './customazing-size-photo';

const uploadForm = document.querySelector('.img-upload__form');
const pageBody = document.querySelector('body');

const uploadFileControl = uploadForm.querySelector('#upload-file');
const photoEditorOverlay = uploadForm.querySelector('.img-upload__overlay');
const photoEditorResetBth = photoEditorOverlay.querySelector('#upload-cancel');

const hashtagsInput = document.querySelector('.text__hashtags');
const commentInput = document.querySelector('.text__description');

const onPhotoEditorResetBtnClick = (evt) => {
  evt.preventDefault();
  closePhotoEditor();
};

const onDocumentKeydown = (evt) => {
  if (
    isEscapeKey(evt) &&
    !evt.target.classList.contains('text__description') &&
    !evt.target.classList.contains('text__hashtags')
  ) {
    evt.preventDefault();
    closePhotoEditor();
  }
};

function closePhotoEditor() {
  photoEditorOverlay.classList.add('hidden');
  pageBody.classList.remove('modal-open');
  document.removeEventListener('click', onPhotoEditorResetBtnClick);
  uploadFileControl.value = '';
  hashtagsInput.value = '';
  commentInput.value = '';
  resetImgSize();
  resetImgFilter();
}

const initUploadModal = () => {
  uploadFileControl.addEventListener('change', () => {
    photoEditorOverlay.classList.remove('hidden');
    pageBody.classList.add('modal-open');
    photoEditorResetBth.addEventListener('click', onPhotoEditorResetBtnClick);
    document.addEventListener('keydown', onDocumentKeydown);
  });
};

export {
  uploadForm,
  initUploadModal,
  photoEditorOverlay,
  onPhotoEditorResetBtnClick,
  closePhotoEditor,
};
