import { isEscapeKey } from './util';

const uploadForm = document.querySelector('.img-upload__form');
const pageBody = document.querySelector('body');

const uploadFileControl = uploadForm.querySelector('#upload-file');
const photoEditorOverlay = uploadForm.querySelector('.img-upload__overlay');
const photoEditorResetBth = photoEditorOverlay.querySelector('#upload-cancel');

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
}

const initUploadModal = () => {
  uploadFileControl.addEventListener('change', () => {
    photoEditorOverlay.classList.remove('hidden');
    pageBody.classList.add('modal-open');
    photoEditorResetBth.addEventListener('click', onPhotoEditorResetBtnClick);
    document.addEventListener('keydown', onDocumentKeydown);
  });
};

// const onHashtagInput = () => { isHashtagValid(inputHashtag.value); };

// const onFormSubmit = (evt) => {

// }

export { uploadForm, initUploadModal };
