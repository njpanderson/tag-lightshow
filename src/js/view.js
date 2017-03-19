// require.ensure([], () => {
	const View = require('njp-tag/src/View').default;

	new View({
		container: document.querySelector('.view')
	});
// }, 'view');