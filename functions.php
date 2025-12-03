<?php
// Enqueue parent and child theme styles and scripts
function custom_theme_scripts() {
    $parent_handle = 'Divi';
    wp_enqueue_style(
        'child-style',
        get_stylesheet_directory_uri() . '/css/stylesheet.css',
        array( $parent_handle ),
        filemtime( get_stylesheet_directory() . '/css/stylesheet.css' )
    );
    wp_enqueue_script(
        'list-js',
        get_stylesheet_directory_uri() . '/js/lib/list.min.js',
        null,
        null,
        true
    );
    wp_enqueue_script(
        'main-js',
        get_stylesheet_directory_uri() . '/js/main.min.js',
        array('list-js'),
        filemtime( get_stylesheet_directory() . '/js/main.min.js' ),
        true
    );
}
add_action( 'wp_enqueue_scripts', 'custom_theme_scripts', 11 ); // 11 to ensure it runs after the parent theme's scripts
// Enqueue login styles
function my_logincustomCSSfile() {
    wp_enqueue_style('login-styles', get_stylesheet_directory_uri() . '/css/login_stylesheet.css');
}
add_action('login_enqueue_scripts', 'my_logincustomCSSfile');

// Change login logo url and title text
function my_loginURL() {
    return '/';
}
add_filter('login_headerurl', 'my_loginURL');
function my_loginURLtext() {
    return 'Tone King';
}
add_filter('login_headertitle', 'my_loginURLtext');
// Load artists with shortcode
function artistsDirectory() {
    ob_start();
    get_template_part( 'artists' );
    return ob_get_clean(); 
}
add_shortcode('artistsDirectory', 'artistsDirectory');
// Add cart button to shop archive pages
add_action('woocommerce_after_shop_loop_item_title', 'woocommerce_template_loop_add_to_cart', 10);
// BEFORE CHECKOUT PAYMENT
add_action( 'woocommerce_review_order_before_payment', 'order_notice' );
function order_notice() {
    get_template_part( 'order_notice' );
}
// Lead time notice shortcode
function lead_time_notice() {
    return '<p><strong>Please note - due to high demand there is currently a 3-10 day lead time for this product.</strong></p>';
}
add_shortcode('lead_time_notice', 'lead_time_notice');
?>
