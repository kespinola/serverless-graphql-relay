Package.describe({
  name: "immutable",
  summary: "Immutable Data Collections for Javascript.",
  version: "3.6.2",
  git: "https://github.com/dataflows/meteor-immutable.git"
});

Npm.depends({
	"immutable": "3.6.2"
});

Package.onUse(function(api) {
  var both = ['server', 'client'];
  
  api.versionsFrom("METEOR@1.2.0.2");
  
  api.use([
    'cosmos:browserify'
  ], 'client');

  api.addFiles([
    'client.browserify.js'
  ], 'client');
  
  api.addFiles([
    'namespace.js'
  ], both);
  
  api.export("Immutable", both);
});
