import * as basicLightbox from 'basiclightbox';
//================== Show Modal Image Function ===============
export default function onImageClick(e) {
  const dataSrc = e.target.dataset.src;

  if (e.target.nodeName !== 'IMG') {
    return;
  }
  const instance = basicLightbox.create(`<img src="${dataSrc}" width="800" height="600">`);
  instance.show();
}
//========================================================
