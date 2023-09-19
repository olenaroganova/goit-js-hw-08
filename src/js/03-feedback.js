import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const feedbackKey = 'feedback-form-state';

let formData = {};

function saveDataToLocalStorage(e) {
  formData[e.target.name] = e.target.value.trim();
  localStorage.setItem(feedbackKey, JSON.stringify(formData));
}

function populateFormFields() {
  try {
    const savedData = localStorage.getItem(KEY);
    if (!savedData) return;
    formData = JSON.parse(savedData);
    Object.entries(formData).forEach(([key, val]) => {
      form.elements[key].value = val;
    });
  } catch ({ message }) {
    console.log(message);
  }

}

function handleSubmit(e) {
  e.preventDefault();
  console.log(formData);
  formData = {};
  localStorage.removeItem(feedbackKey);
  e.target.reset();
}

const throttledSaveDataToLocalStorage = throttle(saveDataToLocalStorage, 500);

form.addEventListener('input', throttledSaveDataToLocalStorage);
form.addEventListener('submit', handleSubmit);

populateFormFields();
