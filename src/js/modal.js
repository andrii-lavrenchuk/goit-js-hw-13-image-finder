import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';

function onOpenModal(e) {
  if (e.target.nodeName !== 'IMG') {
    return;
  }
  console.log(e.target);

  const instance = basicLightbox.create(`
    <img src="${e.target.dataset.source}" alt="${e.target.alt}" />
`);

  instance.show();
}
export { onOpenModal };
