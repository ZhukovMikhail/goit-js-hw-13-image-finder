// export default function fetchImage(searhcQuerry, pageNumber, perPageNumber) {
export default class fetchImage {
  constructor() {
    this.searhcQuery = '';
    this.pageNumber = 1;
    this.perPage = 12;
  }
  fethArticles() {
    const USER_KEY = '22985243-b477986a48324befacd1d8a65';
    const url = `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${this.searhcQuery}&page=${this.pageNumber}&per_page=${this.perPage}&key=${USER_KEY}`;
    return fetch(url)
      .then(response => response.json())
      .catch(error => console.log(error));
  }
  get query() {
    return this.searhcQuery;
  }
  set query(newQuery) {
    this.searhcQuery = newQuery;
  }
  pageLim() {
    this.perPage += 12;
  }
  page() {
    this.pageNumber += 1;
  }
}
