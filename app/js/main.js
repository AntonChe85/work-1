var app = (function() {
    var init = function() {
        setUpListeners();
    };
    var setUpListeners = function() {
        $('.add-btn').on('click', showElems); 
        $('.background-opacity').on('click', showElems);   
    };  
    var showElems = function() {
        $('.background-opacity').toggle();
        $('.add-project').toggle();
    };
    var checkForm = function(e) {
        e.preventDefault();
        
        var form = $(this);
        var items = form.find('input, textarea').not('.download, .btn-popup');
        $.each(items, function(index, val) {
            var content = $(val).val();
            if(content.length === 0) {
                $(this).addClass("error");
            }
            else {
                $(this).removeClass("error");
            }
        });
    };
    return {
        init:init
    }
}());
           
$(document).ready(function() {
    app.init();
});          