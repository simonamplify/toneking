<?php 
$args = array(
  'post_type'=> 'artist',
  //'category_id'=> '1',
  'orderby' => 'title',
  'order'    => 'ASC'
);              

$artist_query = new WP_Query( $args );

echo '<ul class="list artists">';

if($artist_query->have_posts() ) : while ( $artist_query->have_posts() ) : $artist_query->the_post();

  echo '<li class="artist">';
  echo '<!--<div class="artistImg">'; the_post_thumbnail(); echo '</div>-->';
  echo '<div class="artistDetails"><h4 class="artistName">'; the_title(); echo '</h4>'; the_content(); echo '</div>'; 
  echo '</li>';

endwhile; else: 

endif; wp_reset_postdata();

echo '</ul>';

?>