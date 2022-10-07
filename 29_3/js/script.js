/* Задание на урок:

1) Первую часть задания повторить по уроку

2) Создать функцию showMyDB, которая будет проверять свойство privat. Если стоит в позиции
false - выводит в консоль главный объект программы

3) Создать функцию writeYourGenres в которой пользователь будет 3 раза отвечать на вопрос 
"Ваш любимый жанр под номером ${номер по порядку}". Каждый ответ записывается в массив данных
genres

P.S. Функции вызывать не обязательно*/

'use strict';

let numberOfFilms;

function start() {
    numberOfFilms = +prompt('Скільки фільмів ви вже подивилися?', '');

    while (numberOfFilms == '' || numberOfFilms == null || isNaN(numberOfFilms)) {
        numberOfFilms = +prompt('Скільки фільмів ви вже подивилися?', '');
    }
}

start();

const personalMovieDB = {
    count: numberOfFilms,
    movies: {},
    artors: {},
    genres: [],
    privat: false
};


function rememberMyFilms() {
    for (let i = 0; i < 2; i++) {
        const a = prompt('Останній фільм, який ти дивився?', '').trim(),
              b = prompt('Як оціните фільм', '');
        
        if(a != null && b != null && a != '' && b != '' && a.length < 50) {
            personalMovieDB.movies[a] = b; 
            console.log('done');
        } else {
            console.log('error');
            i--;
        }  
    }
}

rememberMyFilms();

function detectPersonalLevel() {
    if(personalMovieDB.count < 10){
        console.log('Подивилися доволі мало фільмів');
    } else if (personalMovieDB.count >= 10 && personalMovieDB.count <= 30) {
        console.log('Ви класичний глядач');
    } else if (personalMovieDB.count > 30) {
        console.log('Ви справжній кіноман');
    } else {
        console.log('Виникла якась помилка');
    }
}

detectPersonalLevel();

function showMyDB(hidden) {
    if (!hidden) {
        console.log(personalMovieDB);
    }
}

showMyDB(personalMovieDB.privat);

function writeYourGenres() {
    for (let i = 1; i <= 3; i++) {
        personalMovieDB.genres[i - 1] = prompt(`Ваший улюблений жанр під номером ${i}`);
    }
}

writeYourGenres();