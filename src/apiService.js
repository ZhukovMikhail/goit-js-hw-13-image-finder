// export default function fetchImage(searhcQuerry, pageNumber, perPageNumber) {
export default function fetchImage(searhcQuerry) {
  const USER_KEY = '22985243-b477986a48324befacd1d8a65';
  //   const pageNumber = null;
  //   const perPageNumber = 12;
  const url = `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${searhcQuerry}&page=1per_page=12&key=${USER_KEY}`;
  return fetch(url)
    .then(response => response.json())
    .catch(error => console.log(error));
}
