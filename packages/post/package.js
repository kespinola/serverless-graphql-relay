Package.describe({
	name:'post',
	description:'post extension',
});

Package.onUse(function(api){

	var both = ['server', 'client'];

	api.use([
    'core',
	], both);

  var views = ['index', 'list', 'show'];

  views = views.map(function(view){
    return './both/views/' + view + '/handler.jsx'
  });

	api.addFiles([
		'namespace.js',
	].concat(views), both);
	api.export([
		'Post',
	], both);

});