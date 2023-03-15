// наша форма
const form = document.getElementById('new-comment');
const comments = document.getElementById('comments');

function showErrors() {
  // если поля пустые
  if (this.value === '') {
    switch (this.name) {
      case 'name':
        setMessage(this, 'Имя должно быть указано');
        break;

      case 'text':
        setMessage(this, 'Сообщение должно быть заполнено');
        break;
    }
  }
}

function setMessage(elem, message) {
  elem.classList.add('invalid');
  elem.nextElementSibling.textContent = message;
}

function hideErrors() {
  if (this.classList.contains('invalid')) {
    this.classList.remove('invalid');
    this.nextElementSibling.textContent = '';
  }
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

function formateDate(date) {
  let string = '';

  let now = new Date();
  let inputDate = new Date(Date.parse(date));

  function isTodayOrYesterday() {

    let timeDiff = now.setHours(0, 0, 0, 0) - inputDate.setHours(0, 0, 0, 0);

    // если дата не введена или даты совпадают
    if (date == '' || timeDiff == 0) return 'today';
    // если между текущей и введённой датой 24 часа
    if (timeDiff == 24 * 60 * 60 * 1000) return 'yesterday';

  }

  let day = isTodayOrYesterday();  // "вчера" или "сегодня", либо undefined

  now = new Date();
  // получаем строками часы и минуты, добавляем 0 впереди
  let strHours = ('0' + now.getHours()).slice(-2);
  let strMinutes = ('0' + now.getMinutes()).slice(-2);
  let strTime = `${strHours}:${strMinutes}`;

  // итоговая строка
  switch (day) {
    case 'today':
      string = 'Сегодня, ' + strTime;
      break;

    case 'yesterday':
      string = 'Вчера, ' + strTime;
      break;

    default:
      string = date;
      break;
  }

  return string;
}

// Events Listeners

// валидация формы
form.name.onblur = showErrors;
form.text.onblur = showErrors;
form.name.onfocus = hideErrors;
form.text.onfocus = hideErrors;

// клики по иконкам
comments.addEventListener('click', deleteComment);
comments.addEventListener('click', toggleLike);

// отправка формы (вставка сообщения)
form.onsubmit = function (e) {
  console.log('Submit!');

  let inputData = {
    name: this.name.value,
    text: this.text.value,
    date: this.date.value,
  };

  inputData.date = formateDate(inputData.date);

  comments.prepend(createComment(inputData));

  this.reset();
  return false;
}
