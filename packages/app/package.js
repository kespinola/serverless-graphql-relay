Package.describe({
  name: 'app',
  description: 'application foundation.'
});

Package.onUse(function(api) {
  var both = ['server', 'client'];

  api.use([
    'core',
  ], both);

  api.use([
    'fourseven:scss',
    'mrt:normalize.css',
  ], 'client');

  api.addFiles([
    'namespace.js',
    './both/handler.jsx',
  ], both);

  api.addFiles([
    './client/style.sass',
  ], 'client');

  api.imply([
    'home',
    'post',
    'user',
  ], both);

  api.export([
    'App'
  ], both);
});