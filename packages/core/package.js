Package.describe({
	name:'core',
	description:'core dependency manifest for application.',
});

Package.onUse(function(api){

	var both = ['server', 'client'];

  api.imply([
    'meteor-base',
    'mongo',
    'session',
    'tracker',
    'ecmascript',
    'react',
    'grid',
    'izzilab:material-ui',
    'reactrouter:react-router',
    'reactrouter:react-router-ssr',
    'maxharris9:classnames',
  ], both);

  api.imply([
    'es5-shim',
  ], 'client');

});