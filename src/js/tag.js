// require.ensure([], () => {
	const App = require('njp-tag').default;

	var app = new App({
		onElementRender: function(markup, droplet, zone, is_output) {
			if (droplet.name === 'Letter button' && is_output) {
				markup.innerHTML = '<span>' + markup.innerHTML + '</span>';
			}

			return markup;
		}
	});

	app.load(
		'templates/default.html',
		'templates/pallet.json'
	).catch((error) => {
		console.error(error);
	});
// }, 'app');