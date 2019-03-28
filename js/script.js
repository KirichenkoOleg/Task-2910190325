document.addEventListener("DOMContentLoaded", function() {

    let form = document.querySelector('.form');
    let textarea = document.querySelector('.form__textarea');
    let sendBtn = document.querySelector('.form__button');

    let likeIcon = document.querySelector('.reviews__icon-like');// icon
    let sumLikes = document.querySelector('.reviews__sum-likes');    
    let allMessagesIcon = document.querySelector('.reviews__icon-all-messages');// icon
    let sumAllMessages = document.querySelector('.reviews__sum-all-messages');

    let noComentElem = document.querySelector('.reviews__no-coment');//нет коментариев
    let reviewsContainer = document.querySelector('.reviews__reviews-container');//блок куда добавлять элементы
    let user =  createUser('Лилия', 'Семенова');

    function createUser(firstName, secName) {
        return {
            name: firstName,
            surname: secName,
        }
    };/* создаем пользователя от лица которого будут сообщения */


    function makeCounter() {
        let currentCount = 1;
        return {
            set: function(val) {
                val++;
                currentCount = val;
            },
            getNext: function() {
                return currentCount++;
            },
            reset: function() {
                currentCount = 1;
            },
        }
    };
    let counter = makeCounter();

    
    //ставим лайк
    likeIcon.addEventListener('click', function() {
        sumLikes.textContent = counter.getNext();
    });

    //щитаем кол. сообщений и подставляем на стриницу
    function SetSumAllCildren() {
        let sumMessages = reviewsContainer.children.length;
        sumAllMessages.textContent = `${sumMessages}`;
    }


    function startWork(e) {
        e.preventDefault();//отм. стандартное поведение
        var reg = /\s+/;
        var regSec = /\s*\b\w+\b\s*.*\s*/;

        if( textarea.value.length == 0 || reg.test(textarea.value) && !regSec.test(textarea.value) ) {
            textarea.classList.add('is-invalid');
        } else {
            textarea.classList.remove('is-invalid');
            getValTextarea(textarea.value);
            textarea.value = "";
        }
    };
    
    //обрабатываем отправку форму при нажатии на кнопку
    form.addEventListener('submit', function(event) {
        startWork(event);
    });

    //обрабатываем отправку форму при комбинации кавиш
    form.addEventListener('keydown', function(event) {
        if( event.ctrlKey && event.keyCode === 13 ) {
            startWork(event);
        }
    });


    //-----------------
    //скрываем или показываем (Коментариев нет)
    function showNoComentElem() {
        noComentElem.classList.remove('toHideBlock');
    };
    function hideNoComentElem() {
        noComentElem.classList.add('toHideBlock');
    };

    
    //запуск проц. добавления комента
    function getValTextarea(val) {
        if ( reviewsContainer.children.length == 0 ) {
            hideNoComentElem();//скрываем надпись "нет коментариев"
        };
        addTaskItem(val);
    };

    
    // ф-ция принимает значение из формы и подставляет в коментарий
    function addTaskItem(text){

        let today = new Date();
        let year = today.getFullYear();
        let day = today.getDate();
        const monthNames = ["января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"];
        let nameOfMonth = monthNames[today.getMonth()];

        reviewsContainer.insertAdjacentHTML("beforeend", `<div class="reviews__item" data-userName="" data-value="">
            <div class="reviews__information-date">
                <a href="" class="reviews__user-name">${user.name} ${user.surname}</a>
                <span class="reviews__date-value">${day} ${nameOfMonth} ${year}</span>
            </div>

            <div class="reviews__comment-block">
                <p class="reviews__comment-text">${text}</p>
            </div>
        </div>`);

        SetSumAllCildren();
    };




});