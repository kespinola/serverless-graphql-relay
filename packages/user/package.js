Package.describe({
	name:'user',
	description:'user extension',
});

Package.onUse(function(api){

	var both = ['server', 'client'];

	api.use([
    'core',
		'accounts-facebook',
		'service-configuration',
	], both);

  var views = ['index', 'list', 'show', 'new'];

  views = views.map(function(view){
    return './both/views/' + view + '/handler.jsx'
  });

	api.addFiles([
		'namespace.js',
	].concat(views), both);

	api.addFiles([
		'./server/configure.js',
		'./server/methods.js',
	], 'server');

	api.export([
		'User',
	], both);

});