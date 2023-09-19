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

lightbox = new SimpleLightbox(`<img src="${largeImg}" alt="${description}">`, {
        captionsData: "alt",
        captionPosition: "bottom",
});

