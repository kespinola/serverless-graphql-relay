Package.describe({
	name: 'theme',
	description: 'theme stuff',
});

Package.onUse(function(api){

	var both = ['server', 'client'];
  
  api.use([
    'react',
    'ecmascript',
    'ramda:ramda',
    'aldeed:simple-schema',
    'izzilab:material-ui',
    'grid',
  ], both);
  
	api.addFiles([
    'namespace.js',
    'both/components/main.jsx'
	], both);
	
	api.export([
    'Theme',
	], both);
	
});
