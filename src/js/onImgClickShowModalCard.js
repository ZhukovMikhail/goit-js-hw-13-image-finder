import * as basicLightbox from 'basiclightbox';
import imageCard from '../templates/imageCard.hbs';
//================== Show Modal Image Function ===============
export default function onImageClick(e) {
  const dataSrc = e.target.dataset.src;
  console.dir(e.target);
  console.dir(e.target.nextElementSibling.lastElementChild.textContent);

  if (e.target.nodeName !== 'IMG') {
    return;
  }
  const instance = basicLightbox.create(`
  <div class='modal-image'>
    <img src=${dataSrc} width="800" height="600" />

    <div class='stats'>
      <p class='stats-item text-modal'>
        <i class='material-icons'>thumb_up</i>
        ${Number.parseInt(e.target.nextElementSibling.firstElementChild.textContent.match(/\d+/))} 
      </p>
      <p class='stats-item text-modal'>
        <i class='material-icons'>visibility</i>
        ${Number.parseInt(
          e.target.nextElementSibling.firstElementChild.nextElementSibling.textContent.match(/\d+/),
        )}
      </p>
      <p class='stats-item text-modal'>
        <i class='material-icons'>comment</i>
        ${Number.parseInt(
          e.target.nextElementSibling.lastElementChild.previousElementSibling.textContent.match(
            /\d+/,
          ),
        )}
      </p>
      <p class='stats-item text-modal'>
        <i class='material-icons'>cloud_download</i>
        ${Number.parseInt(e.target.nextElementSibling.lastElementChild.textContent.match(/\d+/))}
      </p>
    </div>
  </div>
    `);
  instance.show();
}
//========================================================
