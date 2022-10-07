/* Задания на урок:

1) Реализовать функционал, что после заполнения формы и нажатия кнопки "Подтвердить" - 
новый фильм добавляется в список. Страница не должна перезагружаться.
Новый фильм должен добавляться в movieDB.movies.
Для получения доступа к значению input - обращаемся к нему как input.value;
P.S. Здесь есть несколько вариантов решения задачи, принимается любой, но рабочий.

2) Если название фильма больше, чем 21 символ - обрезать его и добавить три точки

3) При клике на мусорную корзину - элемент будет удаляться из списка (сложно)

4) Если в форме стоит галочка "Сделать любимым" - в консоль вывести сообщение: 
"Добавляем любимый фильм"

5) Фильмы должны быть отсортированы по алфавиту */

"use strict";


document.addEventListener('DOMContentLoaded', () => { // .addEventListener для того, щоб скрипт почався після вьорстки
  const movieDB = {
    movies: [
      "Логан",
      "Лига справедливости",
      "Ла-ла лэнд",
      "Одержимость",
      "Скотт Пилигрим против...",
    ],
  };
  
  const adv = document.querySelectorAll('.promo__adv img'), // Оголошення констант, дані які беремо з index.html
    poster = document.querySelector('.promo__bg'),
    genre = poster.querySelector('.promo__genre'),
    moviList = document.querySelector('.promo__interactive-list'),
    addForm = document.querySelector('form.add'),
    addInput = addForm.querySelector('.adding__input'),
    checkbox = addForm.querySelector('[type="checkbox"]');

  addForm.addEventListener('submit', (event) => { // Подія коли ми натискаємо на форму з відправленням нового фільму
    event.preventDefault(); // Тормозимо браузер і говоримо йогому робити не дефолт, а те шо ми хочемо нижче

    let newFilm = addInput.value; // Отримуємо значення з форми де ввели
    const favorite = checkbox.checked; // Перевіряємо на булінове значення наш чекбокс, чи стоїть галочка

    if (newFilm) { // Умова, щоб наш новий фільм не був порожньою строкою

      if(newFilm.length > 21){ // Умова, якщо кількість символів більша за 21, то скоротити і і додати "..."
        newFilm = `${newFilm.substring(0,22)}...`;
      }

      if (favorite) { // Якщо ми поставили галочку, то виводимо в консоль
        console.log("Додаємо улублений фільм");
      }

      movieDB.movies.push(newFilm); // Додаємо новий елемент(фільм)
      sortArr(movieDB.movies); // Сортуємо наш новий масив
    
      createMovieList(movieDB.movies, moviList); // Виводимо список наших фільмів
    }
    
    event.target.reset(); // Очищуємо форму, щоб ввести нові данні

  });
  
  const deleteAdv = (arr) => { // Функція для видалення реклами спонсорів
    arr.forEach((item) => {
      item.remove();
    });
  };
  
  const makeChanges = () => { // Функція для невелечких змін
    genre.textContent = "драма";
  
    poster.style.backgroundImage = 'url("img/bg.jpg")';
  };

  const sortArr = (arr) => { // Функція для сортування масиву 
    arr.sort();
  };
 


  function createMovieList(films, parent) { // Функція для виведення нашого списку фільмів
    parent.innerHTML = ""; //
    sortArr(films);
  
    films.forEach((film, i) => {
      parent.innerHTML += `
            <li class="promo__interactive-item">${i + 1}. ${film}
                <div class="delete"></div>
            </li>
        `;
    });

    document.querySelectorAll('.delete').forEach((btn, i) => { // Перебираємо всі наші фільми
      btn.addEventListener('click', () => { // Якщо клікнули на корзину
        btn.parentElement.remove(); // То видаляємо цей елемент
        movieDB.movies.splice(i, 1); // З бази даних також видаляємо
        createMovieList(films, parent); // І створюємо новий список
      });
    });
  }

  deleteAdv(adv);
  makeChanges();
  createMovieList(movieDB.movies, moviList);

});