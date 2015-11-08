Package.describe({
  name: 'page',
  description: 'page management for site',
})

Package.onUse(function(api){

	var both = ['server', 'client'];

	api.use([
    'core',
	], both);

	api.addFiles([
    'namespace.js',
    'both/collection.js',
    'both/views/index/handler.jsx',
	], both);

	api.export([
    'Page'
	], both);

});
