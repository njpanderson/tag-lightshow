(function($, view) {
	var lit = {},
		pattern_on = false,
		animator = $({ value: 0 }),
		letter_re = new RegExp('[a-z]+', 'i'),
		$letters, $container;

	$('.view').bind('tag:update', function() {
		// update selections
		$letters = $('section > p a');
		$container = $('section > p');

		stopAll();

		// inject spans and apply class
		$letters.each(function() {
			var $this = $(this);

			$this
				.addClass('letter-' + $.trim($this.text()))
				.attr('data-key', $.trim($this.text().toLowerCase()));
		});

		$container.on('click', 'a', function(event) {
			event.preventDefault();
		});
	});

	$(document).on('click', 'button', buttonRoute);

	function buttonRoute(event) {
		var $this = $(this);

		event.preventDefault();

		if (!$letters.length) {
			view.dialog(
				'No letters yet!',
				[
					'Don’t forget to add some letters.',
					'You can do this with the “Letter button” Droplet.'
				]
			);
		} else {
			if ($this.hasClass('start')) {
				lightPattern();
			} else {
				stopAll();
			}
		}

		$this.blur();
	}

	function keydown(event) {
		var letter = String.fromCharCode(event.keyCode).toLowerCase();

		if (letter_re.test(letter) !== false) {
			if (lit[letter]) {
				lit[letter].each(function() {
					light(this, false);
				});

				lit[letter] = null;
			} else {
				lit[letter] = $('a[data-key="' + letter + '"]');

				lit[letter].each(function() {
					light(this, true);
				});
			}
		}
	}

	function light(letter, light) {
		if (light) {
			letter.classList.add('lit');
		} else {
			letter.classList.remove('lit');
		}
	}

	function stopAll() {
		animator.stop(true);
		pattern_on = false;
		lit = {};

		$letters.each(function() {
			light(this, false);
		});

		$container.removeClass('all-lit');
	}

	function lightPattern() {
		var letter;

		if (!pattern_on) {
			$letters.each(function() {
				light(this, false);
			});

			pattern_on = true;
			animator[0].value = 0;

			animator.animate({
				value: 100
			}, {
				duration: 5000,
				step: function(now) {
					if ((letter = $letters[Math.round($letters.length / 100 * now)])) {
						light(letter, true);
					}
				},
				done: lightPattern2
			});
		}
	}

	function lightPattern2() {
		$letters.each(function() {
			light(this, false);
		});

		animator[0].value = 0;

		animator.animate({
			value: 100
		}, {
			duration: 4000,
			easing: 'linear',
			step: function(now) {
				if (Math.round(now) % 20 > 10) {
					$container.addClass('all-lit');
				} else {
					$container.removeClass('all-lit');
				}
			},
			done: function() {
				lightPattern3();
			}
		});
	}

	function lightPattern3(reverse, count) {
		var prev, prev_up;

		count = count || 1;
		reverse = (typeof reverse !== 'undefined' ? reverse : false);
		animator[0].value = 0;
		$container.removeClass('all-lit');

		animator.animate({
			value: 100
		}, {
			duration: 1000,
			easing: 'linear',
			step: function(now) {
				var factor = (reverse ? now : now - 100),
					index = Math.abs(Math.floor(factor / 100 * (($letters.length - 1) / 2))),
					index_up = Math.floor(($letters.length - 1) - index);

				if (prev !== undefined) {
					light($letters[prev], false);
				}

				if (prev_up !== undefined) {
					light($letters[prev_up], false);
				}

				light($letters[index], true);
				light($letters[index_up], true);

				prev = index;
				prev_up = index_up;
			},
			done: function() {
				if (count < 6) {
					// loop
					lightPattern3(!reverse, (count + 1));
				} else {
					lightPattern4();
				}
			}
		});
	}

	function lightPattern4(count) {
		var prev;

		count = count || 1;

		$letters.each(function() {
			light(this, false);
		});

		animator[0].value = 0;

		animator.animate({
			value: 100
		}, {
			duration: 1000,
			easing: 'linear',
			step: function(now) {
				var index = Math.floor(($letters.length / 100) * now);

				if (index < ($letters.length)) {
					if (prev !== undefined) {
						light($letters[prev], false);
					}

					light($letters[index], true);

					prev = index;
				}
			},
			done: function() {
				if (count < 4) {
					// loop
					lightPattern4(count + 1);
				} else {
					// complete
					pattern_on = false;
					lightPattern();
				}
			}
		});
	}

	window.addEventListener('keydown', keydown);
}(window.jQuery, window.view));