/* global Package */

Package.describe({
  name: 'site',
  description: 'manage sites',
});

Package.onUse(function(api) {

  var both = ['server', 'client'];

  api.use([
    'core',
    'theme',
    'form',
    'grid',
  ], both);

  api.addFiles([
    'namespace.js',
    'both/collection.js',
    'both/handlers/IndexHandler.jsx',
    'both/handlers/ListHandler.jsx',
    'both/handlers/SettingsHandler.jsx',
  ], both);

  api.addFiles([
    'server/publish.js',
    'server/methods.js',
  ], 'server');

  api.export([
    'Site',
  ], both);
});
