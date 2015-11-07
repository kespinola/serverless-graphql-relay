Package.describe({
	name:'user',
	description:'user extension',
});

Package.onUse(function(api){

	var both = ['server', 'client'];

	api.use([
    'core',
		'grid',
		'form',
		'accounts-base',
		'accounts-password',
		'accounts-google',
		'accounts-facebook',
		'service-configuration',
	], both);

  var views = ['index', 'list', 'edit', 'new', 'session'];

  views = views.map(function(view){
    return 'both/views/' + view + '/handler.jsx'
  });

	api.addFiles([
		'namespace.js',
    'both/collection.js',
    'both/components/userSessionForm.jsx'
	].concat(views), both);

	api.addFiles([
    'server/publish.js',
		'server/configure.js',
	], 'server');

	api.export([
		'User',
	], both);

});

