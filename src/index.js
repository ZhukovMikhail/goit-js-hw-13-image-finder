import './sass/main.scss';
import * as basicLightbox from 'basiclightbox';
import cardsListMarkup from './templates/imageList.hbs';
import refs from './js/refs';
//==================== event Listeners ===================
refs.renderBox.addEventListener('click', onImageClick);
refs.searchForm.addEventListener('submit', onSubmitBtn);
refs.loadMoreBtn.refs.button.addEventListener('click', onLoadMoreBtn);
//========================================================

refs.loadMoreBtn.hide();
//================== Submit Button Function ===============
async function onSubmitBtn(e) {
  e.preventDefault();
  refs.loadMoreBtn.show();
  refs.loadMoreBtn.disable();
  refs.loadMoreBtn.loading();

  refs.fetchImage.query = e.currentTarget.elements.query.value.trim();

  if (refs.fetchImage.query === '' || refs.fetchImage.query === null) {
    refs.noticeMessage.notice();
    refs.loadMoreBtn.disable();
    refs.loadMoreBtn.loaded();
    return;
  }
  refs.fetchImage.resetPage();
  const data = await refs.fetchImage.fethArticles();
  console.log(data);
  setTimeout(() => {
    refs.loadMoreBtn.enable();
  }, 100);

  if (data.hits.length === 0) {
    refs.noticeMessage.error();
    setTimeout(() => {
      refs.loadMoreBtn.disable();
      refs.loadMoreBtn.loaded();
    }, 110);
    fetchImage.resetPage();
    return;
  }
  refs.gallery.innerHTML = cardsListMarkup(data.hits);
}
//========================================================
//================== load More Button Function ===============
async function onLoadMoreBtn(e) {
  e.preventDefault();
  if (refs.fetchImage.query === '' || refs.fetchImage.query === null) {
    refs.noticeMessage.notice();
    return;
  }
  const data = await refs.fetchImage.fethArticles();
  refs.gallery.insertAdjacentHTML('beforeend', cardsListMarkup(data.hits));
  refs.fetchImage.nextPage();

  refs.gallery.scrollIntoView({
    behavior: 'smooth',
    block: 'end',
  });
}
//========================================================
//================== Show Modal Image Function ===============
function onImageClick(e) {
  const dataSrc = e.target.dataset.src;

  if (e.target.nodeName !== 'IMG') {
    return;
  }
  const instance = basicLightbox.create(`<img src="${dataSrc}" width="800" height="600">`);
  instance.show();
}
//========================================================
