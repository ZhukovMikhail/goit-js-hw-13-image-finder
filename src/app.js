//=============== Function Open Modal ====================================
export function openModalHandler(event) {
  event.preventDefault();
  if (event.target.nodeName !== 'IMG') {
    return;
  }
  modal.classList.add('is-open');

  modalImage.src = event.target.parentNode.href;
  modalImage.alt = event.target.alt;

  modalClose.addEventListener('click', closeModalHandler);
  window.addEventListener('click', altModalCloseHandler);

  window.addEventListener('keydown', leftKeyHandler);
  window.addEventListener('keydown', rightKeyHandler);
  window.addEventListener('keydown', escapeHanler);
}

//=============== Function Close Modal ====================================
export function closeModalHandler() {
  modal.classList.remove('is-open');
  modalImage.src = '';
  modalImage.alt = '';

  modalClose.removeEventListener('click', closeModalHandler);
  window.removeEventListener('click', altModalCloseHandler);

  window.removeEventListener('keydown', leftKeyHandler);
  window.removeEventListener('keydown', rightKeyHandler);
  window.removeEventListener('keydown', escapeHanler);
}
//--------------Alternative close Modal by clicking out of image-------------------------------
export function altModalCloseHandler(event) {
  if (event.target.nodeName === 'IMG') {
    return;
  }
  closeModalHandler();
}
//--------------Alternative close Modal by Escape button----------------------------
export function escapeHanler(evt) {
  if (evt.code !== 'Escape') {
    return;
  }
  closeModalHandler();
}

//=============== Function Left key ====================================
export function leftKeyHandler(evt) {
  let currentImageIndex = originalSrcArray.indexOf(modalImage.src);
  if (!modal.classList.contains('is-open')) {
    return;
  }
  if (evt.code !== 'ArrowLeft') {
    return;
  }
  if (currentImageIndex === 0) {
    return (modalImage.src = originalSrcArray[originalSrcArray.length - 1]);
  }
  modalImage.src = originalSrcArray[currentImageIndex - 1];
}
//=============== Function Right key ====================================
export function rightKeyHandler(evt) {
  let currentImageIndex = originalSrcArray.indexOf(modalImage.src);
  if (!modal.classList.contains('is-open')) {
    return;
  }
  if (evt.code !== 'ArrowRight') {
    return;
  }
  if (currentImageIndex === originalSrcArray.length - 1) {
    return (modalImage.src = originalSrcArray[0]);
  }
  modalImage.src = originalSrcArray[currentImageIndex + 1];
}
//------------------------------------------------------------------------

//================ пример функции от ментотра ====================
// function keyboardManipulation({ key }) {
//   switch (key) {
//     case gallery.length - 1 > activeIndex && 'ArrowRight':
//       activeIndex += 1;
//       refs.modalImg.src = gallery[activeIndex].original;
//       break;
//     case activeIndex > 0 && 'ArrowLeft':
//       activeIndex -= 1;
//       refs.modalImg.src = gallery[activeIndex].original;
//       break;
//     case activeIndex === gallery.length - 1 && 'ArrowRight':
//       activeIndex = 0;
//       refs.modalImg.src = gallery[activeIndex].original;
//       break;
//     case activeIndex === 0 && 'ArrowLeft':
//       activeIndex = gallery.length - 1;
//       refs.modalImg.src = gallery[activeIndex].original;
//       break;
//     case 'Escape':
//       closeModal();
//       break;
//     default:
//       alert('что-то пошло не так');
//   }
// }
