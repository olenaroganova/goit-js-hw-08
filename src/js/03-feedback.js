// Підключаємо бібліотеку lodash.throttle
import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const emailInput = form.querySelector('input[name="email"]');
const messageInput = form.querySelector('textarea[name="message"]');
const feedbackKey = 'feedback-form-state';

// Функція для збереження даних в локальному сховищі
function saveDataToLocalStorage() {
  const formData = {
    email: emailInput.value,
    message: messageInput.value,
  };

  localStorage.setItem(feedbackKey, JSON.stringify(formData));
}

// Функція для заповнення полів форми зі збереженими даними
function populateFormFields() {
  const savedData = localStorage.getItem(feedbackKey);

  if (savedData) {
    const formData = JSON.parse(savedData);
    emailInput.value = formData.email;
    messageInput.value = formData.message;
  }
}

// Функція для виводу даних у консоль та очищення сховища та поля форми
function handleSubmit(event) {
  event.preventDefault();

  const formData = {
    email: emailInput.value,
    message: messageInput.value,
  };

  console.log(formData);

  localStorage.removeItem(feedbackKey);
  emailInput.value = '';
  messageInput.value = '';
}

// Використовуємо lodash.throttle для оновлення сховища не частіше, ніж раз на 500 мілісекунд
const throttledSaveDataToLocalStorage = throttle(saveDataToLocalStorage, 500);

// Додаємо обробники подій
form.addEventListener('input', throttledSaveDataToLocalStorage);
form.addEventListener('submit', handleSubmit);

// Заповнюємо поля форми при завантаженні сторінки
populateFormFields();
