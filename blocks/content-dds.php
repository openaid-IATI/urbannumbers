<?php
	$image = get_field('image');
	$description = get_field('description');
	$name = get_field('name');
	$country = get_field('country');
	$city = get_field('city');
?>
<li>
	<div class="box" itemscope itemtype="http://schema.org/Person">
		<?php if($image): ?>
		<div class="img-holder">
			<a href="<?php the_permalink(); ?>">
				<!-- picturefill html structure example -->
				<span data-picture data-alt="image description">
					<span data-src="<?php echo $image['sizes']['dds320x200']; ?>" ></span>
					<span data-src="<?php echo $image['sizes']['dds640x400']; ?>" data-media="(-webkit-min-device-pixel-ratio:1.5), (min-resolution:144dpi)" ></span>
					<!--[if (lt IE 9) & (!IEMobile)]>
						<span data-src="<?php echo $image['sizes']['dds320x200']; ?>"></span>
					<![endif]-->
					<!-- Fallback content for non-JS browsers. Same img src as the initial, unqualified source element. -->
					<noscript><img src="<?php echo $image['sizes']['dds320x200']; ?>" alt="image description" ></noscript>
				</span>
			</a>
		</div>
		<?php endif; ?>
		<?php if($description): ?>
		<div class="text-holder">
			<p><a href="<?php the_permalink(); ?>">“<?php echo $description; ?>”</a></p>
		</div>
		<?php endif; ?>
		<?php if($name || $country || $city): ?>
		<div class="info-holder">
			<dl>
				<?php if($name): ?>
				<dt>Name:</dt>
				<dd itemprop="name"><?php echo $name; ?></dd>
				<?php endif; ?>
				<?php if($country): ?>
				<dt>Country:</dt>
				<dd itemprop="nationality"><?php echo $country; ?></dd>
				<?php endif; ?>
				<?php if($city): ?>
				<dt>City:</dt>
				<dd itemprop="homeLocation"><?php echo $city; ?></dd>
				<?php endif; ?>
			</dl>
		</div>
		<?php endif; ?>
	</div>
</li>