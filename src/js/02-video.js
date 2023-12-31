import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const videoCurrentTime = 'videoplayer-current-time';

// Отримайте посилання на елемент <iframe> та створіть плеєр
const iframe = document.getElementById('vimeo-player');
const player = new Player(iframe);

// Отримайте останній збережений час відтворення або встановіть його за замовчуванням
let currentTime = localStorage.getItem(videoCurrentTime) || 0;

// Функція для збереження часу в локальному сховищі зі затримкою
const saveTimeToLocalStorage = throttle((time) => {
    localStorage.setItem(videoCurrentTime, time);
}, 1000); // Оновлюйте локальне сховище не частіше, ніж раз на секунду

// Встановіть збережений час відтворення
player.setCurrentTime(currentTime);

// Відстежуйте подію timeupdate та зберігайте час
player.on('timeupdate', (data) => {
    currentTime = data.seconds;
    saveTimeToLocalStorage(currentTime);
});