Package.describe({
	name:'form',
	description: 'autoform for react using aldeed:simple-schema. Themed using izzilab:material-ui.',
});

Package.onUse(function(api){

	var both = ['server', 'client'];

	api.use([
    'react',
    'aldeed:simple-schema',
    'aldeed:collection2',
	], both);

	api.addFiles([
    'namespace.js',
    'both/form.jsx',
    'both/field.jsx',
	], both);

	api.export([
    'AutoForm',
	], both);

});