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

    tabsParent.addEventListener('click', (event) => { // Перебираємо наші таби
        const target = event.target;

        if (target && target.classList.contains('tabheader__item')){
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(i); // Показуємо саме той на який натиснули
                }
            });
        }
    });

    // Timer

    const deadline = '2022-12-28';

    function getTimeRemaining(endtime){ // Ф-ція для визначення різниці часу
        const t = Date.parse(endtime) - Date.parse(new Date()),
            days = Math.floor( (t/(1000*60*60*24)) ),
            seconds = Math.floor( (t/1000) % 60 ),
            minutes = Math.floor( (t/1000/60) % 60 ),
            hours = Math.floor( (t/(1000*60*60) % 24) );
            
        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };      
    }

    function getZero(num) { // Додаємо в таймері нулі перед одноцифровими числами 
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

    // Modal

    const modalTrigger = document.querySelectorAll('[data-modal]'),
          modal = document.querySelector('.modal'),
          modalCloseBtn = document.querySelector('[data-close]');

    function openModal() { // Ф-ція відкриття модального вікна
        modal.classList.add('show');
        modal.classList.remove('hide');
        document.body.style.overflow = 'hidden'; // Фіксуємо сторінку, щоб не можна було скролить
        clearInterval(modalTimerId);
    }

    modalTrigger.forEach(btn => { // Додаємо обробник на кожну кнопку
        btn.addEventListener('click', openModal);
    });

    function closeModal() { // Ф-ція закриття модального вікна
        modal.classList.add('hide');
        modal.classList.remove('show');
        document.body.style.overflow = ''; // Сторінка скролиться
    }

    modalCloseBtn.addEventListener('click', closeModal); // Натискання на хрестик

    modal.addEventListener('click', (event) => { // Натискання на пустоту поза межами модального
        if (event.target === modal){
            closeModal();
        }
    });

    document.addEventListener('keydown', (event) => { // Натискання на ESC
        if (event.code === "Escape" && modal.classList.contains('show')){
            closeModal();
        }
    });

    const modalTimerId = setTimeout(openModal, 5000);

    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModal();
            window.removeEventListener('scroll', showModalByScroll);
        }
    }

    window.addEventListener('scroll', showModalByScroll);
});