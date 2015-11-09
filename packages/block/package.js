Package.describe({
  name: 'block',
  description: 'page blocks',
});

Package.onUse(function(api) {
	var both = ['server', 'client'];

	api.use([
    'core',
	], both);

	api.addFiles([
    'namespace.js',
    'both/collection.js',
	], both);

  api.addFiles([
    'server/publish.js',
  ], 'server');

	api.export([
    'Block',
	], both);
});
