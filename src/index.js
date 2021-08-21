import './sass/main.scss';
import fetchImage from './apiService';

import cardsListMarkup from './imageList.hbs';

// import cardMarkup from './imageCardTmpl.hbs';

const refs = {
  input: document.querySelector('.input'),
  submitBtn: document.querySelector('.submit_btn'),
  downloadMoreBtn: document.querySelector('.download-more_btn'),
  renderBox: document.querySelector('.renderBox'),
};
refs.submitBtn.addEventListener('click', onSubmitBtn);

// console.log();

// let pageNumber = 0;

refs.downloadMoreBtn.addEventListener('click', onDownloadMoreBtn);

function onSubmitBtn(e) {
  // console.log(refs.input.value);
  e.preventDefault();
  const searhcQuerry = refs.input.value;
  console.log(searhcQuerry);

  fetchImage(searhcQuerry).then(data => {
    refs.renderBox.innerHTML = cardsListMarkup(data.hits);
    console.log(data.hits);
  });
}
function onDownloadMoreBtn() {
  e.preventDefault();
  pageNumber += 1;
}
