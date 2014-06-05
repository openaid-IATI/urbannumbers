		</div>
		<!-- footer of the page -->
		<?php
		$footer_title = get_field('footer_title', 'options');
		$footer_logo = get_field('footer_logo', 'options');
		$footer_logo_link = get_field('footer_logo_link', 'options');
		$footer_copyright = get_field('footer_copyright', 'options');
		?>
		<footer id="footer">
			<div class="f1">
				<div class="f2">
					<div class="footer-container">
						<?php if($footer_title): ?><span class="heading"><?php echo $footer_title; ?></span><?php endif; ?>
						<strong class="sub-logo"<?php if($footer_logo) echo ' style="background-image: url(\''. $footer_logo .'\')"'; ?>><a href="<?php echo $footer_logo_link; ?>">unhabitat for a better urban future</a></strong>
						<p><?php echo $footer_copyright; ?></p>
					</div>
				</div>
			</div>
		</footer>
	</div>
	<?php global $lightbox; echo $lightbox ?>
	<?php wp_footer(); ?>
</body>
</html>