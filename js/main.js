(function ($) {
    // Nested mobile menu
    function setup_collapsible_submenus() {
        var $menu = $('.et_mobile_menu'),
            top_level_link = '.et_mobile_menu .menu-item-has-children > a';
        $menu.find('a').each(function () {
            $(this).off('click');
            if ($(this).is(top_level_link)) {
                $(this).attr('href', '#');
            }
            if (!$(this).siblings('.sub-menu').length) {
                $(this).on('click', function (event) {
                    $(this).parents('.mobile_nav').trigger('click');
                });
            } else {
                $(this).on('click', function (event) {
                    event.preventDefault();
                    $(this).parent().toggleClass('visible');
                });
            }
        });
    }
    $(window).load(function () {
        setTimeout(function () {
            setup_collapsible_submenus();
        }, 700);
    });
    $(document).ready(function () {
        // Menu Search
        $.fn.extend({
            toggleText: function (a, b) {
                return this.text(this.text() == b ? a : b);
            },
        });

        var msb = null;
        var msb = document.querySelectorAll('.menuSearchBtn');
        if (msb !== null && msb !== '') {
            for (var i = 0; i < msb.length; i++) {
                msb[i].addEventListener('click', function (event) {
                    $('.menuSearch').slideToggle();
                    $('.menuSearch').toggleClass('focus');
                    $('.menuSearch.focus .dgwt-wcas-search-input').focus();
                    var msbi = this.querySelector('.material-icons');
                    if (msbi.innerHTML === 'search') {
                        msbi.innerHTML = 'search_off';
                    } else {
                        msbi.innerHTML = 'search';
                    }
                    event.preventDefault();
                    return false;
                });
            }
        }
        /* Add Tag Line */
        $('#main-header .et_menu_container').append(
            '<h5 class="headerTagline">TONE YOU CAN FEEL<span class="tealFont">.</span></h5>',
        );
        /* Create no menu class */
        if ($('.noMenu').length) {
            $('body').addClass('noMenuBar');
        } else {
        }
        /* Artist list filter */
        var options = {
            valueNames: ['artistName'],
        };
        var artistList = new List('artists', options);
        /* Artist Search Clear */
        $('#artists .search').on('keyup', function () {
            if (this.value.length > 0) {
                $('#artists .clear').show();
            } else {
                $('#artists .clear').hide();
            }
        });
        $('#artists .clear').on('click', function (event) {
            artistList.search();
            artistList.filter();
            artistList.update();
            $('#artists .search').val('');
            $('#artists .search').focus();
            $('#artists .clear').hide();
        });
        // Change add to cart button text after click
        $('.et_pb_shop .ajax_add_to_cart').on('click', function (event) {
            $(this).text('Added to Cart');
            var addToCart = $(this);
            window.setTimeout(function () {
                $(addToCart).text('Add to Cart');
            }, 5000);
        });

        // Synergy Editor Download link updater (handles <a> tags, Divi Module Links, and et_link_options_data)
        function setupSynergyDownload(selector, url) {
            var elements = document.querySelectorAll(selector);
            if (!elements.length) {
                return;
            }

            elements.forEach(function (el) {
                // 1. Update all inner <a> tags (for hover previews, right-clicks, etc.)
                var innerLinks = el.querySelectorAll('a');
                innerLinks.forEach(function (link) {
                    link.href = url;
                    link.target = '_blank';
                    link.rel = 'noopener noreferrer';
                });

                // 2. Update Divi's internal module link data object if present
                if (
                    window.et_link_options_data &&
                    Array.isArray(window.et_link_options_data)
                ) {
                    window.et_link_options_data.forEach(function (item) {
                        if (el.classList.contains(item.class)) {
                            item.url = url;
                            item.target = '_blank';
                        }
                    });
                }

                // 3. Update data-et-href attribute on the module
                el.setAttribute('data-et-href', url);

                // 4. Capture click in the capturing phase (true) so it fires BEFORE Divi's event listener
                el.addEventListener(
                    'click',
                    function (e) {
                        e.preventDefault();
                        e.stopPropagation();
                        if (e.stopImmediatePropagation) {
                            e.stopImmediatePropagation();
                        }
                        window.open(url, '_blank', 'noopener,noreferrer');
                    },
                    true,
                );
            });
        }

        setupSynergyDownload(
            '.syn-download-win',
            'https://download.synergyamps.com/editor/latest/windows',
        );
        setupSynergyDownload(
            '.syn-download-mac',
            'https://download.synergyamps.com/editor/latest/macos',
        );
    });
})(jQuery);
