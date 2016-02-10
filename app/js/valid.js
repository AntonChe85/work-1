var myModule = (function() {
    
    // Инициализирует наш модуль
    var init = function () {
            _setUpListners();
        };
    // Прослушивает события
    var _setUpListners = function () {
        $('#add-btn').on('click', _showModal); // открыть модальное окно        
         $('#add-new-project').on('submit', _addProject); // добавление проекта          
    };
    // Работает с модальным окном
    var _showModal = function (e) {
        console.log('Вызов модального окна');        
        e.preventDefault();
        
        var divPopup = $('#add-project-popup'),
            form = divPopup.find('form');
        
        divPopup.bPopup({
            speed: 650,
            transition: 'slideDown',
            onClose: function () {
                form.find('.server-mes').text('').hide();
            }
        });
    };
    // Добавляет проект
    var _addProject = function (e) {
        console.log('Добавление проекта');
        e.preventDefault();
        
        // объявляем переменные
        var form = $(this);
            url = 'post.php',
            myServerGiveMeAnAnswer = _ajaxForm(form, url);
        
        // запрос на сервер
        
        myServerGiveMeAnAnswer.done(function(ans) {
            
            var successBox = form.find('.success-mes'),
                errorBox = form.find('.error-mes');
            
            if(ans.status === 'OK') {
                errorBox.hide();
                successBox.text(ans.text).show();
            }else {
                successBox.hide();
                errorBox.text(ans.text).show();
            }            
        })
                   
    };
    // Универсальная функция
    // для её работы используется
    // @form - форма
    // @url - адрес php файла, к котором мы обращаемся
    // 1. собирает данные из формы
    // 2. проверяет форму
    // 3. делает запрос на сервер и возвращает данные с сервера
    var _ajaxForm = function (form, url) {
        
        // 1. проверить форму
        // 2. собрать данные из формы
        // 3. вернуть ответ с сервера
        
        //if(!valid) return false;
        
        data = form.serialize();
        
        var result = $.ajax({
			url: url,
			type: 'POST',
			dataType: 'json',
			data: data,
		}).fail(function(ans) {
            console.log('Проблемы на PHP');
            form.find('error-mes').text('На серверер произошла ошибка').show();
        });
        
        return result;    
    };
    
    return {
        init: init
    };

})();

myModule.init();