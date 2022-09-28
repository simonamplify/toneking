(function($) {
	// Nested mobile menu
    function setup_collapsible_submenus() {
        var $menu = $('.et_mobile_menu'),
            top_level_link = '.et_mobile_menu .menu-item-has-children > a';
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
	$(document).ready( function() {
		// Menu Search
        $.fn.extend({
            toggleText: function(a, b){
                return this.text(this.text() == b ? a : b);
            }
        });

        var msb = null;
        var msb = document.querySelectorAll('.menuSearchBtn');
        if(msb !== null && msb !== '') {
            for(var i = 0; i < msb.length; i++) {
                msb[i].addEventListener('click', function(event) {
                    $('.menuSearch').slideToggle();
                    $('.menuSearch').toggleClass('focus');
                    $('.menuSearch.focus .dgwt-wcas-search-input').focus();
                    var msbi = this.querySelector('.material-icons');
                    if (msbi.innerHTML === "search") {
                        msbi.innerHTML = "search_off";
                    } else {
                        msbi.innerHTML = "search";
                    }
                    event.preventDefault();
                    return false;
                });
            }
        }
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
        // Change add to cart button text after click
        $('.et_pb_shop .ajax_add_to_cart').on('click', function(event) {
			$(this).text('Added to Cart');
            var addToCart = $(this);
            window.setTimeout(function () {
                $(addToCart).text('Add to Cart');
            }, 5000);
		});
	});
})(jQuery);