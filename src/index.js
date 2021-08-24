import './sass/main.scss';
import cardsListMarkup from './templates/imageList.hbs';
import refs from './js/refs';
import onImgClickShowBigImg from './js/onImageClick';
//==================== event Listeners ===================
refs.renderBox.addEventListener('click', onImgClickShowBigImg);
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
