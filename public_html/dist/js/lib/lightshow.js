(function($) {
	var lit = {},
		pattern_on = false,
		letters = document.querySelectorAll('.buttons a'),
		container = document.querySelector('.buttons');

	// inject spans and apply class
	$(letters).each(function() {
		var $this = $(this);

		$this
			.addClass('letter-' + $.trim($this.text()))
			.attr('data-key', $.trim($this.text()));
	});

	$(container).on('click', 'a', function(event) {
		event.preventDefault();
		alert(this.textContent);
	});

	// $('#lights-start').click(function() { lightPattern4(); });
	$('#lights-start').click(lightPattern);

	function keydown(event) {
		var letter = String.fromCharCode(event.keyCode).toLowerCase();

		if (lit[letter]) {
			lit[letter].forEach(function(letter) {
				light(letter, false);
			});

			lit[letter] = null;
		} else {
			lit[letter] = document.querySelectorAll('a[data-key="' + letter + '"]');

			if (lit[letter]) {
				lit[letter].forEach(function(letter) {
					light(letter, true);
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

	function lightPattern() {
		var letter;

		if (!letters.length) {
			alert('No letters yet! Did you forget to add some?');
			return;
		}

		letters.forEach(function(letter) {
			light(letter, false);
		});

		if (!pattern_on) {
			pattern_on = true;

			$('<div>').animate({
				value: 100
			}, {
				duration: 5000,
				step: function(now) {
					if ((letter = letters[Math.round(letters.length / 100 * now)])) {
						light(letter, true);
					}
				},
				done: lightPattern2
			});
		}
	}

	function lightPattern2() {
		letters.forEach(function(letter) {
			light(letter, false);
		});

		$('<div>').animate({
			value: 100
		}, {
			duration: 4000,
			easing: 'linear',
			step: function(now) {
				if (Math.round(now) % 20 > 10) {
					container.classList.add('all-lit');
				} else {
					container.classList.remove('all-lit');
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

		container.classList.remove('all-lit');

		$('<div>').animate({
			value: 100
		}, {
			duration: 1000,
			easing: 'linear',
			step: function(now) {
				var factor = (reverse ? now : now - 100),
					index = Math.abs(Math.floor(factor / 100 * ((letters.length - 1) / 2))),
					index_up = Math.floor((letters.length - 1) - index);

				if (prev !== undefined) {
					light(letters[prev], false);
				}

				if (prev_up !== undefined) {
					light(letters[prev_up], false);
				}

				light(letters[index], true);
				light(letters[index_up], true);

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

		letters.forEach(function(letter) {
			light(letter, false);
		});

		$('<div>').animate({
			value: 100
		}, {
			duration: 1000,
			easing: 'linear',
			step: function(now) {
				var index = Math.floor((letters.length / 100) * now);

				if (index < (letters.length)) {
					if (prev !== undefined) {
						light(letters[prev], false);
					}

					light(letters[index], true);

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
}(window.jQuery));