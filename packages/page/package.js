/* global Package */
Package.describe({
  name: 'page',
  description: 'page management for site',
});

Package.onUse(function(api) {
	const both = ['server', 'client'];

  api.use([
    'core',
    'site',
    'row',
    'column',
    'grid',
    'form',
  ], both);

  api.addFiles([
    'namespace.js',
    'both/collection.js',
    'both/components/Column.jsx',
    'both/components/Row.jsx',
    'both/handlers/IndexHandler.jsx',
  ], both);

  api.addFiles([
    'server/publish.js',
    'server/methods.js',
  ], 'server');

  api.imply([
    'row',
    'column',
  ], both);

  api.export([
    'Page',
  ], both);
});
