
(function(global) {
  
  // map tells the System loader where to look for things.
  var map = {
    'app':                        'client', // 'dist',
    '@angular':                   'node_modules/@angular',
    'angular2-in-memory-web-api': 'node_modules/angular2-in-memory-web-api',
    'rxjs':                       'node_modules/rxjs',
    'ng2-bs3-modal':              'node_modules/ng2-bs3-modal',
    'angular2-toaster':           'node_modules/angular2-toaster',
    'socket.io-client':           'node_modules/socket.io-client/socket.io.js'
  };

  // packages tells the System loader how to load when no filename and/or no extension
  var packages = {
    'app':                        { main: 'main.js',  defaultExtension: 'js' },
    'angular2-in-memory-web-api': {main: './index.js',defaultExtension:'js'},
    'rxjs':                       { defaultExtension: 'js' },
    'angular2-toaster':           { defaultExtension: 'js' },
    'esri':                       { defaultExtension: 'js' },
    'socket.io-client':           { defaultExtension: 'js' }
  };
  var ngPackageNames = [
    'common',
    'compiler',
    'core',
    'http',
    'platform-browser',
    'platform-browser-dynamic',
    'router'
  ];
  
  // Add package entries for angular packages
  ngPackageNames.forEach(function(pkgName) {
    packages['@angular/'+pkgName] = { main: pkgName + '.umd.js', defaultExtension: 'js' };
  });
  var config = {
    map: map,
    packages: packages
  }
  System.config(config);

})(this);