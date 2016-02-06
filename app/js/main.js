    var app = (function() {
    var init = function() {
        setUpListeners();
    };
    var setUpListeners = function() {
        $('.add-btn').on('click', showElems); 
        $('.popup-field, .close-popup').on('click', showElems);   
    };  
    var showElems = function() {
        $('.popup-field').toggle();
        $('.add-project').toggle();
        
        $('form').on('submit', checkForm);
    };
    
    var checkForm = function(e){
        e.preventDefault();

        var form = $(this);
        var items = form.find('input, textarea').not('input[type="submit"], input[type="reset"]');

        var flag = true;
        
        $.each(items, function(index, val){
            var content = $(val).val();
            if(content.length === 0){
                $(this).addClass("error");
                showTooltip(this);

				flag = false;                
            } else if (content.length > 1) {
                $(this).removeClass("error");
                $(".tooltip").remove();
            }
            
            
        });
        
        if(flag){
			var defObj = sendForm(form);
		}

    };
        
    var sendForm = function(form){
		var  url = form.attr('action');
		var data = form.serializeArray();

		$.ajax({
			url: url,
			type: 'POST',
			dataType: 'json',
			data: data
		}).done(function(data){
			console.log(data);		
		}).fail( function(){
			console.log("Проблема сервера");
		});
	};    
        
    var showTooltip = function(target){
		var $target = $(target);
		$target.data("info");
		var showTooltip = "<div class='tooltip'>" + $target.data("info") + "</div>";
		var elem = $target.parent('label');
		if(elem.find('.tooltip').length === 0) {
			$(target).before(showTooltip);
		}
        else {
                $(this).removeClass("tooltip");
            }
        
	};   
      
    return{
        init:init
    }
}());

    app.init();
       
    