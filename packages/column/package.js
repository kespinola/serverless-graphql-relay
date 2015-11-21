/* global Package */
var both = ['server', 'client'];

Package.describe({
  name: 'column',
  description: 'page columns',
});

function onUse(api) {
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
    'Column',
  ], both);
}

function onTest(api) {
  api.use([
    'ecmascript',
    'peterellisjones:describe',
  ], both);
}

Package.onTest(onTest);
Package.onUse(onUse);
