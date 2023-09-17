import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import { galleryItems } from './gallery-items.js';

const list = document.querySelector('.gallery');
let lightbox;

list.insertAdjacentHTML("beforeend", createMarkup(galleryItems));
list.addEventListener('click', handleClick);

function createMarkup(arr) {
    return arr.map(({ preview, original, description }) =>
        `<a class="gallery__item" href="${original}">
            <img src="${preview}" alt="${description}" />
        </a>`).join('');
}

function handleClick(event) {
    event.preventDefault();

    if (!event.target.classList.contains('gallery__item')) {
        return;
    }

    if (lightbox) {
        lightbox.destroy();
    }

    const largeImg = event.target.querySelector('img').dataset.source;
    const description = event.target.querySelector('img').alt;

    lightbox = new SimpleLightbox(`<img src="${largeImg}" alt="${description}">`, {
        captionsData: "alt",
        captionPosition: "bottom",
    });

    lightbox.show();

    window.addEventListener('keyup', closeModal);
}

function closeModal(event) {
    if (event.key === "Escape" && lightbox) {
        lightbox.close();
        window.removeEventListener('keyup', closeModal);
    }