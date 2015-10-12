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
    'index.js',
    'both/handler.jsx',
  ], both);

  api.addFiles([
    'client/style.sass',
  ], 'client');

  api.imply([
    'reactrouter:react-router',
    'reactrouter:react-router-ssr',
    'react',
    'home',
    'post',
    'user',
    'role',
    'site',
  ], both);

  api.export([
    'App'
  ], both);
});
