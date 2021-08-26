import refs from './refs';
import cardsListMarkup from '../templates/imageList.hbs';

const options = {
  rootMargin: '200px',
};
/**
 * Typical Observer's registration
 */
const callback = function (entries) {
  entries.forEach(async entry => {
    if (entry.isIntersecting && refs.fetchImage.fethArticles !== '') {
      console.log('загружаем скледущие картинки');
      console.log(entry);
      const data = await refs.fetchImage.fethArticles();
      refs.gallery.insertAdjacentHTML('beforeend', cardsListMarkup(data.hits));
      refs.fetchImage.nextPage();
    }
  });
};
let observer = new IntersectionObserver(callback, options);

// Now we should tell our Observer what to observe

export default function infinityScroll() {
  observer.observe(refs.divForScrollFetch);
}
