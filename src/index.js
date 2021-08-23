import './sass/main.scss';
import * as basicLightbox from 'basiclightbox';
import fetchImageApi from './apiService';
import cardsListMarkup from './imageList.hbs';

import { notice, error, Stack } from '@pnotify/core';
import LoadMoreBtn from './loadMoreBtn';

const fetchImage = new fetchImageApi();
const refs = {
  searchForm: document.getElementById('search-form'),
  submitBtn: document.querySelector('.submit_btn'),
  // loadMoreBtn: document.querySelector('.download-more_btn'),
  renderBox: document.querySelector('.renderBox'),
  gallery: document.querySelector('.gallery'),
};
const loadMoreBtn = new LoadMoreBtn({
  selector: '[data-action="load-more"]',
  hidden: true,
});

// console.log(loadMoreBtn);
refs.searchForm.addEventListener('submit', onSubmitBtn);
loadMoreBtn.refs.button.addEventListener('click', onLoadMoreBtn);

loadMoreBtn.hide();
// loadMoreBtn.show();
// loadMoreBtn.disable();
// loadMoreBtn.enable();

async function onSubmitBtn(e) {
  e.preventDefault();

  loadMoreBtn.show();
  loadMoreBtn.disable();
  loadMoreBtn.loading();

  fetchImage.query = e.currentTarget.elements.query.value.trim();

  if (fetchImage.query === '' || fetchImage.query === null) {
    noticeMessage();
    loadMoreBtn.disable();
    loadMoreBtn.loaded();
    return;
  }

  fetchImage.resetPage();
  const data = await fetchImage.fethArticles();
  console.log(data);
  setTimeout(() => {
    loadMoreBtn.enable();
  }, 100);

  if (data.status === 404) {
    errorMessage();
    loadMoreBtn.disable();
    loadMoreBtn.loaded();
  }
  if (data.hits.length === 0) {
    errorMessage();
    setTimeout(() => {
      loadMoreBtn.disable();
      loadMoreBtn.loaded();
    }, 110);
    fetchImage.resetPage();
    return;
  }

  refs.gallery.innerHTML = cardsListMarkup(data.hits);
  // loadMoreBtn.enable();
}

async function onLoadMoreBtn(e) {
  e.preventDefault();
  // loadMoreBtn.disable();
  if (fetchImage.query === '' || fetchImage.query === null) {
    noticeMessage();
    fetchImage.resetPage();
    return;
  }

  const data = await fetchImage.fethArticles();
  refs.gallery.insertAdjacentHTML('beforeend', cardsListMarkup(data.hits));
  fetchImage.nextPage();

  refs.gallery.scrollIntoView({
    behavior: 'smooth',
    block: 'end',
  });
  // loadMoreBtn.enable();
}

refs.renderBox.addEventListener('click', onRenderBoxClick);

function onRenderBoxClick(e) {
  const dataSrc = e.target.dataset.src;

  if (e.target.nodeName !== 'IMG') {
    return;
  }
  const instance = basicLightbox.create(`
        <img src="${dataSrc}" width="800" height="600">
    `);

  instance.show();
}

function noticeMessage() {
  // refs.renderBox.innerHTML = '';
  notice({
    title: 'Attention',
    text: 'No results, try to specify your search.',
    width: '300px',
    minHeight: '15px',
    delay: 2000,
    addClass: 'error',
  });
}
function errorMessage() {
  // refs.renderBox.innerHTML = '';
  error({
    title: 'Error',
    text: 'No matchs found!',
    width: '300px',
    minHeight: '15px',
    delay: 2000,
    addClass: 'error',
  });
}
