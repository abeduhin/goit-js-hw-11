import { fetchImages } from '../js/fetchImages';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

// Підключаємо HTTP-клієнта axios
// Для бекенду (HTTP -запити) робимо окремий файл fetchImages.js
// Підключаємо бібліотеки notiflix для повідомлень, simplelightbox для великих зображень. 

const input = document.querySelector('.search-form-input');
const btnSearch = document.querySelector('.search-form-button');
const gallery = document.querySelector('.gallery');
const btnLoadMore = document.querySelector('.load-more');

// Звертаємось до необхідних елемннтів HTML, які прописуємо в окремому файлі imageSearchApp.html
let gallerySimpleLightbox = new SimpleLightbox('.gallery a');
// Присвюємо зображення з бібліотекі simplelightbox

// const { height: cardHeight } = document
//   .querySelector('.gallery')
//   .firstElementChild.getBoundingClientRect();

// window.scrollBy({
//   top: cardHeight * 2,

//   behavior: 'smooth',
// });

btnLoadMore.style.display = 'none';
// Приховуємо кнопку load-more (завантажити ще)

let pageNumber = 1;

// Встановлюємо початкове значення параметра pageNumber (ідентифікатор)

btnSearch.addEventListener('click', e => {
  e.preventDefault();
  cleanGallery();
  const trimmedValue = input.value.trim();
  if (trimmedValue !== '') {
    fetchImages(trimmedValue, pageNumber).then(foundData => {
      if (foundData.hits.length === 0) {
        Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      } else {
        renderImageList(foundData.hits);
        Notiflix.Notify.success(
          `Hooray! We found ${foundData.totalHits} images.`
        );
        btnLoadMore.style.display = 'block';
        gallerySimpleLightbox.refresh();
      }
    });
  }
});
// Вішаємо случая події клік на кнопку btnSearch, скасовуємо дефолтну повєдінку, запускаємо функцію очистки, убираємо пробіли в запиті користувача, якщо запит не пуста строка, то формується HTTP запит, якщо відповідь успішна. але нічгого не знайдено, з'являється повідомлення Вибачте, немає зображень, які відповідають вашому пошуковому запиту. Будь ласка спробуйте ще раз, інша відповідь не пуста, то підключається розмітка HTML з'являється повідомлення Ура! Ми знайшли ${foundData.totalHits} зображень.Кнопка btnLoadMore активується та підключається бібліотека SimpleLightbox.

btnLoadMore.addEventListener('click', () => {
  pageNumber++;
  const trimmedValue = input.value.trim();
  btnLoadMore.style.display = 'none';
  fetchImages(trimmedValue, pageNumber).then(foundData => {
    if (foundData.hits.length === 0) {
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    } else {
      renderImageList(foundData.hits);
      Notiflix.Notify.success(
        `Hooray! We found ${foundData.totalHits} images.`
      );
      btnLoadMore.style.display = 'block';
    }
  });
});
// Вішаємо случая події клік на кнопку btnLoadMore, збільшуємо індифікатор на 1, убираємо пробіли в запиті користувача, прибироємо кнопку btnLoadMore, якщо запит не пуста строка, то формується HTTP запит, якщо відповідь успішна. але нічгого не знайдено, з'являється повідомлення Вибачте, немає зображень, які відповідають вашому пошуковому запиту. Будь ласка спробуйте ще раз, інша відповідь не пуста, то підключається розмітка HTML з'являється повідомлення Ура! Ми знайшли ${foundData.totalHits} зображень.Кнопка btnLoadMore активується.


function renderImageList(images) {
  console.log(images, 'images');
  const markup = images
    .map(image => {
      console.log('img', image);
      return `<div class="photo-card">
       <a href="${image.largeImageURL}"><img class="photo" src="${image.webformatURL}" alt="${image.tags}" title="${image.tags}" loading="lazy"/></a>
        <div class="info">
           <p class="info-item">
               <b>Likes</b> <span class="info-item-api"> ${image.likes} </span>
           </p>
            <p class="info-item">
                <b>Views</b> <span class="info-item-api">${image.views}</span>  
            </p>
            <p class="info-item">
                <b>Comments</b> <span class="info-item-api">${image.comments}</span>  
            </p>
            <p class="info-item">
                <b>Downloads</b> <span class="info-item-api">${image.downloads}</span> 
            </p>
        </div>
    </div>`;
    })
    .join('');
  gallery.innerHTML += markup;
}
// Добавляємо в розмітку HTML згідно шаблону розмітки картки одного зображення для галереї.

function cleanGallery() {
  gallery.innerHTML = '';
  pageNumber = 1;
  btnLoadMore.style.display = 'none';
}
// Функція очистки, яка убирає розмітку HTML для зображень, вертає идентифікатор на 1, та ховає кнопку load-more.