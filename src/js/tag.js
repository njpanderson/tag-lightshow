var App = require('njp-tag'),
	app, pallet;

app = new App({
	onElementRender: function(markup, droplet, zone, is_output) {
		if (droplet.name === 'Letter button' && is_output) {
			markup.innerHTML = '<span>' + markup.innerHTML + '</span>';
		}

		return markup;
	}
});

pallet = [
	{
		"name": "Header",
		"dropletType": "text",
		"value": "My Light Show",
		"attachmentIds": ["h1"],
		"editable": {
			"value": {
				"type": "text",
				"label": "Header label",
				"value": "My Light Show",
				"required": true
			}
		},
		"guidance": "<p>Headers go <b>before</b> anything you want to say or show. They tell visitors what they’re about to see.</p>"
	},
	{
		"name": "Section",
		"dropletType": "attribute",
		"key": "class",
		"value": "board",
		"attachmentIds": ["section_class"],
		"editable": {
			"value": {
				"type": "dropdown",
				"required": true,
				"label": "Choose a style",
				"options": ["board-stone", "board-playstation", "board-stars", "board-food", "board-sports", "board-trees", "board-wall", "board-speaker"],
				"value": "board-stone"
			}
		},
		"guidance": "<p>This is the <b>container</b> for the light show. Choose a style and see how it will change its appearance.</p>"
	},
	{
		"name": "Letter button",
		"dropletType": "element",
		"innerHTML": "",
		"tagName": "a",
		"attrs": {
			"href": "#",
			"class": "button-blue"
		},
		"attachmentIds": ["button"],
		"editable": {
			"attrs": {
				"class": {
					"type": "dropdown",
					"required": true,
					"label": "Choose a colour",
					"options": ["button-blue", "button-red", "button-yellow", "button-pink", "button-green"],
					"value": "button-blue"
				}
			},
			"innerHTML": {
				"type": "text",
				'required': function(values) {
					var value = values.innerHTML.innerHTML;

					if (value === '') {
						return 'This value is required.';
					} else if (!/^[a-z]{1}$/i.test(value)) {
						return 'This value can only be a single alphabet letter from A-Z.';
					} else {
						return true;
					}
				},
				"label": "Type one letter",
				"placeholder": "A, B, C etc...",
				"maxlength": 1
			}
		},
		"guidance": "<p>This is a <b>button</b>. With all the parts in place, they will <b>light up</b> when you press the same key on your keyboard, or when you press the “Start” button.</p><p><b>Why not try making a word out of the letters?</b></p>"
	},
	{
		"name": "Start button",
		"dropletType": "element",
		"tagName": "button",
		"attachmentIds": ["start_button"],
		"attrs": {
			"id": "lights-start",
			"type": "button",
			"class": "play"
		},
		"innerHTML": "<span>Start</span>",
		"guidance": "<p>Using <b>JavaScript</b>, this button will start the light show.</p>"
	},
	{
		"name": "Stop button",
		"dropletType": "element",
		"tagName": "button",
		"attachmentIds": ["stop_button"],
		"attrs": {
			"id": "lights-stop",
			"type": "button",
			"class": "stop"
		},
		"innerHTML": "<span>Stop</span>",
		"guidance": "<p>Using <b>JavaScript</b>, this button will stop the light show.</p>"
	}
];

app.load(
	'templates/default.html',
	pallet
).catch(function(error) {
	console.error(error);
});