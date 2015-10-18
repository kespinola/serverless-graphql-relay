Package.describe({
	name: 'theme',
	description: 'theme stuff',
});

Package.onUse(function(api){

	var both = ['server', 'client'];
  
	api.addFiles([
    'namespace.js',
    'both/color.js',
    'both/spacing.js'
	], both);
	
	api.export([
    'Theme',
	], both);
	
});
