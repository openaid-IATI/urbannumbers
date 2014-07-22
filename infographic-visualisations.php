<?php if( have_rows('blocks') ): ?>
<!-- area -->
<div class="area-boxes mark">
	<div class="row-holder">
		<div class="container-custom">
			<ul class="box-list">
			<?php while ( have_rows('blocks') ) : the_row();
			$read_more_url = get_sub_field('read_more_url');
			$title = get_sub_field('title');
			$graphic = get_sub_field('graphic');
			if($title || $graphic):
			?>
				<li>
					<!-- container-box -->
					<section class="container-box">
						<?php if($title): ?>
						<header class="heading-holder">
							<h3><?php echo $title; ?></h3>
						</header>
						<?php endif; ?>
						<?php if($graphic): ?>
						<div class="box-content">
							<div class="widget">
								<?php echo apply_filters('widget_text', $graphic); ?>
							</div>
							<a href="#" class="btn-close"><i class="glyphicon glyphicon-remove"></i></a>
						</div>
						<?php endif; ?>
					</section>
				</li>
			<?php endif; endwhile; ?>
			</ul>
		</div>
	</div>
</div>
<?php endif; ?>