Package.describe({
  name: 'app',
  description: 'application foundation.'
});

Package.onUse(function (api) {
  var both = ['server', 'client'];

  api.use([
    'grid',
    'core',
  ], both);

  api.use([
    'fourseven:scss',
    'mrt:normalize.css',
  ], 'client');

  api.addFiles([
    'namespace.js',
    'index.js',
    'both/views/index/handler.jsx',
  ], both);

  api.addFiles([
    'client/style.sass',
  ], 'client');

  api.imply([
    'react',
    'reactrouter:react-router',
    'reactrouter:react-router-ssr',
    'role',
    'site',
    'user',
    'post',
    'page',
    'block',
  ], both);

  api.export([
    'App'
  ], both);
});
