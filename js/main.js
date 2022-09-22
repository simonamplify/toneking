(function($) {
	$(document).ready( function(){
		/* Nested mobile menu */
		function setup_collapsible_submenus() {
	        var $menu = $('#mobile_menu'),
	            top_level_link = '#mobile_menu .menu-item-has-children > a';
	        $menu.find('a').each(function() {
	            $(this).off('click'); 
	            if ( $(this).is(top_level_link) ) {
	                $(this).attr('href', '#');
	            }
	            if ( ! $(this).siblings('.sub-menu').length ) {
	                $(this).on('click', function(event) {
	                    $(this).parents('.mobile_nav').trigger('click');
	                });
	            } else {
	                $(this).on('click', function(event) {
	                    event.preventDefault();
	                    $(this).parent().toggleClass('visible');
	                });
	            }
	        });
	    }
	    $(window).load(function() {
	        setTimeout(function() {
	            setup_collapsible_submenus();
	        }, 700);
	    });
		// Menu Search
        $.fn.extend({
            toggleText: function(a, b){
                return this.text(this.text() == b ? a : b);
            }
        });
        $('.menuSearchBtn').click(function(){
            $('.menuSearch').slideToggle();
            $('.menuSearch').toggleClass('focus');
            $('.menuSearch.focus .dgwt-wcas-search-input').focus();
            var ms = document.querySelector('.menuSearchBtn .material-icons');
            if (ms.innerHTML === "search") {
                ms.innerHTML = "close";
            } else {
                ms.innerHTML = "search";
            }
        });
	    /* Add Tag Line */
	    $('#main-header .et_menu_container').append('<h5 class="headerTagline">TONE YOU CAN FEEL<span class="tealFont">.</span></h5>');
		/* Create no menu class */
		if ( $('.noMenu').length ) {
			$('body').addClass('noMenuBar');
		} else {
			
		}
		/* Artist list filter */
		var options = {
			valueNames: [ 'artistName' ]
		};
		var artistList = new List('artists', options);
		/* Artist Search Clear */
		$('#artists .search').on('keyup', function() {
			if (this.value.length > 0) {
				$('#artists .clear').show();
			} else {
				$('#artists .clear').hide();
			}
	   	});
		$('#artists .clear').on('click', function(event) {
			artistList.search();
			artistList.filter();
			artistList.update();
			$('#artists .search').val('');
			$('#artists .search').focus();
			$('#artists .clear').hide();
		});
	});
})(jQuery);