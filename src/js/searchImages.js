import ImagesApiService from './apiService';
import imagesTmpl from '../templates/imagesTmpl.hbs';
import '../styles/styles.css';
import LoadMoreBtn from './loadMoreBtn';
import { info } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
import { onOpenModal } from './modal';
import getRefs from './getRefs';

const refs = getRefs();

const loadMoreBtn = new LoadMoreBtn({
  selector: '[data-action="load-more"]',
  hidden: true,
});

const imagesApiService = new ImagesApiService();

loadMoreBtn.enable();

refs.searchForm.addEventListener('submit', onSearch);
refs.imagesContainer.addEventListener('click', onOpenModal);
loadMoreBtn.refs.button.addEventListener('click', fetchImages);

function onSearch(e) {
  e.preventDefault();

  imagesApiService.query = e.currentTarget.elements.query.value;

  if (imagesApiService.query === '') {
    return onMatchesNotFound();
  }
  loadMoreBtn.show();
  imagesApiService.resetPage();
  clearImagesContainer();

  fetchImages();
}

function fetchImages() {
  loadMoreBtn.disable();
  imagesApiService.fetchImages().then(images => {
    appendImagesMarkup(images);
    loadMoreBtn.enable();
    window.scrollBy({
      top: 500,
      behavior: 'smooth',
    });
  });
}

function appendImagesMarkup(images) {
  refs.imagesContainer.insertAdjacentHTML('beforeend', imagesTmpl(images));
}

function clearImagesContainer() {
  refs.imagesContainer.innerHTML = '';
}

function onMatchesNotFound() {
  info({
    title: 'Matches no found',
    text: 'Please, try again',
    delay: 1500,
  });
}
