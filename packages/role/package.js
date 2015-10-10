Package.describe({
  name: 'role',
  description: 'application permissions.'
});

Package.onUse(function(api){
  
  var both = ['server', 'client'];
  
  api.use([
    'core',
    'alanning:roles',
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
