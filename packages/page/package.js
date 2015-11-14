/* global Package*/
Package.describe({
  name: 'page',
  description: 'page management for site',
});

Package.onUse(function(api) {
	const both = ['server', 'client'];

	api.use([
    'core',
    'site',
    'block',
    'grid',
    'form',
	], both);

	api.addFiles([
    'namespace.js',
    'both/collection.js',
    'both/components/Block.jsx',
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
