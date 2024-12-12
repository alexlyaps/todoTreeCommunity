'use strict';

// Функция для добавления новой формы
const makeField_old = function() {
    const section = document.querySelector('.forms-container');
    section.innerHTML += `        <div class="project-container">
            <h2 class="project-header"> ${formHeader} </h2>
            <p class="project-content">${formContent} </p>
        </div>`;
    attachEventListeners();
};

// TODO1. Не добавляем новую форму, а добавляем новый БЛОК с описанием проекта

function makeField(formElement) {
        const formHeader = formElement.get('title');
        const formContent = formElement.get('project');
        const section = document.querySelector('.forms-container');
        section.innerHTML += `        <div class="project-container">
            <h2 class="project-header"> ${formHeader} </h2>
            <p class="project-content">${formContent} </p>
        </div>`;
        
};

// Функция для привязки событий к кнопкам
const attachEventListeners = function() {
    const buttons = document.querySelectorAll('.add-form-btn');
    buttons.forEach(button => {
        button.removeEventListener('click', handleButtonClick); // Убираем дубли
        button.addEventListener('click', handleButtonClick);
    });
};

// Обработчик события при нажатии на "Publish"
const handleButtonClick = function(event) {
    event.preventDefault(); // Блокируем стандартное поведение для обработки
    const form = event.target.closest('form');
    const formData = new FormData(form);

    // Отправляем форму
    fetch('/submit', {
        method: 'POST',
        body: formData
    })
    .then(response => {
        if (response.ok) {
            console.log('Form submitted successfully');
        } else {
            console.error('Form submission failed');
        }
    })
    .catch(error => console.error('Error:', error))
    .finally(() => {
        makeField(formData);
        attachEventListeners();
    }); // Добавляем новую форму после отправки ИЛИ НЕОТПРАВКИ
    
};

// Привязываем события после загрузки страницы
attachEventListeners();