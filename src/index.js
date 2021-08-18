import './sass/main.scss';
import fetchImage from './apiService';

import cardsListMarkup from './imageCardTmpl.hbs';
// import cardMarkup from './imageCardTmpl.hbs';

// fetchImage();
const refs = {
  input: document.querySelector('.input'),
  submitBtn: document.querySelector('.submit_btn'),
  downloadMoreBtn: document.querySelector('.download-more_btn'),
  renderBox: document.querySelector('.renderBpx'),
};
refs.submitBtn.addEventListener('submit', onSubmitBtn);
const searhcQuerry = input.value.trim();
let pageNumber = 0;

refs.downloadMoreBtn.addEventListener('submit', onDownloadMoreBtn);

function onSubmitBtn(e) {
  e.preventDefault();
  fetchImage(searhcQuerry, pageNumber).then(data => {
    refs.renderBox.innerHTML = cardsListMarkup(data);
  });
}

function onDownloadMoreBtn() {
  e.preventDefault();
  pageNumber += 1;
}
