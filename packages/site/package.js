Package.describe({
  name: 'site',
  description: 'manage sites',
});

Package.onUse(function(api){
  
  var both = ['server', 'client'];
  
  api.use([
    'react',
    'mongo',
    'ecmascript',
    'ramda:ramda',
    'izzilab:material-ui',
    'aldeed:simple-schema',
    'aldeed:collection2',
    'theme',
    'form',
    'grid',
  ], both);

  var views = ['index', 'list', 'settings'];

  views = views.map(function(view){
    return 'both/views/' + view + '/handler.jsx'
  });
  
  api.addFiles([
    'namespace.js',
    'both/collection.js',
  ].concat(views), both);
  
  api.addFiles([
    'server/publish.js',
  ], 'server');
  
  api.export([
    'Site'
  ], both);
  
});
