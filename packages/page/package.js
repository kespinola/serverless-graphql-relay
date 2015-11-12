Package.describe({
  name: 'page',
  description: 'page management for site',
});

Package.onUse(function(api) {

	var both = ['server', 'client'];

	api.use([
    'core',
    'site',
    'block',
	], both);

	api.addFiles([
    'namespace.js',
    'both/collection.js',
    'both/handlers/IndexHandler.jsx',
	], both);

  api.addFiles([
    'server/publish.js',
    'server/methods.js',
  ], 'server');

	api.export([
    'Page'
	], both);

});
