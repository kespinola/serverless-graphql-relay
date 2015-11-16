/* global Package */
Package.describe({
  name: 'block',
  description: 'page blocks',
});

Package.onUse(function(api) {
  var both = ['server', 'client'];

  api.use([
    'core',
    'form',
    'grid',
  ], both);

  api.addFiles([
    'server/publish.js',
    'server/methods.js',
  ], 'server');

  api.addFiles([
    'namespace.js',
    'both/utils.js',
    'both/collection.js',
    'both/handlers/IndexHandler.jsx',
    'both/handlers/EditHandler.jsx',
  ], both);

  api.export([
    'Block',
  ], both);
});
