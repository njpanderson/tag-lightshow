var App = require('njp-tag'),
	app, pallet;

app = new App({
	onElementRender: function(markup, droplet, zone, is_output) {
		if (droplet.name === 'Letter' && is_output) {
			if (markup.innerHTML === ' ') {
				markup.innerHTML = '-';
			}

			markup.innerHTML = '<span>' + markup.innerHTML + '</span>';
		}

		return markup;
	}
});

pallet = [
	{
		'name': 'Sign',
		'dropletType': 'attribute',
		'key': 'class',
		'value': 'bricks',
		'attachmentIds': ['sign_class'],
		'editable': {
			'value': {
				'type': 'dropdown',
				'required': true,
				'label': 'Choose a sign style',
				'options': ['bricks', 'fabric', 'speaker', 'stars', 'tiles', 'wood'],
				'value': 'bricks'
			}
		},
		'guidance': '<p>This is the <b>container</b> for the neon sign. Choose a style and see how it will change its appearance.</p>'
	},
	{
		'name': 'Letter',
		'dropletType': 'element',
		'innerHTML': '',
		'tagName': 'a',
		'attrs': {
			'href': '#',
			'class': 'white'
		},
		'attachmentIds': ['letter'],
		'editable': {
			'attrs': {
				'class': {
					'type': 'dropdown',
					'required': true,
					'label': 'Choose a colour',
					'options': ['white', 'red', 'yellow', 'pink', 'blue', 'green', 'teal'],
					'value': 'red'
				}
			},
			'innerHTML': {
				'type': 'text',
				'required': function(values) {
					var value = values.innerHTML.innerHTML;

					if (value === '') {
						return 'This value is required.';
					} else if (!/^[a-z ]{1}$/i.test(value)) {
						return 'This value can only be a single alphabet letter from A-Z, or a space.';
					} else {
						return true;
					}
				},
				'label': 'Type one letter',
				'placeholder': 'A, B, C etc...',
				'maxlength': 1
			}
		},
		'guidance': '<p>This is a <b>button</b>. With all the parts in place, they will <b>light up</b> when you press the same key on your keyboard, or when you press the “Start” button.</p><p><b>Why not try making a word out of the letters?</b></p>'
	}, {
		'name': 'Start button',
		'dropletType': 'element',
		'tagName': 'button',
		'attachmentIds': ['start_button'],
		'attrs': {
			'id': 'lights-start',
			'type': 'button',
			'class': 'start'
		},
		'innerHTML': '<span>Start</span>',
		'guidance': '<p>Using <b>JavaScript</b>, this button will start the light show.</p>'
	}, {
		'name': 'Stop button',
		'dropletType': 'element',
		'tagName': 'button',
		'attachmentIds': ['stop_button'],
		'attrs': {
			'id': 'lights-stop',
			'type': 'button',
			'class': 'stop'
		},
		'innerHTML': '<span>Stop</span>',
		'guidance': '<p>Using <b>JavaScript</b>, this button will stop the light show.</p>'
	}, {
		name: 'Instructions',
		dropletType: 'text',
		value: 'Type a letter to see it light up, or use the Start button to run the show!',
		attachmentIds: ['instructions'],
		guidance: '<p>Add some text on your page to tell visitors how to light up the letters.</p>'
	}
];

app.load(
	'templates/default.html',
	pallet
).catch(function(error) {
	console.error(error);
});