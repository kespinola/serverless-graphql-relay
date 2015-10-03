Package.describe({
	name:'home',
	description:' home area',
});

Package.onUse(function(api){

	var both = ['server', 'client'];

	api.use([
		'core',
	], both);

	api.addFiles([
		'namespace.js',
		'./both/handler.jsx',
	], both);

	api.export([
		'Home'
	], both);

});