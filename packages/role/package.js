Package.describe({
  name: 'role',
  description: 'application permissions.'
});

Package.onUse(function(api){
  
  var both = ['server', 'client'];
  
  api.use([
    'react',
    'mongo',
    'ecmascript',
    'ramda:ramda',
    'izzilab:material-ui',
    'alanning:roles',
    'aldeed:simple-schema',
    'form',
    'grid',
  ], both);
  
  api.imply([
    'alanning:roles',
  ], both);
  
  api.addFiles([
    'namespace.js',
    'both/collection.js',
    'both/views/list/handler.jsx',
  ], both);
  
  api.addFiles([
    'server/publish.js',
  ], 'server');
  
  api.export([
    'Role'
  ], both);
  
});
