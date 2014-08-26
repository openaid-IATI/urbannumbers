
<?php get_header(); the_post(); ?>
	<div id="main">
		<!-- twocolumns -->
		<section id="twocolumns">
			<header class="main-heading">
				<h1>Activation</h1>
                                
                                <?php
                                        if (isset($_GET['activation_key'])){
                                            //check activation key
                                            if (activate_user($_GET['activation_key'])){
                                                echo "<p>Your account is activated</p>";
                                                echo "<a href='/wp-admin'>click to login</a>";
                                            }else{
                                                echo "<p>Your account is already activated</p>";
                                            }

                                        }else{
                                            echo "geen activatie key";
                                        }

                                ?>
			</header>
			<div class="twocolumns-frame">
				<!-- content -->
				<div id="content">
                                    
					<!-- post -->
					<article class="post" itemscope itemtype="http://schema.org/Person">
						<div class="post-content">
							<?php the_content(); ?>
							<?php edit_post_link( __( 'Edit', 'base' ) ); ?>
						</div>
					</article>
				</div>
			</div>
		</section>
	</div>
<?php get_footer(); ?>

