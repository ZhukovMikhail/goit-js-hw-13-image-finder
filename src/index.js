import './sass/main.scss';
import fetchImageApi from './apiService';
import cardsListMarkup from './imageList.hbs';
const fetchImage = new fetchImageApi();
// import cardMarkup from './imageCardTmpl.hbs';
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
import * as basicLightbox from 'basiclightbox';

const instance = basicLightbox.create(
  `
    <div class="modal">
        <p>
            Your first lightbox with just a few lines of code.
            Yes, it's really that simple.
        </p>
    </div>
`,
);
// refs.renderBox.addEventListener('click', onRenderClick);
// functiononRenderClick
instance.show();
