window.addEventListener('DOMContentLoaded', () => {
    
    // Tabs

    const tabs = document.querySelectorAll('.tabheader__item'),
        tabsContent = document.querySelectorAll('.tabcontent'),
        tabsParent = document.querySelector('.tabheader__items');

    function hideTabContent() { // Функція для скриття неактивних табів
        tabsContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });

        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');
        });
    }

    function showTabContent(i = 0) { // Функція для показу активного табу
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add('tabheader__item_active');
    }

    hideTabContent();
    showTabContent();

    tabsParent.addEventListener('click', (event) => {
        const target = event.target;

        if (target && target.classList.contains('tabheader__item')){
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });

    // Timer

    const deadline = '2022-12-28';

    function getTimeRemaining(endtime){ // Ф-ція для визначення різниці часу
        let days, hours, minutes, seconds;
        const t = Date.parse(endtime) - Date.parse(new Date()); // Перетворюємо в мілісекунди
            
        if (t <= 0){ // Перевірка, якщо дата пройшла
            days = 0;
            hours = 0;
            minutes = 0;
            seconds = 0;
        } else {
            days = Math.floor(t / (1000 * 60 * 60 * 24)), // Дні до кінця
            hours = Math.floor((t / (1000 * 60 * 60) % 24)), // Години до кінця
            minutes = Math.floor((t / 1000 / 60) % 60), // Хвилини до кінця
            seconds = Math.floor((t / 1000) % 60); // Секунди до кінця
        }
            
        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };      
    }

    function getZero(num) {
        if (num >= 0 && num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    }

    function setClock(selector, endtime) { // Ф-ція для встановлення таймеру на сторінці
        const timer = document.querySelector(selector),
              days = timer.querySelector('#days'),
              hours = timer.querySelector('#hours'),
              minutes = timer.querySelector('#minutes'),
              seconds = timer.querySelector('#seconds'),
              timeInterval = setInterval(updateClock, 1000); // Запускаємо нашу ф-цію про оновлення кожну секунду
        
        updateClock();

        function updateClock() { // Ф-ція для оновлення таймера
            const t = getTimeRemaining(endtime);

            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            if (t.total <= 0) { // Перевірка, якщо різниця вийшла ві'ємною, то зупиняємо
                clearInterval(timeInterval);
            }
        }
    }

    setClock('.timer', deadline);
});