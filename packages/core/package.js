Package.describe({
	name:'core',
	description:'core dependency manifest for application.',
});

Package.onUse(function(api){

	var both = ['server', 'client'];

  api.imply([
    'check',
    'mongo',
    'react',
    'ecmascript',
    'ramda:ramda',
    'immutable',
    'aldeed:simple-schema',
    'aldeed:collection2',
    'izzilab:material-ui',
    'reactrouter:react-router',
    'reactrouter:react-router-ssr',
    'maxharris9:classnames',
		'matb33:collection-hooks'
  ], both);

  api.imply([
    'es5-shim',
  ], 'client');

});
