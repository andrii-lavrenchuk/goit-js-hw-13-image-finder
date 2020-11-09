import ImagesApiService from './js/apiService';
import imagesTmpl from './templates/imagesTmpl.hbs';
import './styles/styles.css';
import LoadMoreBtn from './js/loadMoreBtn';

const refs = {
  searchForm: document.querySelector('.search-form'),
  imagesContainer: document.querySelector('.gallery'),
  //   loadMoreBtn: document.querySelector('[data-action="load-more"]'),
};

const loadMoreBtn = new LoadMoreBtn({
  selector: '[data-action="load-more"]',
  hidden: true,
});

const imagesApiService = new ImagesApiService();
// console.log(loadMoreBtn);

loadMoreBtn.enable();

refs.searchForm.addEventListener('submit', onSearch);
loadMoreBtn.refs.button.addEventListener('click', fetchImages);

function onSearch(e) {
  e.preventDefault();

  imagesApiService.query = e.currentTarget.elements.query.value;

  if (imagesApiService.query === '') {
    return alert('hkjhkjh');
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
  });
}

function appendImagesMarkup(images) {
  refs.imagesContainer.insertAdjacentHTML('beforeend', imagesTmpl(images));
}

function clearImagesContainer() {
  refs.imagesContainer.innerHTML = '';
}
