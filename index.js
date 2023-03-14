// наша форма
const form = document.getElementById('new-comment');
const comments = document.getElementById('comments');

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

  let inputData = {
    name: form.name.value,
    text: form.text.value,
    date: form.date.value,
  };

  comments.prepend(createComment(inputData));

  return false;
}

function createComment(data) {
  let comment = document.createElement('div');
  comment.className = 'comment';

  comment.insertAdjacentHTML('afterbegin', `<div class="comment__header">
          <div class="comment__author">
            ${data.name}
          </div>
          <div class="comment__date">
            ${data.date}
          </div>
          <div class="comment__action">
            <input class="comment__btn comment__btn_type_like" type="button">
            <input class="comment__btn comment__btn_type_remove" type="button">
          </div>
        </div>
        <div class="comment__text">
          <p>${data.text}</p>
        </div>`);

  return comment;
}

function deleteComment(e) {
  // цель -- кнопка
  let target = e.target;

  // содержит ли цель нужный класс (кнопка ли нажата и та ли вообще)
  if (!target.classList.contains('comment__btn_type_remove')) return;

  // удаляем родителя кнопки
  target.closest('.comment').remove();
}

function toggleLike(e) {
  let target = e.target;
  if (!target.classList.contains('comment__btn_type_like')) return;
  // добавляем/убираем класс
  target.classList.toggle('liked');
}

comments.addEventListener('click', deleteComment);
comments.addEventListener('click', toggleLike);

