Package.describe({
  name: 'site',
  description: 'manage sites',
});

Package.onUse(function(api){
  
  var both = ['server', 'client'];
  
  api.use([
    'core'
  ], both);
  
  api.addFiles([
    'namespace.js',
    'both/collection.js',
    'both/views/list/handler.jsx',
    
  ], both);
  
  api.addFiles([
    'server/publish.js',
  ], both);
  
  api.export([
    'Site'
  ], both);
  
});
