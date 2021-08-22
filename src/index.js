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

function onSubmitBtn(e) {
  e.preventDefault();
  fetchImage.query = e.currentTarget.elements.query.value;
  fetchImage.perPage = 12;
  this.pageNumber = 1;
  // console.log(searhcQuery);
  fetchImage.fethArticles().then(data => {
    refs.gallery.innerHTML = cardsListMarkup(data.hits);
  });
}
function onDownloadMoreBtn(e) {
  e.preventDefault();

  fetchImage.page();
  fetchImage.fethArticles().then(data => {
    refs.gallery.insertAdjacentHTML('beforeend', cardsListMarkup(data.hits));
  });
  refs.gallery.scrollIntoView({
    behavior: 'smooth',
    block: 'end',
  });
}

// refs.renderBox.addEventListener('click', onRenderBoxClick);

const instance = basicLightbox.create(
  `
  <div class="modal">
  <H1>Привет</H1>
  </div>
  `,
);

instance.show();
