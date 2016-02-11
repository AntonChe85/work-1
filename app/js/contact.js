var contactMe = (function () {
    
    // инициализирует наш модуль
    var init = function () {
        _setUplistners();
    };
    
    //прослушивает события
    var _setUplistners = function () {
        $('#contact-me').on('submit', _submitForm);
    };
    
    var _submitForm = function(ev) {
        console.log('Отправка формы');
        ev.preventDefault();
        
        var form = $(this),
            url = 'post.php',
            defObj = _ajaxForm(form, url);
        
        // что-то будем делать с ответом с сервера defObj
    };
    
    var _ajaxForm = function (form, url) {
        console.log('ajax запрос, но с проверкой!');
        if (!validation.validateForm(form)) return false;
        
        // если false то код ниже не произойдет ни когда
        
        var data = form.serialize();
        
        var result = $.ajax({
			url: url,
			type: 'POST',
			dataType: 'json',
			data: data,
		}).fail(function(ans) {
            console.log('Проблемы на PHP');
            form.find('error-mes').text('На серверер произошла ошибка').show();
        });
    };
    
    // возвращаем объект (публичные методы)
    return {
        init: init
    };
    
})();

contactMe.init();