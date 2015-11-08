Package.describe({
  name: 'page',
  description: 'page management for site',
});

Package.onUse(function(api) {

	var both = ['server', 'client'];

	api.use([
    'core',
    'site',
	], both);

	api.addFiles([
    'namespace.js',
    'both/collection.js',
    'both/views/index/handler.jsx',
	], both);

  api.addFiles([
    'server/publish.js',
    'server/methods.js',
  ], 'server');

	api.export([
    'Page'
	], both);

});
