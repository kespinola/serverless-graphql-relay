Package.describe({
	name:'core',
	description:'core description',
});

Package.onUse(function(api){

	var both = ['server', 'client'];

  api.imply([
    'mongo',
    'session',
    'tracker',
    'ecmascript',
    'react',
    'fourseven:scss',
    'izzilab:material-ui',
    'reactrouter:react-router-ssr',
  ], both);

  api.imply([
    'es5-shim',
  ], 'client');

});