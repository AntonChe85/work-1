var validation = (function () {
    
    // инициализирует наш модуль
    var init = function () {
        _setUplistners();
    };
    
    // прослушивает события
    var _setUplistners = function () {
        $('form').on('keydown', '.error', _removeError);
        $('form').on('reset', _clearForm);
    };
    
    var _removeError = function () {
        $(this).removeClass('error');
    };
    
    var _clearForm = function (form) {
        var form = $(this);
        form.find('input, textarea').trigger('hideTooltip');
        form.find('.error').removeClass('error');
    }
    
    // создание тултипов
    var _createQtip = function (element, position) {
        
        // позиция тултипов
        if (position === 'right') {
            position = {
                my: 'left center',
                at: 'right center'
            }
        }else {
            position = {
                my: 'right center',
                at: 'left center',
                adjust: {
                    method: 'shift none'
                }
            }
        }
        
        // инициализация тултипа
        element.qtip({
            content: {
                text: function() {
                    return $(this).attr('qtip-content');
                }
            },
            show: {
                event: 'show'
            },
            hide: {
                event: 'keydown hideTooltip removeTooltip'
            },
            position: position,
            style: {
                classes: 'qtip-mystyle qtip-rounded',
                tip: {
                    height: 10,
                    width: 10
                }
            }
        }).trigger('show');
        
    };
    
    // универсальная функция
    var validateForm = function (form) {
        
        var elements = form.find('input, textarea').not('input[type="file"], input[type="hidden"]'),
            valid = true;
        
        $.each(elements, function(index, val) {
            var element = $(val),
                val = element.val(),
                pos = element.attr('qtip-position');
            
            if(val.length === 0) {
                element.addClass('error');
                _createQtip(element, pos);
                valid = false;
            }
        });
        
        return valid;
        
    };
    
    // возвращаем объект (публичные методы)
    return {
        init: init,
        validateForm: validateForm
    };
    
})();

validation.init();