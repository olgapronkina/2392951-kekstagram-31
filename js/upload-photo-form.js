import { isEscapeKey } from './util';
import { error, isHashtagValid } from './form-validation';

const uploadForm = document.querySelector('.img-upload__form');
const pageBody = document.querySelector('body');

const uploadFileControl = uploadForm.querySelector('#upload-file');
const photoEditorForm = uploadForm.querySelector('.img-upload__overlay');
const photoEditorResetBth = photoEditorForm.querySelector('#upload-cancel');
const hashtagsInput = photoEditorForm.querySelector('.text__hashtags');

const onPhotoEditorResetBtnClick = (evt) => {
  evt.preventDefault();
  closePhotoEditor();
};

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closePhotoEditor();
  }
};

function closePhotoEditor() {
  photoEditorForm.classList.add('hidden');
  pageBody.classList.remove('modal-open');
  document.removeEventListener('click', onPhotoEditorResetBtnClick);
  uploadFileControl.value = '';
}

export const initUploadModal = () => {
  uploadFileControl.addEventListener('change', () => {
    photoEditorForm.classList.remove('hidden');
    pageBody.classList.add('modal-open');
    photoEditorResetBth.addEventListener('click', onPhotoEditorResetBtnClick);
    document.addEventListener('keydown', onDocumentKeydown);
  });
};

const pristine = new Pristine(photoEditorForm, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--invalid',
  successClass: 'img-upload__field-wrapper--valid',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'img-upload__field-wrapper--error',
});

// const onHashtagInput = () => {
//   isHashtagValid(hashtagsInput.value);
// };

pristine.addValidator(hashtagsInput, isHashtagValid, () => error, 2, false);

// hashtagsInput.addEventListener('input', onHashtagInput);
