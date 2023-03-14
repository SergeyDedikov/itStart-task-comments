// наша форма
const form = document.getElementById('new-comment');

// поля ввода
const name = form.name;
const text = form.text;
const date = form.date;

// валидация формы
form.name.onblur = showErrors;
form.text.onblur = showErrors;
form.name.onfocus = hideErrors;
form.text.onfocus = hideErrors;

function showErrors() {
  
  switch (this.name) {
    case 'name':
      if (!this.value.includes('@')) { // нет знака email
        this.classList.add('invalid');
        this.nextElementSibling.textContent = 'Имя должно содержать знак @';
      }
      if (this.value === '') {
        this.classList.add('invalid');
        this.nextElementSibling.textContent = 'Имя должно быть указано';
      }
      break;

    case 'text':
      if (this.value === '') {
        this.classList.add('invalid');
        this.nextElementSibling.textContent = 'Сообщение должно быть заполнено';
      }
      break;
  }

}

function hideErrors() {
  if (this.classList.contains('invalid')) {
    this.classList.remove('invalid');
    this.nextElementSibling.textContent = '';
  }
}

form.onsubmit = function (e) {
  console.log('Submit!');
  return false;
}

