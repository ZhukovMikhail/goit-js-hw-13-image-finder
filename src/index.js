import './sass/main.scss';
import * as basicLightbox from 'basiclightbox';
import fetchImageApi from './apiService';
import cardsListMarkup from './imageList.hbs';
// import cardMarkup from './imageCardTmpl.hbs';
// import openModalHandler from './app';
// import closeModalHandler from './app';
// import altModalCloseHandler from './app';
// import escapeHanler from './app';
// import leftKeyHandler from './app';
// import rightKeyHandler from './app';

const fetchImage = new fetchImageApi();
const refs = {
  searchForm: document.getElementById('search-form'),
  submitBtn: document.querySelector('.submit_btn'),
  downloadMoreBtn: document.querySelector('.download-more_btn'),
  renderBox: document.querySelector('.renderBox'),
  gallery: document.querySelector('.gallery'),
};
refs.searchForm.addEventListener('submit', onSubmitBtn);
refs.downloadMoreBtn.addEventListener('click', onDownloadMoreBtn);
async function onSubmitBtn(e) {
  e.preventDefault();
  fetchImage.query = e.currentTarget.elements.query.value.trim();
  fetchImage.resetPage();
  const data = await fetchImage.fethArticles();
  refs.gallery.innerHTML = cardsListMarkup(data.hits);
  //   .then(data => {
  //
  // });
}
async function onDownloadMoreBtn(e) {
  e.preventDefault();

  const data = await fetchImage.fethArticles();
  refs.gallery.insertAdjacentHTML('beforeend', cardsListMarkup(data.hits));
  fetchImage.nextPage();

  refs.gallery.scrollIntoView({
    behavior: 'smooth',
    block: 'end',
  });
}

// refs.renderBox.addEventListener('click', onRenderBoxClick);

// const instance = basicLightbox.create(cardMarkup(data.hits));

// instance.show();
