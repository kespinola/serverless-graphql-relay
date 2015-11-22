/* global Package */
const both = ['server', 'client'];
Package.describe({
  name: 'page',
  description: 'page management for site',
});

function onUse(api) {
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
    'both/components/main.jsx',
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
}

function onTest(api) {
  api.use([
    'ecmascript',
    'peterellisjones:describe',
  ], both);

  api.addFiles([
    'server/stub.js',
    'server/methods.js',
    'server/tests.js',
  ], 'server');
}

Package.onTest(onTest);
Package.onUse(onUse);
