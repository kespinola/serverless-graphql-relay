/* global Package */
var both = ['server', 'client'];

Package.describe({
  name: 'block',
  description: 'page blocks',
});

Package.onUse(function(api) {

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
    'both/collection.js',
    'both/handlers/IndexHandler.jsx',
    'both/handlers/EditHandler.jsx',
  ], both);

  api.export([
    'Block',
  ], both);
});

Package.on_test(function (api) {

  api.use([
    'ecmascript',
    'peterellisjones:describe'
  ], both);

  api.add_files([
    'server/methods.js',
    'server/stubs.js',
    'server/tests.js',
  ], 'server');
});
