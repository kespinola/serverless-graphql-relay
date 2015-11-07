Package.describe({
	name: 'grid',
	description:'flex layout for react views based on schcherbin:flex-grid package. Access Container, Row, Col components from FlexGrid object',
});

Package.onUse(function(api){

	var both = ['server', 'client'];

	api.use([
    'ecmascript',
    'react',
    'maxharris9:classnames',
	], both);

  api.use([
    'shcherbin:flex-grid',
  ], 'client');

	api.addFiles([
    './namespace.js',
    './both/main.jsx',
	], both);

	api.export([
    'Flexgrid'
	], both);

});
