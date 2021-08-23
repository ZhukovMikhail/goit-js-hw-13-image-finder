import { notice, error } from '@pnotify/core';
export default class NoticeMessage {
  constructor() {}
  notice() {
    // refs.renderBox.innerHTML = '';
    notice({
      title: 'Attention',
      text: 'No results, try to specify your search.',
      width: '300px',
      minHeight: '15px',
      delay: 2000,
      addClass: 'error',
    });
  }
  error() {
    // refs.renderBox.innerHTML = '';
    error({
      title: 'Error',
      text: 'No matchs found!',
      width: '300px',
      minHeight: '15px',
      delay: 2000,
      addClass: 'error',
    });
  }
}
