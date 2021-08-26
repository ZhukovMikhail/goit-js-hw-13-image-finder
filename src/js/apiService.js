// export default function fetchImage(searhcQuerry, pageNumber, perPageNumber) {
export default class FetchImage {
  constructor() {
    this.searhcQuery = '';
    this.pageNumber = 1;
    this.perPage = 12;
  }
  async fethArticles() {
    const USER_KEY = '22985243-b477986a48324befacd1d8a65';
    const url = `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${this.searhcQuery}&page=${this.pageNumber}&per_page=${this.perPage}&key=${USER_KEY}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      return data;
    } catch (error) {
      {
        throw error;
      }
    }
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
  nextPage() {
    this.pageNumber += 1;
  }
  resetPage() {
    this.perPage = 12;
    this.pageNumber = 1;
  }
}
