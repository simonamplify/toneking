<?php
function custom_theme_scripts() {

    $parent_style = 'Divi';

    wp_enqueue_style( $parent_style, get_template_directory_uri() . '/style.css' );
    wp_enqueue_style( 'child-style',
        get_stylesheet_directory_uri() . '/style.css',
        array( $parent_style )
    );
    wp_enqueue_script( 'list-js', get_bloginfo( 'stylesheet_directory' ) . '/js/list.js', null, null, true);
    wp_enqueue_script( 'main-js', get_bloginfo( 'stylesheet_directory' ) . '/js/main.js', array('list-js'), null, true);
}
add_action( 'wp_enqueue_scripts', 'custom_theme_scripts' );
// Enqueue login styles
function my_logincustomCSSfile() {
    wp_enqueue_style('login-styles', get_stylesheet_directory_uri() . '/css/login_stylesheet.css');
}
add_action('login_enqueue_scripts', 'my_logincustomCSSfile');
// Automatically Update Wordpress
add_filter( 'auto_update_core', '__return_true' );
// Automatically Update Plugins
//add_filter( 'auto_update_plugin', '__return_true' );
// Automatically Update Theme
//add_filter( 'auto_update_theme', '__return_true' );
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
?>
